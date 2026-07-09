import { Schema, model } from "mongoose";

const LeetCodeProfileSchema = new Schema(
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
            ranking: {
                  type: Number,
                  default: 0,
            },
            reputation: {
                  type: Number,
                  default: 0,
            },
            totalSolved: {
                  type: Number,
                  default: 0,
            },
            easySolved: {
                  type: Number,
                  default: 0,
            },
            mediumSolved: {
                  type: Number,
                  default: 0,
            },
            hardSolved: {
                  type: Number,
                  default: 0,
            },
            contestRating: {
                  type: Number,
                  default: 0,
            },
            contestGlobalRanking: {
                  type: Number,
                  default: 0,
            },
            contestTopPercentage: {
                  type: Number,
                  default: 0,
            },
            totalContestsAttended: {
                  type: Number,
                  default: 0,
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

export const LeetCodeProfile = model("LeetCodeProfile", LeetCodeProfileSchema);
