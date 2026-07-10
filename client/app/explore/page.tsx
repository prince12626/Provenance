const developers = [
      {
            name: "Prince Chaurasiya",
            role: "Full Stack Developer",
            skills: ["React", "Node.js", "PostgreSQL"],
            projects: 12,
            contributions: 850,
      },
      {
            name: "Alex Developer",
            role: "Backend Engineer",
            skills: ["Go", "Docker", "AWS"],
            projects: 20,
            contributions: 1400,
      },
      {
            name: "Sarah Khan",
            role: "Frontend Engineer",
            skills: ["Next.js", "TypeScript"],
            projects: 8,
            contributions: 600,
      },
];

export default function ExplorePage() {
      return (
            <main className="min-h-screen bg-black text-white px-6 py-32">
                  <div className="max-w-6xl mx-auto">
                        <div>
                              <p className="text-white/40 uppercase text-sm">
                                    Explore
                              </p>

                              <h1 className="text-5xl font-semibold mt-4">
                                    Discover developers
                              </h1>

                              <p className="text-white/50 mt-5">
                                    Find developers by skills, projects and
                                    achievements.
                              </p>
                        </div>

                        {/* Search */}
                        <input
                              placeholder="Search developers..."
                              className="
                                    mt-10
                                    w-full
                                    bg-white/5
                                    border
                                    border-white/10
                                    px-5
                                    py-4
                                    text-white
                                    outline-none
                                    placeholder:text-white/40
                              "
                        />

                        <div className="grid md:grid-cols-3 gap-6 mt-10">
                              {developers.map((dev) => (
                                    <div
                                          key={dev.name}
                                          className="
                                                border
                                                border-white/10
                                                bg-white/5
                                                backdrop-blur-xl
                                                p-6
                                          "
                                    >
                                          <div className="h-16 w-16 bg-white/10 mb-5" />

                                          <h2 className="text-xl font-semibold">
                                                {dev.name}
                                          </h2>

                                          <p className="text-white/50">
                                                {dev.role}
                                          </p>

                                          <div className="flex flex-wrap gap-2 mt-5">
                                                {dev.skills.map((skill) => (
                                                      <span
                                                            key={skill}
                                                            className="
                                                                  text-xs
                                                                  px-3
                                                                  py-1
                                                                  bg-white/10
                                                                  text-white/70
                                                            "
                                                      >
                                                            {skill}
                                                      </span>
                                                ))}
                                          </div>

                                          <div className="flex gap-6 mt-6 text-sm">
                                                <div>
                                                      <p className="font-semibold">
                                                            {dev.projects}
                                                      </p>
                                                      <p className="text-white/40">
                                                            Projects
                                                      </p>
                                                </div>

                                                <div>
                                                      <p className="font-semibold">
                                                            {dev.contributions}
                                                      </p>
                                                      <p className="text-white/40">
                                                            Contributions
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </main>
      );
}
