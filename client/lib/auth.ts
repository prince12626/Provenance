import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000",
      basePath: "/api/v1/authentication",
});
