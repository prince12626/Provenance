"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

interface Portfolio {
      name: string;
      avatar: string;
      description: string;
      email: string;
      github: {
            username: string;
            followers: number;
            following: number;
            publicRepos: { count: number };
            languages: { lang: string; percent: number }[];
      };
      leetcode: {
            username: string;
            totalSolved: number;
            easySolved: number;
            mediumSolved: number;
            hardSolved: number;
            contestRating: number;
      };
}

export default function PublicProfilePage() {
      const { slug } = useParams();
      const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
      const [loading, setLoading] = useState(true);
      const [notFound, setNotFound] = useState(false);

      useEffect(() => {
            if (!slug) return;
            api.get(`/portfolio/${slug}`)
                  .then((res) => setPortfolio(res.data.data))
                  .catch(() => setNotFound(true))
                  .finally(() => setLoading(false));
      }, [slug]);

      if (loading)
            return (
                  <div className="min-h-screen bg-black flex items-center justify-center text-white/40 font-mono text-xs">
                        &gt; Loading portfolio...
                  </div>
            );

      if (notFound || !portfolio)
            return (
                  <div className="min-h-screen bg-black flex items-center justify-center text-white/40 font-mono text-xs">
                        &gt; Portfolio not found —{" "}
                        <span className="ml-1 text-white/20">/{slug}</span>
                  </div>
            );

      const hasGithub = !!portfolio.github?.username;
      const hasLeetcode = !!portfolio.leetcode?.username;

      return (
            <main className="min-h-screen bg-black text-white px-6 py-32">
                  <div className="max-w-6xl mx-auto">
                        {/* Profile Header */}
                        <section className="border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {portfolio.avatar ? (
                                          <img
                                                src={portfolio.avatar}
                                                className="h-28 w-28 object-cover border border-white/10"
                                          />
                                    ) : (
                                          <div className="h-28 w-28 bg-white/10 border border-white/10" />
                                    )}
                                    <div className="flex-1">
                                          <h1 className="text-4xl font-semibold">
                                                {portfolio.name || slug}
                                          </h1>
                                          {portfolio.description && (
                                                <p className="text-white/60 mt-3 max-w-2xl">
                                                      {portfolio.description}
                                                </p>
                                          )}
                                          {portfolio.email && (
                                                <p className="text-white/40 mt-2 text-sm">
                                                      {portfolio.email}
                                                </p>
                                          )}
                                          {hasGithub &&
                                                portfolio.github.languages
                                                      ?.length > 0 && (
                                                      <div className="flex flex-wrap gap-3 mt-6">
                                                            {portfolio.github.languages
                                                                  .slice(0, 5)
                                                                  .map((l) => (
                                                                        <span
                                                                              key={
                                                                                    l.lang
                                                                              }
                                                                              className="px-3 py-1 text-sm bg-white/10 border border-white/10"
                                                                        >
                                                                              {
                                                                                    l.lang
                                                                              }{" "}
                                                                              <span className="text-white/30 ml-1">
                                                                                    {
                                                                                          l.percent
                                                                                    }
                                                                                    %
                                                                              </span>
                                                                        </span>
                                                                  ))}
                                                      </div>
                                                )}
                                    </div>
                              </div>
                        </section>

                        {/* Stats */}
                        <section className="grid md:grid-cols-4 gap-4 mt-8">
                              {[
                                    [
                                          hasGithub
                                                ? (portfolio.github.publicRepos
                                                        ?.count ?? "—")
                                                : "—",
                                          "Repositories",
                                    ],
                                    [
                                          hasGithub
                                                ? (portfolio.github.followers ??
                                                  "—")
                                                : "—",
                                          "Followers",
                                    ],
                                    [
                                          hasLeetcode
                                                ? (portfolio.leetcode
                                                        .totalSolved ?? "—")
                                                : "—",
                                          "LC Solved",
                                    ],
                                    [
                                          hasLeetcode
                                                ? (portfolio.leetcode
                                                        .contestRating ?? "—")
                                                : "—",
                                          "LC Rating",
                                    ],
                              ].map(([value, label]) => (
                                    <div
                                          key={label as string}
                                          className="border border-white/10 bg-white/5 p-6"
                                    >
                                          <h2 className="text-3xl font-semibold">
                                                {value}
                                          </h2>
                                          <p className="text-white/40 mt-2">
                                                {label}
                                          </p>
                                    </div>
                              ))}
                        </section>

                        {/* Platforms */}
                        {(hasGithub || hasLeetcode) && (
                              <section className="mt-10">
                                    <h2 className="text-2xl font-semibold mb-5">
                                          Connected Platforms
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                          {hasGithub && (
                                                <div className="border border-white/10 bg-white/5 p-6">
                                                      <h3 className="text-xl font-semibold">
                                                            GitHub
                                                      </h3>
                                                      <p className="text-white/50 mt-2">
                                                            github.com/
                                                            {
                                                                  portfolio
                                                                        .github
                                                                        .username
                                                            }
                                                      </p>
                                                      <div className="mt-5 flex gap-8">
                                                            <div>
                                                                  <p className="text-xl font-semibold">
                                                                        {portfolio
                                                                              .github
                                                                              .publicRepos
                                                                              ?.count ??
                                                                              0}
                                                                  </p>
                                                                  <span className="text-white/40 text-sm">
                                                                        Repos
                                                                  </span>
                                                            </div>
                                                            <div>
                                                                  <p className="text-xl font-semibold">
                                                                        {
                                                                              portfolio
                                                                                    .github
                                                                                    .followers
                                                                        }
                                                                  </p>
                                                                  <span className="text-white/40 text-sm">
                                                                        Followers
                                                                  </span>
                                                            </div>
                                                            <div>
                                                                  <p className="text-xl font-semibold">
                                                                        {
                                                                              portfolio
                                                                                    .github
                                                                                    .following
                                                                        }
                                                                  </p>
                                                                  <span className="text-white/40 text-sm">
                                                                        Following
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}

                                          {hasLeetcode && (
                                                <div className="border border-white/10 bg-white/5 p-6">
                                                      <h3 className="text-xl font-semibold">
                                                            LeetCode
                                                      </h3>
                                                      <p className="text-white/50 mt-2">
                                                            {
                                                                  portfolio
                                                                        .leetcode
                                                                        .username
                                                            }
                                                      </p>
                                                      <div className="mt-5 flex gap-8">
                                                            <div>
                                                                  <p className="text-xl font-semibold">
                                                                        {
                                                                              portfolio
                                                                                    .leetcode
                                                                                    .totalSolved
                                                                        }
                                                                  </p>
                                                                  <span className="text-white/40 text-sm">
                                                                        Solved
                                                                  </span>
                                                            </div>
                                                            <div>
                                                                  <p className="text-xl font-semibold text-green-400">
                                                                        {
                                                                              portfolio
                                                                                    .leetcode
                                                                                    .easySolved
                                                                        }
                                                                  </p>
                                                                  <span className="text-white/40 text-sm">
                                                                        Easy
                                                                  </span>
                                                            </div>
                                                            <div>
                                                                  <p className="text-xl font-semibold text-yellow-400">
                                                                        {
                                                                              portfolio
                                                                                    .leetcode
                                                                                    .mediumSolved
                                                                        }
                                                                  </p>
                                                                  <span className="text-white/40 text-sm">
                                                                        Medium
                                                                  </span>
                                                            </div>
                                                            <div>
                                                                  <p className="text-xl font-semibold text-red-400">
                                                                        {
                                                                              portfolio
                                                                                    .leetcode
                                                                                    .hardSolved
                                                                        }
                                                                  </p>
                                                                  <span className="text-white/40 text-sm">
                                                                        Hard
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </section>
                        )}
                  </div>
            </main>
      );
}
