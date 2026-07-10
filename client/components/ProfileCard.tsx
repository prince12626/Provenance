"use client";

import Button from "@/components/Button";
import { UserSession } from "@/types/dashboard";

interface ProfileCardProps {
      session: UserSession | null;
      slugUrl: string;
      onDeploy: () => Promise<void>;
      slugLoading: boolean;
      githubAvatar?: string | null;
}

export default function ProfileCard({
      session,
      slugUrl,
      onDeploy,
      slugLoading,
      githubAvatar,
}: ProfileCardProps) {
      return (
            <div className="lg:col-span-1 border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between">
                  <div>
                        {githubAvatar || session?.user?.image ? (
                              <img
                                    src={githubAvatar || session?.user?.image!}
                                    alt="avatar"
                                    className="h-20 w-20 border border-white/10 mb-5 object-cover"
                              />
                        ) : (
                              <div className="h-20 w-20 bg-white/10 mb-5 border border-white/5" />
                        )}

                        <h2 className="text-2xl font-semibold tracking-tight">
                              {session?.user?.name || "Prince Chaurasiya"}
                        </h2>
                        <p className="text-white/50 mt-1 text-sm font-mono">
                              {session?.user?.email}
                        </p>
                        <p className="text-white/40 text-sm mt-5 leading-relaxed">
                              Full Stack Developer. Building scalable
                              applications with modern web technologies.
                        </p>
                  </div>

                  {/* Dynamic Slug Status & Deployment Button */}
                  <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                        {slugUrl && (
                              <div>
                                    <span className="text-[10px] font-mono text-white/30 block mb-1">
                                          LIVE POINTER URL:
                                    </span>
                                    <span className="text-xs font-mono text-green-400 break-all underline">
                                          {slugUrl}
                                    </span>
                              </div>
                        )}
                        <Button
                              className="w-full"
                              variant="secondary"
                              onClick={onDeploy}
                              disabled={slugLoading}
                        >
                              {slugLoading
                                    ? "Compiling Layer..."
                                    : "Publish Space"}
                        </Button>
                  </div>
            </div>
      );
}
