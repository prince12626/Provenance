import Link from "next/link";

const Footer = () => {
      return (
            <footer className="border-t border-white/10 bg-black text-white">
                  <div className="max-w-6xl mx-auto px-6 py-16">
                        <div className="grid md:grid-cols-4 gap-10">
                              {/* Brand */}
                              <div className="md:col-span-2">
                                    <h2 className="text-2xl font-semibold">
                                          Provenance
                                    </h2>

                                    <p className="mt-4 max-w-sm text-white/50 leading-relaxed">
                                          Build your digital identity with
                                          verified achievements, projects, and
                                          contributions from across the
                                          developer ecosystem.
                                    </p>
                              </div>

                              {/* Product */}
                              <div>
                                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                                          Product
                                    </h3>

                                    <div className="mt-5 space-y-3">
                                          {[
                                                "Features",
                                                "Integrations",
                                                "Explore Profiles",
                                                "Pricing",
                                          ].map((item) => (
                                                <Link
                                                      key={item}
                                                      href="#"
                                                      className="block text-white/50 hover:text-white transition"
                                                >
                                                      {item}
                                                </Link>
                                          ))}
                                    </div>
                              </div>

                              {/* Company */}
                              <div>
                                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                                          Company
                                    </h3>

                                    <div className="mt-5 space-y-3">
                                          {[
                                                "About",
                                                "GitHub",
                                                "Contact",
                                                "Privacy",
                                          ].map((item) => (
                                                <Link
                                                      key={item}
                                                      href="#"
                                                      className="block text-white/50 hover:text-white transition"
                                                >
                                                      {item}
                                                </Link>
                                          ))}
                                    </div>
                              </div>
                        </div>

                        {/* Bottom */}
                        <div
                              className="
                              mt-14
                              pt-6
                              border-t
                              border-white/10
                              flex
                              flex-col
                              md:flex-row
                              items-center
                              justify-between
                              gap-4
                        "
                        >
                              <p className="text-sm text-white/40">
                                    © 2026 Provenance. All rights reserved.
                              </p>

                              <div className="flex items-center gap-5">
                                    <Link
                                          href="#"
                                          className="text-white/40 hover:text-white transition"
                                    >
                                          GitHub
                                    </Link>

                                    <Link
                                          href="#"
                                          className="text-white/40 hover:text-white transition"
                                    >
                                          Twitter
                                    </Link>

                                    <Link
                                          href="#"
                                          className="text-white/40 hover:text-white transition"
                                    >
                                          LinkedIn
                                    </Link>
                              </div>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
