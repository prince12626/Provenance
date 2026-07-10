"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";

const Navbar = () => {
      const [open, setOpen] = useState(false);

      const links = ["Home", "Features", "Explore", "About"];

      return (
            <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-6xl">
                  <div
                        className="
                        flex
                        items-center
                        justify-between
                        border
                        border-white/10
                        bg-black/40
                        backdrop-blur-xl
                        px-5
                        py-3
                  "
                  >
                        {/* Logo */}
                        <Link
                              href="/"
                              className="text-2xl font-medium text-white"
                        >
                              Provenance
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                              {links.map((item) => (
                                    <Link
                                          key={item}
                                          href="#"
                                          className="text-sm text-white/60 hover:text-white transition"
                                    >
                                          {item}
                                    </Link>
                              ))}
                        </div>

                        <Button>
                              Get Started
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                              onClick={() => setOpen(!open)}
                              className="md:hidden text-white text-xl"
                        >
                              {open ? "✕" : "☰"}
                        </button>
                  </div>

                  {/* Mobile Dropdown */}
                  {open && (
                        <div
                              className="
                              md:hidden
                              mt-2
                              border
                              border-white/10
                              bg-black/70
                              backdrop-blur-xl
                              p-5
                              space-y-4
                        "
                        >
                              {links.map((item) => (
                                    <Link
                                          key={item}
                                          href="#"
                                          className="
                                                block
                                                text-white/70
                                                hover:text-white
                                          "
                                          onClick={() => setOpen(false)}
                                    >
                                          {item}
                                    </Link>
                              ))}

                              <Button>
                                    Get Started
                              </Button>
                        </div>
                  )}
            </nav>
      );
};

export default Navbar;
