"use client";

import Button from "@/components/Button";
import { Metrics, Platforms } from "@/types/dashboard";

interface PlatformGridProps {
      metrics: Metrics;
      platforms: Platforms;
      onGithubSync: () => void;
      onLeetCodeConnect: () => Promise<void>;
      onDeploySpace: () => Promise<void>;
}

export default function PlatformGrid({
      metrics,
      platforms,
      onGithubSync,
      onLeetCodeConnect,
      onDeploySpace,
}: PlatformGridProps) {
      return (
            <div className="lg:col-span-2 space-y-8">
                  {/* Analytics Clusters */}
                  <div className="grid sm:grid-cols-3 gap-4">
                        {[
                              [metrics.repos, "Repositories", onGithubSync],
                              [metrics.contributions, "Contributions", null],
                              [
                                    metrics.projects,
                                    "Live Projects",
                                    onDeploySpace,
                              ],
                        ].map(([value, label, action]) => (
                              <div
                                    key={label as string}
                                    onClick={() =>
                                          action && (action as () => void)()
                                    }
                                    className={`border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between ${
                                          action
                                                ? "cursor-pointer hover:border-white/30 transition-all"
                                                : ""
                                    }`}
                              >
                                    <h3 className="text-4xl font-semibold tracking-tight font-mono">
                                          {value as string}
                                    </h3>
                                    <div className="mt-4 flex items-center justify-between w-full">
                                          <p className="text-white/50 text-sm">
                                                {label as string}
                                          </p>
                                          {action && (
                                                <span className="text-[10px] font-mono text-white/30">
                                                      &gt; Trigger Sync
                                                </span>
                                          )}
                                    </div>
                              </div>
                        ))}
                  </div>

                  {/* Connection Module Shards */}
                  <div>
                        <h2 className="text-2xl font-semibold mb-5 tracking-tight">
                              Connected Platforms
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                              <div className="border border-white/10 bg-white/5 p-5 flex items-center justify-between">
                                    <div>
                                          <h3 className="font-semibold text-sm tracking-wide">
                                                GitHub
                                          </h3>
                                          <p className="text-xs mt-1 text-white/40 font-mono">
                                                {platforms.github.status}
                                          </p>
                                    </div>
                                    <Button
                                          size="sm"
                                          variant={
                                                platforms.github.connected
                                                      ? "secondary"
                                                      : "primary"
                                          }
                                          onClick={onGithubSync}
                                          disabled={platforms.github.loading}
                                    >
                                          Sync
                                    </Button>
                              </div>

                              <div className="border border-white/10 bg-white/5 p-5 flex items-center justify-between">
                                    <div>
                                          <h3 className="font-semibold text-sm tracking-wide">
                                                LeetCode
                                          </h3>
                                          <p
                                                className={`text-xs mt-1 font-mono ${platforms.leetcode.connected ? "text-green-400" : "text-white/40"}`}
                                          >
                                                {platforms.leetcode.status}
                                          </p>
                                    </div>
                                    {!platforms.leetcode.connected && (
                                          <Button
                                                size="sm"
                                                onClick={onLeetCodeConnect}
                                                disabled={
                                                      platforms.leetcode.loading
                                                }
                                          >
                                                {platforms.leetcode.loading
                                                      ? "Connecting..."
                                                      : "Connect"}
                                          </Button>
                                    )}
                              </div>

                              <div className="border border-white/5 bg-white/[0.02] p-5 flex items-center justify-between opacity-50 select-none">
                                    <div>
                                          <h3 className="font-semibold text-sm text-white/60">
                                                Codeforces
                                          </h3>
                                          <p className="text-xs mt-1 text-white/30 font-mono">
                                                Coming Soon
                                          </p>
                                    </div>
                              </div>

                              <div className="border border-white/5 bg-white/[0.02] p-5 flex items-center justify-between opacity-50 select-none">
                                    <div>
                                          <h3 className="font-semibold text-sm text-white/60">
                                                LinkedIn
                                          </h3>
                                          <p className="text-xs mt-1 text-white/30 font-mono">
                                                Coming Soon
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
