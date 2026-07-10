import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
      exchangeCodeForToken,
      syncGithubDataToDb,
      unlinkGithubDataFromDb,
} from "./github.service.js";
import { GithubProfile } from "./github.model.js";

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

      const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

      try {
            const code = req.query.code as string;

            const oauthData = await exchangeCodeForToken(code);
            const { accessToken, username } = oauthData;
            if (!req.user) {
                  return res.json({
                        message: "Unauthorised!",
                  });
            }
            const userId = req.user.id;
            console.log(userId);
            console.log(`GitHub connected for: ${username}, starting sync...`);

            await syncGithubDataToDb(userId, accessToken);

            // ✅ Frontend pe redirect with success flag
            return res.redirect(
                  `${FRONTEND_URL}/dashboard/connection/github?status=success`,
            );
      } catch (error: any) {
            console.error("Error in handleGithubCallback:", error.message);

            // ❌ Error bhi frontend pe bhejo, JSON mat bhejo
            const msg = encodeURIComponent(
                  error.message ?? "OAuth or sync failed",
            );
            return res.redirect(
                  `${FRONTEND_URL}/auth/github/callback?status=error&message=${msg}`,
            );
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

export const handleGithubProfile = async (req: Request, res: Response) => {
      try {
            const userId = (req as any).user?._id;
            const profile = await GithubProfile.findOne({ userId }).lean();
            if (!profile)
                  return res
                        .status(404)
                        .json({
                              status: "error",
                              message: "Profile nahi mili",
                        });
            return res.status(200).json({ status: "success", data: profile });
      } catch (error: any) {
            return res
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
};