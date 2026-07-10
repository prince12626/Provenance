import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB!);

await client.connect();

export const auth = betterAuth({
      database: mongodbAdapter(client.db()),
      basePath: "/api/v1/authentication",
      emailAndPassword: {
            enabled: true,
      },
      socialProviders: {
            google: {
                  clientId: process.env.GOOGLE_CLIENT_ID!,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            },
      },
      trustedOrigins: ["http://localhost:4000"],
      appName: "Provenance",
      account: {
            additionalFields: {
                  portfolioSlug: {
                        type: "string",
                        required: false,
                        defaultValue: "",
                  },
                  isSetupComplete: {
                        type: "boolean",
                        required: false,
                        defaultValue: false,
                  },
            },
      },
});
