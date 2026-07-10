"use client";

import Button from "@/components/Button";

export default function PublicProfilePage() {
      return (
            <main className="min-h-screen bg-black text-white px-6 py-32">
                  <div className="max-w-6xl mx-auto">
                        {/* Profile Header */}
                        <section
                              className="
                              border
                              border-white/10
                              bg-white/5
                              backdrop-blur-xl
                              p-8
                        "
                        >
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div
                                          className="
                                          h-28
                                          w-28
                                          bg-white/10
                                          border
                                          border-white/10
                                    "
                                    />

                                    <div className="flex-1">
                                          <h1 className="text-4xl font-semibold">
                                                &#128061;
                                          </h1>

                                          <p className="text-white/50 mt-2">
                                                Full Stack Developer
                                          </p>

                                          <p className="text-white/60 mt-5 max-w-2xl">
                                                Building scalable web
                                                applications and exploring
                                                modern technologies.
                                          </p>

                                          <div className="flex flex-wrap gap-3 mt-6">
                                                {[
                                                      "React",
                                                      "Next.js",
                                                      "Node.js",
                                                      "TypeScript",
                                                      "PostgreSQL",
                                                ].map((skill) => (
                                                      <span
                                                            key={skill}
                                                            className="
                                                                  px-3
                                                                  py-1
                                                                  text-sm
                                                                  bg-white/10
                                                                  border
                                                                  border-white/10
                                                            "
                                                      >
                                                            {skill}
                                                      </span>
                                                ))}
                                          </div>
                                    </div>

                                    <Button>Connect</Button>
                              </div>
                        </section>

                        {/* Reputation Stats */}
                        <section className="grid md:grid-cols-4 gap-4 mt-8">
                              {[
                                    ["32", "Repositories"],
                                    ["850", "Contributions"],
                                    ["350+", "LeetCode Solved"],
                                    ["12", "Projects"],
                              ].map(([value, label]) => (
                                    <div
                                          key={label}
                                          className="
                                                border
                                                border-white/10
                                                bg-white/5
                                                backdrop-blur-xl
                                                p-6
                                          "
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
                        <section className="mt-10">
                              <h2 className="text-2xl font-semibold mb-5">
                                    Connected Platforms
                              </h2>

                              <div className="grid md:grid-cols-2 gap-5">
                                    <div
                                          className="
                                          border
                                          border-white/10
                                          bg-white/5
                                          p-6
                                    "
                                    >
                                          <h3 className="text-xl font-semibold">
                                                GitHub
                                          </h3>

                                          <p className="text-white/50 mt-2">
                                                github.com/prince12626
                                          </p>

                                          <div className="mt-5 flex gap-8">
                                                <div>
                                                      <p className="text-xl font-semibold">
                                                            32
                                                      </p>
                                                      <span className="text-white/40 text-sm">
                                                            Repos
                                                      </span>
                                                </div>

                                                <div>
                                                      <p className="text-xl font-semibold">
                                                            1200
                                                      </p>

                                                      <span className="text-white/40 text-sm">
                                                            Stars
                                                      </span>
                                                </div>
                                          </div>
                                    </div>

                                    <div
                                          className="
                                          border
                                          border-white/10
                                          bg-white/5
                                          p-6
                                    "
                                    >
                                          <h3 className="text-xl font-semibold">
                                                LeetCode
                                          </h3>

                                          <p className="text-white/50 mt-2">
                                                prince_chaurasiya
                                          </p>

                                          <div className="mt-5 flex gap-8">
                                                <div>
                                                      <p className="text-xl font-semibold">
                                                            350
                                                      </p>

                                                      <span className="text-white/40 text-sm">
                                                            Solved
                                                      </span>
                                                </div>

                                                <div>
                                                      <p className="text-xl font-semibold">
                                                            1650
                                                      </p>

                                                      <span className="text-white/40 text-sm">
                                                            Rating
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* Projects */}
                        <section className="mt-10">
                              <h2 className="text-2xl font-semibold mb-5">
                                    Featured Projects
                              </h2>

                              <div className="grid md:grid-cols-3 gap-5">
                                    {[
                                          "Portfolio Platform",
                                          "VPS Management System",
                                          "AI Assistant",
                                    ].map((project) => (
                                          <div
                                                key={project}
                                                className="
                                                      border
                                                      border-white/10
                                                      bg-white/5
                                                      p-6
                                                "
                                          >
                                                <h3 className="font-semibold text-lg">
                                                      {project}
                                                </h3>

                                                <p className="text-white/50 mt-3 text-sm">
                                                      Built using modern web
                                                      technologies.
                                                </p>
                                          </div>
                                    ))}
                              </div>
                        </section>
                  </div>
            </main>
      );
}
