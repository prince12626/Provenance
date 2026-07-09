import { Schema, model } from "mongoose";

const FinalPortfolioSchema = new Schema(
      {
            userId: {
                  type: String,
                  required: true,
                  unique: true,
                  index: true,
            },
            portfolioSlug: {
                  type: String,
                  required: true,
                  unique: true,
                  trim: true,
                  lowercase: true, // subdomain structure mapping easy karne ke liye
            },
            subdomainUrl: {
                  type: String,
                  required: true,
            },
            title: {
                  type: String,
                  default: "",
            },
            description: {
                  type: String,
                  default: "",
            },
            name: {
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
            avatar: {
                  type: String,
                  default: "", // Yahan automatic GitHub wala avatar url assign ho jayega
            },
            links: [
                  {
                        type: String,
                        trim: true,
                  },
            ], // Additional external work portfolio links
            socials: [
                  {
                        platform: { type: String },
                        url: { type: String, trim: true },
                  },
            ],

            // =========================================================================
            // EMBEDDED GITHUB SNAPSHOT (Poora Data Single Object Me)
            // =========================================================================
            github: {
                  username: { type: String, default: "" },
                  followers: { type: Number, default: 0 },
                  following: { type: Number, default: 0 },
                  collaborators: { type: Number, default: 0 },
                  privateRepo: { type: Number, default: 0 },
                  publicRepos: {
                        count: { type: Number, default: 0 },
                        links: [{ type: String }],
                  },
                  languages: [
                        {
                              lang: { type: String },
                              percent: { type: Number },
                              _id: false,
                        },
                  ],
                  created_at: { type: Date },
            },

            // =========================================================================
            // EMBEDDED LEETCODE SNAPSHOT (Poora Data Single Object Me)
            // =========================================================================
            leetcode: {
                  username: { type: String, default: "" },
                  ranking: { type: Number, default: 0 },
                  reputation: { type: Number, default: 0 },
                  totalSolved: { type: Number, default: 0 },
                  easySolved: { type: Number, default: 0 },
                  mediumSolved: { type: Number, default: 0 },
                  hardSolved: { type: Number, default: 0 },
                  contestRating: { type: Number, default: 0 },
                  contestGlobalRanking: { type: Number, default: 0 },
                  contestTopPercentage: { type: Number, default: 0 },
                  totalContestsAttended: { type: Number, default: 0 },
            },
      },
      {
            timestamps: true,
      },
);

export const FinalPortfolio = model("FinalPortfolio", FinalPortfolioSchema);
