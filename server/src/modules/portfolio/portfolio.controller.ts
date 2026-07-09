import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { FinalPortfolio } from "./portfolio.model.js";
import { GithubProfile } from "../github/github.model.js";
import { LeetCodeProfile } from "../leetcode/leetcode.model.js";

export const handleCreateIntegratedPortfolio = async (
      req: Request,
      res: Response,
) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res
                  .status(400)
                  .json({ status: "error", errors: errors.array() });
      }

      try {
            const { slug, title, description, phone, links, socials } =
                  req.body;
            const userId = (req as any).user?.id || req.body.userId;

            if (!userId) {
                  return res
                        .status(401)
                        .json({
                              status: "error",
                              message: "Unauthorized credentials mapping",
                        });
            }

            // 1. Check Unique Slug Bounds
            const existingSlug = await FinalPortfolio.findOne({
                  portfolioSlug: slug.toLowerCase(),
            });
            if (existingSlug && existingSlug.userId !== userId) {
                  return res.status(400).json({
                        status: "error",
                        message: "Subdomain slug already taken by another profile",
                  });
            }

            // 2. Fetch standalone profiles snapshots concurrently
            const [githubProfile, leetcodeProfile] = await Promise.all([
                  GithubProfile.findOne({ userId }),
                  LeetCodeProfile.findOne({ userId }),
            ]);

            const dynamicSubdomain = `https://${slug.toLowerCase()}.yourplatform.com`;

            // 3. Structural mapping directly combining raw + nested collections data
            const consolidatedPortfolio = await FinalPortfolio.findOneAndUpdate(
                  { userId },
                  {
                        userId,
                        portfolioSlug: slug.toLowerCase(),
                        subdomainUrl: dynamicSubdomain,
                        title:
                              title ||
                              githubProfile?.name ||
                              "My Developer Space",
                        description:
                              description ||
                              githubProfile?.bio ||
                              "Welcome to my portfolio",
                        name: githubProfile?.name || "",
                        email: githubProfile?.email || "",
                        phone: phone || githubProfile?.phone || "",
                        avatar: githubProfile?.avatar || "", // Fallback profile image links array check
                        links: links || [],
                        socials: socials || [],

                        // Injecting pure full data blocks directly into embedded objects
                        github: githubProfile
                              ? {
                                      username: githubProfile.username,
                                      followers: githubProfile.followers,
                                      following: githubProfile.following,
                                      collaborators:
                                            githubProfile.collaborators,
                                      privateRepo: githubProfile.privateRepo,
                                      publicRepos: githubProfile.publicRepos,
                                      languages: githubProfile.languages,
                                      created_at: githubProfile.created_at,
                                }
                              : {},

                        leetcode: leetcodeProfile
                              ? {
                                      username: leetcodeProfile.username,
                                      ranking: leetcodeProfile.ranking,
                                      reputation: leetcodeProfile.reputation,
                                      totalSolved: leetcodeProfile.totalSolved,
                                      easySolved: leetcodeProfile.easySolved,
                                      mediumSolved:
                                            leetcodeProfile.mediumSolved,
                                      hardSolved: leetcodeProfile.hardSolved,
                                      contestRating:
                                            leetcodeProfile.contestRating,
                                      contestGlobalRanking:
                                            leetcodeProfile.contestGlobalRanking,
                                      contestTopPercentage:
                                            leetcodeProfile.contestTopPercentage,
                                      totalContestsAttended:
                                            leetcodeProfile.totalContestsAttended,
                                }
                              : {},
                  },
                  { upsert: true, new: true },
            );

            return res.status(200).json({
                  status: "success",
                  message: "Unified single-document portfolio generated seamlessly",
                  data: consolidatedPortfolio,
            });
      } catch (error: any) {
            console.error("Integrated Portfolio Error:", error.message);
            return res.status(500).json({
                  status: "error",
                  message:
                        error.message ||
                        "Failure to bundle aggregated structures",
            });
      }
};
