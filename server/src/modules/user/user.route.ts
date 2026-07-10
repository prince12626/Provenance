import { Router } from "express";
import { getUserStatus } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/status", authMiddleware, getUserStatus);

export default router;
