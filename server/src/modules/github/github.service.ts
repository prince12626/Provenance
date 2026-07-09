import axios from "axios";
import { GithubProfile } from "./github.model.js";

const githubApi = axios.create({
      baseURL: "https://api.github.com",
});

export async function exchangeCodeForToken(code: string) {
      const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                  client_id: process.env.GITHUB_CLIENT_ID,
                  client_secret: process.env.GITHUB_CLIENT_SECRET,
                  code,
            },
            { headers: { Accept: "application/json" } },
      );

      const accessToken = tokenResponse.data.access_token;
      if (!accessToken) {
            throw new Error(
                  "GitHub rejected code exchange. Access token missing.",
            );
      }

      const { data: rawProfile } = await githubApi.get("/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
      });

      return {
            accessToken,
            username: rawProfile.login,
            avatarUrl: rawProfile.avatar_url,
      };
}

export async function syncGithubDataToDb(userId: string, accessToken: string) {
      const { data: rawProfile } = await githubApi.get("/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { data: rawRepos } = await githubApi.get("/user/repos", {
            params: { per_page: 100, sort: "updated", affiliation: "owner" },
            headers: { Authorization: `Bearer ${accessToken}` },
      });

      const publicLinks = rawRepos
            .filter((repo: any) => !repo.private)
            .map((repo: any) => repo.html_url);

      const globalLanguageBytes: Record<string, number> = {};
      let totalBytesCount = 0;

      const languagePromises = rawRepos.map(async (repo: any) => {
            try {
                  const langRes = await githubApi.get(
                        `/repos/${repo.owner.login}/${repo.name}/languages`,
                        { headers: { Authorization: `Bearer ${accessToken}` } },
                  );

                  const repoLangs = langRes.data;
                  for (const [lang, bytes] of Object.entries(repoLangs)) {
                        if (typeof bytes === "number") {
                              globalLanguageBytes[lang] =
                                    (globalLanguageBytes[lang] || 0) + bytes;
                              totalBytesCount += bytes;
                        }
                  }
            } catch (_) {
            }
      });

      await Promise.all(languagePromises);

      const calculatedLanguages = Object.entries(globalLanguageBytes)
            .map(([lang, bytes]) => {
                  const percent =
                        totalBytesCount > 0
                              ? Math.round((bytes / totalBytesCount) * 100)
                              : 0;
                  return { lang, percent };
            })
            .sort((a, b) => b.percent - a.percent);

      const updatedProfile = await GithubProfile.findOneAndUpdate(
            { userId: userId },
            {
                  userId,
                  username: rawProfile.login,
                  name: rawProfile.name || rawProfile.login,
                  bio: rawProfile.bio || "",
                  email: rawProfile.email || "",
                  phone: rawProfile.phone || "",
                  location: rawProfile.location || "",
                  avatar: rawProfile.avatar_url,
                  blog: rawProfile.blog || "",
                  followers: rawProfile.followers || 0,
                  following: rawProfile.following || 0,
                  collaborators: rawProfile.collaborators || 0,
                  privateRepo: rawProfile.total_private_repos || 0,
                  publicRepos: {
                        count: rawProfile.public_repos || 0,
                        links: publicLinks,
                  },
                  languages: calculatedLanguages,
                  created_at: rawProfile.created_at
                        ? new Date(rawProfile.created_at)
                        : null,
                  syncedAt: new Date(),
            },
            { upsert: true, new: true },
      );

      return updatedProfile;
}

export async function unlinkGithubDataFromDb(userId: string) {
      const result = await GithubProfile.findOneAndDelete({ userId });
      return {
            profileRemoved: !!result,
      };
}
