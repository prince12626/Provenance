"use client";

import Button from "@/components/Button";
import Image from "next/image";

export default function LandingPage() {
      const platforms = [
            {
                  image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png",
                  coming: false,
                  platform: "GitHub",
            },
            {
                  image: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
                  coming: false,
                  platform: "LeetCode",
            },
            {
                  image: "https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-svg-download-png-2944796.png?f=webp&w=128",
                  coming: true,
                  platform: "Codeforces",
            },
            {
                  image: "https://cdn-icons-png.flaticon.com/256/174/174857.png",
                  coming: true,
                  platform: "LinkedIn",
            },
            {
                  image: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2F78hs31fax49uwy6kbxyw.png",
                  coming: true,
                  platform: "Dev.to",
            },
      ];

      return (
            <main className="min-h-screen bg-black text-white overflow-hidden">
                  {/* Hero */}
                  <section className="relative min-h-screen flex items-center justify-center px-6">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />

                        <div className="relative z-10 max-w-5xl text-center">
                              <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-xl">
                                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                                    The modern developer identity
                              </div>

                              <h1 className="mt-8 text-5xl md:text-7xl font-semibold leading-tight">
                                    Your work.
                                    <br />
                                    <span className="text-white/40">
                                          Your achievements.
                                    </span>
                                    <br />
                                    One identity.
                              </h1>

                              <p className="max-w-2xl mx-auto mt-6 text-lg text-white/50">
                                    Connect your GitHub, competitive
                                    programming, projects and contributions into
                                    a single powerful portfolio that truly
                                    represents you.
                              </p>

                              <div className="mt-10 flex justify-center gap-4">
                                    <Button size="lg">
                                          Build your profile
                                    </Button>

                                    <Button variant="secondary" size="lg">
                                          Explore profiles
                                    </Button>
                              </div>
                        </div>
                  </section>

                  {/* Integrations */}
                  <section className="px-6">
                        <div className="max-w-6xl mx-auto">
                              <p className="text-center text-white/40 mb-8">
                                    Connect everything you build
                              </p>

                              <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/10 border border-white/10">
                                    {platforms.map((item) => (
                                          <div
                                                key={item.platform}
                                                className="
                                    group
                                    relative
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    gap-3
                                    h-40
                                    bg-black/40
                                    backdrop-blur-xl
                                    hover:bg-white/5
                                    transition-all
                              "
                                          >
                                                {item.image ? (
                                                      <Image
                                                            src={item.image}
                                                            alt={item.platform}
                                                            height={45}
                                                            width={45}
                                                            className="opacity-80 group-hover:scale-110 transition-transform"
                                                      />
                                                ) : (
                                                      <div className="h-11.5 w-11.5 bg-white/10 animate-pulse" />
                                                )}

                                                <p className="text-white/80 font-medium">
                                                      {item.platform}
                                                </p>

                                                {item.coming && (
                                                      <span
                                                            className="
                                          absolute
                                          top-3
                                          right-3
                                          text-[10px]
                                          uppercase
                                          tracking-wider
                                          px-2
                                          py-1
                                          bg-white/10
                                          text-white/50
                                          border
                                          border-white/10
                                    "
                                                      >
                                                            Soon
                                                      </span>
                                                )}
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* Profile Preview */}
                  <section className="px-6 py-32">
                        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                              <div>
                                    <p className="text-white/40 uppercase text-sm">
                                          Your reputation
                                    </p>

                                    <h2 className="text-4xl font-semibold mt-4">
                                          More than a resume.
                                          <br />A proof of work.
                                    </h2>

                                    <p className="text-white/50 mt-5 leading-relaxed">
                                          Showcase real achievements instead of
                                          just listing skills. Let your work
                                          speak through verified contributions.
                                    </p>
                              </div>

                              <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                                    <div className="flex items-center gap-4">
                                          <div className="w-14 h-14 bg-white/10" />

                                          <div>
                                                <h3 className="font-semibold">
                                                      Prince Chaurasiya
                                                </h3>
                                                <p className="text-white/40 text-sm">
                                                      Full Stack Developer
                                                </p>
                                          </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mt-8">
                                          {[
                                                ["32", "Projects"],
                                                ["1200", "Commits"],
                                                ["18", "Badges"],
                                          ].map(([a, b]) => (
                                                <div
                                                      key={b}
                                                      className="border border-white/10 p-4"
                                                >
                                                      <p className="text-xl font-semibold">
                                                            {a}
                                                      </p>
                                                      <p className="text-white/40 text-sm">
                                                            {b}
                                                      </p>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Features */}

                  <section className="px-6 pb-32">
                        <div className="max-w-6xl mx-auto">
                              <h2 className="text-4xl font-semibold mb-10">
                                    Built for modern developers
                              </h2>

                              <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                          [
                                                "Unified Profile",
                                                "Bring achievements from every platform together.",
                                          ],
                                          [
                                                "Verified Skills",
                                                "Show proof through real contributions.",
                                          ],
                                          [
                                                "AI Portfolio",
                                                "Generate a portfolio that evolves with your work.",
                                          ],
                                    ].map(([title, desc]) => (
                                          <div
                                                key={title}
                                                className="border border-white/10 bg-white/5 p-8 hover:-translate-y-1 transition-all duration-300 cursor-default"
                                          >
                                                <h3 className="text-xl font-semibold">
                                                      {title}
                                                </h3>

                                                <p className="mt-4 text-white/50">
                                                      {desc}
                                                </p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* CTA */}

                  <section className="px-6 pb-32">
                        <div className="max-w-5xl mx-auto text-center border border-white/10 bg-white/5 p-16">
                              <h2 className="text-5xl font-semibold">
                                    Your next opportunity starts here.
                              </h2>

                              <p className="mt-5 text-white/50">
                                    Create a profile that proves what you can
                                    build.
                              </p>

                              <div className="mt-8">
                                    <Button size="lg">Get Started</Button>
                              </div>
                        </div>
                  </section>
            </main>
      );
}
