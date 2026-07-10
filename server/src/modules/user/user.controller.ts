import type { Request, Response } from "express";
import { GithubProfile } from "../github/github.model.js";
import { LeetCodeProfile } from "../leetcode/leetcode.model.js";
import { FinalPortfolio } from "../portfolio/portfolio.model.js";

export const getUserStatus = async (req: Request, res: Response) => {
      try {
            const userId = (req as any).user.id;
            if (!userId)
                  return res
                        .status(401)
                        .json({ status: "error", message: "Unauthorized" });

            const [github, leetcode, portfolio] = await Promise.all([
                  GithubProfile.findOne({ userId })
                        .select("username syncedAt avatar publicRepos")
                        .lean(),
                  LeetCodeProfile.findOne({ userId })
                        .select("username syncedAt")
                        .lean(),
                  FinalPortfolio.findOne({ userId })
                        .select("portfolioSlug subdomainUrl")
                        .lean(),
            ]);

            return res.status(200).json({
                  status: "success",
                  data: {
                        github: {
                              connected: !!github,
                              username: github?.username ?? null,
                              syncedAt: github?.syncedAt ?? null,
                              avatar: github?.avatar ?? null, // ← add
                              repoCount: github?.publicRepos?.count ?? 0, // ← add
                        },
                        leetcode: {
                              connected: !!leetcode,
                              username: leetcode?.username ?? null,
                              syncedAt: leetcode?.syncedAt ?? null,
                        },
                        portfolio: {
                              deployed: !!portfolio,
                              slug: portfolio?.portfolioSlug ?? null,
                              url: portfolio?.subdomainUrl ?? null,
                        },
                  },
            });
      } catch (error: any) {
            return res
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
};