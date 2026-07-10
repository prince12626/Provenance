"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth";

export default function LoginPage() {
      const router = useRouter();

      // Local reactive ecosystem states
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");

      // 1. Email & Password Standard Form Login Handler
      const handleCredentialsLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!email || !password) return;

            setLoading(true);
            setErrorMessage("");

            await authClient.signIn.email({
                  email,
                  password,
                  fetchOptions: {
                        onRequest: () => setLoading(true),
                        onSuccess: () => {
                              setLoading(false);
                              router.push("/dashboard"); // Redirect target after successful session injection
                        },
                        onError: (ctx) => {
                              setLoading(false);
                              setErrorMessage(
                                    ctx.error.message ||
                                          "Invalid email or password credentials",
                              );
                        },
                  },
            });
      };

      // 2. Social OAuth Login Handler (GitHub/Google Execution Context)
      const handleSocialLogin = async (provider: "github" | "google") => {
            setLoading(true);
            await authClient.signIn.social({
                  provider,
                  callbackURL: "/dashboard", // Automatic redirection post platform verification
            });
      };

      return (
            <main className="relative min-h-screen bg-[url(https://images.pexels.com/photos/1612367/pexels-photo-1612367.jpeg)] bg-cover bg-center flex items-center justify-center px-4">
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/70" />

                  <div className="relative z-10 w-full max-w-lg border border-white/10 bg-black/50 backdrop-blur-xl p-8 rounded-xl shadow-2xl">
                        <div className="mb-8">
                              <h1 className="text-3xl font-semibold text-white">
                                    Welcome back
                              </h1>
                              <p className="text-white/50 mt-2">
                                    Login to continue to your account
                              </p>
                        </div>

                        {/* Global UI Runtime Error Alert Container */}
                        {errorMessage && (
                              <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
                                    {errorMessage}
                              </div>
                        )}

                        {/* Credentials Authentication Form Mapping */}
                        <form
                              onSubmit={handleCredentialsLogin}
                              className="space-y-5"
                        >
                              <Input
                                    label="Email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    required
                              />

                              <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                          setPassword(e.target.value)
                                    }
                                    disabled={loading}
                                    required
                              />

                              <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={loading}
                              >
                                    {loading ? "Verifying..." : "Login"}
                              </Button>
                        </form>

                        <div className="my-6 flex items-center gap-3">
                              <div className="h-px bg-white/10 flex-1" />
                              <span className="text-white/40 text-sm">OR</span>
                              <div className="h-px bg-white/10 flex-1" />
                        </div>

                        {/* GitHub Integration Strategy Trigger Hook */}
                        <Button
                              onClick={() => handleSocialLogin("github")}
                              variant="secondary"
                              size="lg"
                              className="w-full flex items-center justify-center gap-3 border border-white/10 hover:bg-white/5 transition-all text-white"
                              disabled={loading}
                        >
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 48 48"
                              >
                                    <path
                                          fill="#FFC107"
                                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                    ></path>
                                    <path
                                          fill="#FF3D00"
                                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                    ></path>
                                    <path
                                          fill="#4CAF50"
                                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                    ></path>
                                    <path
                                          fill="#1976D2"
                                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                    ></path>
                              </svg>
                              Continue with Google
                        </Button>

                        <p className="text-center text-white/50 text-sm mt-6">
                              Don't have an account?{" "}
                              <Link
                                    href="/auth/register"
                                    className="text-white cursor-pointer hover:underline"
                              >
                                    Sign up
                              </Link>
                        </p>
                  </div>
            </main>
      );
}
