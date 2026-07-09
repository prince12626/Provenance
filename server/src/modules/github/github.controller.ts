import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
      exchangeCodeForToken,
      syncGithubDataToDb,
      unlinkGithubDataFromDb,
} from "./github.service.js";

const validateRequest = (req: Request, res: Response): boolean => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            res.status(400).json({ status: "error", errors: errors.array() });
            return false;
      }
      return true;
};

export const handleGithubConnect = (req: Request, res: Response) => {
      const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user%20repo`;
      return res.redirect(url.replace(/\s/g, ""));
};

export const handleGithubCallback = async (req: Request, res: Response) => {
      if (!validateRequest(req, res)) return;

      try {
            const code = req.query.code as string;

            const oauthData = await exchangeCodeForToken(code);
            const { accessToken, username } = oauthData;

            const userId = (req as any).user?._id;
            console.log(JSON.stringify(req.user));
            console.log(
                  `User connected GitHub successfully. Starting AUTOMATIC initial sync for: ${username}`,
            );

            const syncedProfile = await syncGithubDataToDb(userId, accessToken);

            return res.status(200).json({
                  status: "success",
                  message: "GitHub connected and data synchronized automatically successfully",
                  data: syncedProfile,
            });
      } catch (error: any) {
            console.error(
                  "Error in handleGithubCallback automatic sync:",
                  error.message,
            );
            return res.status(500).json({
                  status: "error",
                  message:
                        error.message ||
                        "OAuth lifecycle or automatic sync failed",
            });
      }
};

export const handleGithubSync = async (req: Request, res: Response) => {
      if (!validateRequest(req, res)) return;

      try {
            const { userId, accessToken } = req.body;
            const syncResult = await syncGithubDataToDb(userId, accessToken);

            return res.status(200).json({
                  status: "success",
                  message: "Manual GitHub sync triggered and completed successfully",
                  data: syncResult,
            });
      } catch (error: any) {
            console.error("Error in handleGithubSync:", error.message);
            return res.status(500).json({
                  status: "error",
                  message: error.message || "Synchronization failure",
            });
      }
};

export const handleGithubUnlink = async (req: Request, res: Response) => {
      if (!validateRequest(req, res)) return;

      try {
            const { userId } = req.body;
            const wipeResult = await unlinkGithubDataFromDb(userId);

            return res.status(200).json({
                  status: "success",
                  message: "GitHub configurations unlinked and profile wiped permanently",
                  data: wipeResult,
            });
      } catch (error: any) {
            console.error("Error in handleGithubUnlink:", error.message);
            return res.status(500).json({
                  status: "error",
                  message: error.message || "Database unlinking action fault",
            });
      }
};
