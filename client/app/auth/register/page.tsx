"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
      return (
            <main className="relative min-h-screen bg-[url(https://images.pexels.com/photos/1612367/pexels-photo-1612367.jpeg)] bg-cover bg-center flex items-center justify-center px-4">
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/70" />

                  <div className="relative z-10 w-full max-w-lg border border-white/10 bg-black/50 backdrop-blur-xl p-8">
                        <div className="mb-8">
                              <h1 className="text-3xl font-semibold text-white">
                                    Create account
                              </h1>
                              <p className="text-white/50 mt-2">
                                    Register to get started
                              </p>
                        </div>

                        <form className="space-y-5">
                              <Input
                                    label="Name"
                                    type="text"
                                    placeholder="John Doe"
                              />

                              <Input
                                    label="Email"
                                    type="email"
                                    placeholder="you@example.com"
                              />

                              <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                              />

                              <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="••••••••"
                              />

                              <Button size="lg" className="w-full">
                                    Create Account
                              </Button>
                        </form>

                        <div className="my-6 flex items-center gap-3">
                              <div className="h-px bg-white/10 flex-1" />
                              <span className="text-white/40 text-sm">OR</span>
                              <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <Button
                              variant="secondary"
                              size="lg"
                              className="w-full flex items-center justify-center gap-3"
                        >
                              <Image
                                    width={20}
                                    height={20}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1280px-Google_Favicon_2025.svg.png"
                                    alt="google icon"
                              />
                              Continue with Google
                        </Button>

                        <p className="text-center text-white/50 text-sm mt-6">
                              Already have an account?{" "}
                              <Link
                                    href="/auth/login"
                                    className="text-white cursor-pointer hover:underline"
                              >
                                    Login
                              </Link>
                        </p>
                  </div>
            </main>
      );
}
