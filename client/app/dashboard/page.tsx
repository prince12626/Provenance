"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import ProfileCard from "@/components/ProfileCard";
import PlatformGrid from "@/components/Platform";
import { authClient } from "@/lib/auth";
import { Metrics, Platforms } from "@/types/dashboard";
import api from "@/lib/api";

export default function DashboardPage() {
      const { data: session, isPending: sessionLoading } =
            authClient.useSession();
      const [githubData, setGithubData] = useState<{
            avatar: string | null;
            repoCount: number;
      } | null>(null);
      const [metrics, setMetrics] = useState<Metrics>({
            repos: "—",
            contributions: "—",
            projects: "—",
      });

      const [platforms, setPlatforms] = useState<Platforms>({
            github: {
                  connected: false,
                  status: "Not Connected",
                  loading: false,
            },
            leetcode: {
                  connected: false,
                  status: "Not Connected",
                  loading: false,
            },
      });

      const [slugStatus, setSlugStatus] = useState({ loading: false, url: "" });
      const [statusLoading, setStatusLoading] = useState(true);

      useEffect(() => {
            if (sessionLoading) return;
            fetchUserStatus();
      }, [sessionLoading]);

      const fetchUserStatus = async () => {
            try {
                  setStatusLoading(true);
                  const res = await api.get("/user/status");
                  const { github, leetcode, portfolio } = res.data.data;

                  setPlatforms({
                        github: {
                              connected: github.connected,
                              status: github.connected
                                    ? `Connected (@${github.username})`
                                    : "Not Connected",
                              loading: false,
                        },
                        leetcode: {
                              connected: leetcode.connected,
                              status: leetcode.connected
                                    ? `Connected (@${leetcode.username})`
                                    : "Not Connected",
                              loading: false,
                        },
                  });

                  // ← Yeh do lines add kar, github profile call hatao
                  setGithubData({
                        avatar: github.avatar,
                        repoCount: github.repoCount,
                  });

                  setMetrics((m) => ({
                        ...m,
                        repos: String(github.repoCount || "—"),
                  }));

                  if (portfolio.deployed) {
                        setSlugStatus({ loading: false, url: portfolio.url });
                  }
            } catch (err) {
                  console.error("Status fetch failed:", err);
            } finally {
                  setStatusLoading(false);
            }
      };

      const handleGithubSync = () => {
            setPlatforms((p) => ({
                  ...p,
                  github: {
                        ...p.github,
                        loading: true,
                        status: "Redirecting...",
                  },
            }));
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/github/connect`;
      };

      const handleLeetCodeConnect = async () => {
            const username = prompt("Enter your LeetCode username:");
            if (!username?.trim()) return;

            setPlatforms((p) => ({
                  ...p,
                  leetcode: {
                        ...p.leetcode,
                        loading: true,
                        status: "Connecting...",
                  },
            }));

            try {
                  await api.post("/leetcode/sync", {
                        username: username.trim(),
                  });
                  await fetchUserStatus();
            } catch (err: any) {
                  alert(err.message || "LeetCode connection failed.");
                  setPlatforms((p) => ({
                        ...p,
                        leetcode: {
                              ...p.leetcode,
                              loading: false,
                              status: "Not Connected",
                        },
                  }));
            }
      };

      const handleDeploySpace = async () => {
            const slug = prompt(
                  "Enter your portfolio URL slug (e.g. johndoe):",
            );
            if (!slug?.trim()) return;

            const cleanSlug = slug
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, "");
            setSlugStatus({ loading: true, url: "" });

            try {
                  const res = await api.post("/portfolio/deploy", {
                        slug: cleanSlug,
                  });
                  const { url } = res.data.data;
                  setSlugStatus({ loading: false, url });
            } catch {
                  alert("Slug already taken or deploy failed.");
                  setSlugStatus({ loading: false, url: "" });
            }
      };

      if (sessionLoading || statusLoading) {
            return (
                  <div className="min-h-screen bg-black flex items-center justify-center text-white/40 font-mono text-xs">
                        &gt; Loading your workspace...
                  </div>
            );
      }

      return (
            <main className="min-h-screen pt-28 bg-black text-white px-6 py-10">
                  <div className="max-w-7xl mx-auto space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-white/5 pb-8">
                              <div>
                                    <h1 className="text-4xl font-semibold tracking-tight">
                                          Dashboard
                                    </h1>
                                    <p className="text-white/50 mt-2 text-sm">
                                          Manage your developer identity and
                                          live portfolio.
                                    </p>
                              </div>
                              {slugStatus.url && (
                                    <Link href={slugStatus.url} target="_blank">
                                          <Button>View Live Profile</Button>
                                    </Link>
                              )}
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                              <ProfileCard
                                    session={session}
                                    slugUrl={slugStatus.url}
                                    onDeploy={handleDeploySpace}
                                    slugLoading={slugStatus.loading}
                                    githubAvatar={githubData?.avatar ?? null}
                              />
                              <PlatformGrid
                                    metrics={metrics}
                                    platforms={platforms}
                                    onGithubSync={handleGithubSync}
                                    onLeetCodeConnect={handleLeetCodeConnect}
                                    onDeploySpace={handleDeploySpace}
                              />
                        </div>
                  </div>
            </main>
      );
}
