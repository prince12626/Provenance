import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { syncLeetCodeDataToDb } from "./leetcode.service.js";

export const handleLeetCodeSync = async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({
                  status: "error",
                  errors: errors.array(),
            });
      }

      try {
            const { username } = req.body;

            const userId = (req as any).user?.id || req.body.userId;

            if (!userId) {
                  return res.status(401).json({
                        status: "error",
                        message: "Unauthorized. Valid authentication session missing.",
                  });
            }

            console.log(`Starting LeetCode sync engine for user: ${username}`);

            const profileData = await syncLeetCodeDataToDb(userId, username);

            return res.status(200).json({
                  status: "success",
                  message: "LeetCode profile synchronized automatically successfully",
                  data: profileData,
            });
      } catch (error: any) {
            console.error("LeetCode Controller Sync Error:", error.message);
            return res.status(500).json({
                  status: "error",
                  message:
                        error.message ||
                        "Internal server error during LeetCode aggregation",
            });
      }
};
