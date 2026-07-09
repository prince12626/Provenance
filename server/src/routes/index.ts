import { Router } from "express";
import { auth } from "../config/better-auth.config.js";
import { toNodeHandler } from "better-auth/node";
import githubRoutes from "../modules/github/github.routes.js";
import leetcodeRoutes from "../modules/leetcode/leetcode.route.js";
import portfolioRoutes from "../modules/portfolio/portfolio.routes.js";

const router = Router();

// Authentication via Better Auth
router.use("/authentication", toNodeHandler(auth));

router.use("/github", githubRoutes);
router.use("/leetcode", leetcodeRoutes);
router.use("/portfolio", portfolioRoutes);

export default router;
