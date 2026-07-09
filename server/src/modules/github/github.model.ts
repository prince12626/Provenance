import { Schema, model } from "mongoose";

const GithubProfileSchema = new Schema(
      {
            userId: {
                  type: String,
                  required: true,
                  unique: true,
                  index: true,
            },
            username: {
                  type: String,
                  required: true,
                  trim: true,
            },
            name: {
                  type: String,
                  default: "",
            },
            bio: {
                  type: String,
                  default: "",
            },
            email: {
                  type: String,
                  default: "",
                  lowercase: true,
                  trim: true,
            },
            phone: {
                  type: String,
                  default: "",
            },
            location: {
                  type: String,
                  default: "",
            },
            avatar: {
                  type: String,
                  default: "",
            },
            blog: {
                  type: String,
                  default: "",
            },
            followers: {
                  type: Number,
                  default: 0,
            },
            following: {
                  type: Number,
                  default: 0,
            },
            collaborators: {
                  type: Number,
                  default: 0,
            },
            privateRepo: {
                  type: Number,
                  default: 0,
            },
            publicRepos: {
                  count: {
                        type: Number,
                        default: 0,
                  },
                  links: [
                        {
                              type: String,
                              trim: true,
                        },
                  ],
            },
            languages: [
                  {
                        lang: { type: String, required: true },
                        percent: { type: Number, required: true },
                        _id: false, // Mongoose ko har language element par faltu automatic ID banane se rokega
                  },
            ],
            created_at: {
                  type: Date,
            },
            syncedAt: {
                  type: Date,
                  default: Date.now,
            },
      },
      {
            timestamps: true,
      },
);

export const GithubProfile = model("GithubProfile", GithubProfileSchema);
