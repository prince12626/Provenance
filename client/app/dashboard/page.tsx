"use client";

import Button from "@/components/Button";

export default function DashboardPage() {
      return (
            <main className="min-h-screen pt-28 bg-black text-white px-6 py-10">
                  <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
                              <div>
                                    <h1 className="text-4xl font-semibold">
                                          Dashboard
                                    </h1>

                                    <p className="text-white/50 mt-2">
                                          Manage your developer identity and
                                          achievements.
                                    </p>
                              </div>

                              <Button>View Profile</Button>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                              <div
                                    className="
                                    lg:col-span-1
                                    border
                                    border-white/10
                                    bg-white/5
                                    backdrop-blur-xl
                                    p-6
                              "
                              >
                                    <div className="h-20 w-20 bg-white/10 mb-5" />

                                    <h2 className="text-2xl font-semibold">
                                          Prince Chaurasiya
                                    </h2>

                                    <p className="text-white/50 mt-1">
                                          Full Stack Developer
                                    </p>

                                    <p className="text-white/40 text-sm mt-5 leading-relaxed">
                                          Building scalable applications with
                                          modern web technologies.
                                    </p>
                              </div>

                              {/* Stats */}
                              <div
                                    className="
                                    lg:col-span-2
                                    grid
                                    sm:grid-cols-3
                                    gap-4
                              "
                              >
                                    {[
                                          ["24", "Repositories"],
                                          ["1200", "Contributions"],
                                          ["18", "Projects"],
                                    ].map(([value, label]) => (
                                          <div
                                                key={label}
                                                className="
                                                      border
                                                      border-white/10
                                                      bg-white/5
                                                      h-fit
                                                      backdrop-blur-xl
                                                      p-6
                                          "
                                          >
                                                <h3 className="text-3xl font-semibold">
                                                      {value}
                                                </h3>

                                                <p className="text-white/50 mt-2">
                                                      {label}
                                                </p>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Connections */}
                        <section className="mt-8">
                              <h2 className="text-2xl font-semibold mb-5">
                                    Connected Platforms
                              </h2>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                          {
                                                name: "GitHub",
                                                status: "Connected",
                                                connected: true,
                                          },
                                          {
                                                name: "LeetCode",
                                                status: "Not Connected",
                                                connected: false,
                                          },
                                          {
                                                name: "Codeforces",
                                                status: "Coming Soon",
                                                comingSoon: true,
                                          },
                                          {
                                                name: "LinkedIn",
                                                status: "Coming Soon",
                                                comingSoon: true,
                                          },
                                    ].map((item) => (
                                          <div
                                                key={item.name}
                                                className="
                                                      border
                                                      border-white/10
                                                      bg-white/5
                                                      p-5
                                                      flex
                                                      items-center
                                                      justify-between
                                          "
                                          >
                                                <div>
                                                      <h3 className="font-semibold">
                                                            {item.name}
                                                      </h3>

                                                      <p
                                                            className={`
                                                            text-sm mt-1
                                                            
                                                      `}
                                                      >
                                                            {item.status}
                                                      </p>
                                                </div>

                                                {!item.connected &&
                                                      !item.comingSoon && (
                                                            <Button
                                                                  size="sm"
                                                                  variant="secondary"
                                                            >
                                                                  Connect
                                                            </Button>
                                                      )}
                                          </div>
                                    ))}
                              </div>
                        </section>

                        {/* Activity */}
                        <section className="mt-8">
                              <h2 className="text-2xl font-semibold mb-5">
                                    Recent Activity
                              </h2>

                              <div
                                    className="
                                    border
                                    border-white/10
                                    bg-white/5
                                    p-6
                              "
                              >
                                    <div className="space-y-4 text-white/60">
                                          <p>🚀 Created a new project</p>

                                          <p>
                                                ⭐ Starred open source
                                                repositories
                                          </p>

                                          <p>💻 Connected GitHub account</p>
                                    </div>
                              </div>
                        </section>
                  </div>
            </main>
      );
}
