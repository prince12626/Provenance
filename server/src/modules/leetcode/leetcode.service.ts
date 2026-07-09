import axios from "axios";
import { LeetCodeProfile } from "./leetcode.model.js";

export async function syncLeetCodeDataToDb(userId: string, username: string) {
      const query = `
    query getCombinedLeetCodeData($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
          reputation
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        topPercentage
        attendedContestsCount
      }
    }
  `;

      try {
            const response = await axios.post("https://leetcode.com/graphql", {
                  query,
                  variables: { username },
            });

            const data = response.data.data;

            if (!data || !data.matchedUser) {
                  throw new Error(
                        `LeetCode platform identity '${username}' could not be resolved`,
                  );
            }

            const userData = data.matchedUser;
            const submissionStats = userData.submitStats.acSubmissionNum;
            const contestData = data.userContestRanking;

            const easy =
                  submissionStats.find((s: any) => s.difficulty === "Easy")
                        ?.count || 0;
            const medium =
                  submissionStats.find((s: any) => s.difficulty === "Medium")
                        ?.count || 0;
            const hard =
                  submissionStats.find((s: any) => s.difficulty === "Hard")
                        ?.count || 0;

            const updatedProfile = await LeetCodeProfile.findOneAndUpdate(
                  { userId: userId },
                  {
                        userId,
                        username,
                        ranking: userData.profile?.ranking || 0,
                        reputation: userData.profile?.reputation || 0,
                        totalSolved: easy + medium + hard,
                        easySolved: easy,
                        mediumSolved: medium,
                        hardSolved: hard,
                        contestRating: contestData
                              ? Math.round(contestData.rating)
                              : 0,
                        contestGlobalRanking: contestData?.globalRanking || 0,
                        contestTopPercentage: contestData?.topPercentage || 0,
                        totalContestsAttended:
                              contestData?.attendedContestsCount || 0,
                        syncedAt: new Date(),
                  },
                  { upsert: true, new: true },
            );

            return updatedProfile;
      } catch (error: any) {
            throw new Error(
                  `LeetCode engine sync crash link: ${error.message}`,
            );
      }
}
