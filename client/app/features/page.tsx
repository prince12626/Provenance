import Button from "@/components/Button";

const features = [
      {
            title: "Unified Developer Identity",
            description:
                  "Bring your GitHub, coding profiles, projects and achievements together into one professional identity.",
      },
      {
            title: "Verified Contributions",
            description:
                  "Show real proof of work through commits, repositories, open source contributions and achievements.",
      },
      {
            title: "Public Developer Profiles",
            description:
                  "Create a shareable profile that represents your skills, experience and technical journey.",
      },
      {
            title: "Platform Integrations",
            description:
                  "Connect multiple platforms and keep your developer reputation updated automatically.",
      },
      {
            title: "Project Showcase",
            description:
                  "Highlight your best projects with technologies used, links and contributions.",
      },
      {
            title: "Developer Discovery",
            description:
                  "Explore talented developers based on skills, projects and achievements.",
      },
];

export default function FeaturesPage() {
      return (
            <main className="min-h-screen bg-black text-white px-6 py-32">
                  <div className="max-w-6xl mx-auto">
                        <div className="max-w-3xl">
                              <p className="text-white/40 uppercase text-sm">
                                    Features
                              </p>

                              <h1 className="text-5xl font-semibold mt-4">
                                    Everything that defines a developer, in one
                                    place.
                              </h1>

                              <p className="text-white/50 mt-6 text-lg">
                                    Stop maintaining scattered profiles. Build a
                                    complete digital identity from your actual
                                    work.
                              </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-16">
                              {features.map((feature) => (
                                    <div
                                          key={feature.title}
                                          className="
                                                border
                                                border-white/10
                                                bg-white/5
                                                backdrop-blur-xl
                                                p-8
                                                hover:bg-white/10
                                                transition
                                          "
                                    >
                                          <h2 className="text-xl font-semibold">
                                                {feature.title}
                                          </h2>

                                          <p className="text-white/50 mt-4 leading-relaxed">
                                                {feature.description}
                                          </p>
                                    </div>
                              ))}
                        </div>

                        <div className="mt-20 text-center">
                              <Button size="lg">Build your profile</Button>
                        </div>
                  </div>
            </main>
      );
}
