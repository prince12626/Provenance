import { Router } from "express";
import { body } from "express-validator";
import {
      handleCreateIntegratedPortfolio,
      handleGetPortfolio,
} from "./portfolio.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/:slug", handleGetPortfolio);

router.use(authMiddleware);

router.post(
      "/deploy",
      [
            body("slug")
                  .notEmpty()
                  .withMessage("Slug is required")
                  .isAlphanumeric()
                  .withMessage("Only letters and numbers")
                  .trim(),
      ],
      handleCreateIntegratedPortfolio,
);

export default router;
