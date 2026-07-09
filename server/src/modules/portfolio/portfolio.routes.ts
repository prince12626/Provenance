import { Router } from "express";
import { body } from "express-validator";
import { handleCreateIntegratedPortfolio } from "./portfolio.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.post(
      "/create",
      [
            body("slug")
                  .notEmpty()
                  .withMessage("Slug value is mandatory")
                  .isAlphanumeric()
                  .withMessage(
                        "Slug must be strictly alphanumeric (no special characters/spaces)",
                  )
                  .trim(),
      ],
      handleCreateIntegratedPortfolio,
);

export default router;
