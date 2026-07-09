import { Router } from "express";
import { auth } from "../config/better-auth.config.js";
import { toNodeHandler } from "better-auth/node";
import githubRoutes from "../modules/github/github.routes.js";

const router = Router();

// Authentication via Better Auth
router.use("/authentication", toNodeHandler(auth));
router.use("/github", githubRoutes);

export default router;
