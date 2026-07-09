import { Router } from "express";
import { auth } from "../config/better-auth.config.js";
import { toNodeHandler } from "better-auth/node";

const router = Router();

// Authentication via Better Auth
router.use("/authentication", toNodeHandler(auth));

export default router;
