import { Router } from "express";
import { body } from "express-validator";
import { handleLeetCodeSync } from "./leetcode.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.post(
      "/sync",
      [
            body("username")
                  .notEmpty()
                  .withMessage("LeetCode username is required")
                  .isString()
                  .withMessage("Username must be a valid string")
                  .trim(),
      ],
      handleLeetCodeSync,
);

export default router;
