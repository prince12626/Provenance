import { Router } from "express";
import { query, body } from "express-validator";
import {
      handleGithubConnect,
      handleGithubCallback,
      handleGithubSync,
      handleGithubUnlink,
} from "./github.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/connect", handleGithubConnect);

router.get(
      "/callback",
      [
            query("code")
                  .notEmpty()
                  .withMessage("Authorization code is required from GitHub")
                  .isString()
                  .withMessage("Authorization code must be a valid string"),
      ],
      handleGithubCallback,
);

router.post(
      "/sync",
      [
            body("githubId")
                  .notEmpty()
                  .withMessage(
                        "GitHub ID is required to trigger synchronization",
                  )
                  .isNumeric()
                  .withMessage("GitHub ID must be a valid number"),
            body("accessToken")
                  .notEmpty()
                  .withMessage(
                        "Valid GitHub access token is required for live sync",
                  )
                  .isString()
                  .withMessage("Access token must be a string"),
      ],
      handleGithubSync,
);

router.delete(
      "/unlink",
      [
            body("githubId")
                  .notEmpty()
                  .withMessage(
                        "GitHub ID is required to remove synchronization data",
                  )
                  .isNumeric()
                  .withMessage("GitHub ID must be a valid number"),
      ],
      handleGithubUnlink,
);

export default router;
