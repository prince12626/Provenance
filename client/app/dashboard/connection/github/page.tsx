"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple SVG Icons for better UX
const CheckIcon = () => (
      <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
      >
            <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
      </svg>
);

const GitHubIcon = () => (
      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-0-1.095-.466-1.316-1.014-1.316-.548 0-1.014.221-1.014 1.316v2.234c0 .316.194.688.793.577 4.769-1.587 8.207-6.085 8.207-11.387 0-6.627-5.374-12-12-12z" />
      </svg>
);

const Page = () => {
      const searchParams = useSearchParams();
      const status = searchParams.get("status");

      // States: 'loading' | 'success' | 'error' | 'idle'
      const [uiState, setUiState] = useState<"loading" | "success" | "error">(
            "loading",
      );

      useEffect(() => {
            if (status === "success") {
                  setUiState("success");
            } else if (status === "error") {
                  setUiState("error");
            } else {
                  // Simulate loading (e.g., API call)
                  const timer = setTimeout(() => {
                        // Default to success if no status provided after load,
                        // or change this logic based on your actual API response
                        setUiState("success");
                  }, 2000);
                  return () => clearTimeout(timer);
            }
      }, [status]);

      // Modern Spinner Component
      const LoadingSpinner = () => (
            <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-16 h-16">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                  <p className="text-gray-400 text-sm font-medium tracking-wide animate-pulse">
                        Connecting to GitHub...
                  </p>
            </div>
      );

      // Success Card Component
      const SuccessCard = () => (
            <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-gray-900/80 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
            >
                  <div className="flex justify-center mb-6">
                        <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.2,
                              }}
                        >
                              <CheckIcon />
                        </motion.div>
                  </div>

                  <h1 className="text-3xl font-bold text-white mb-2">
                        Connection Successful
                  </h1>

                  <p className="text-gray-400 mb-8 leading-relaxed">
                        Your GitHub account has been successfully linked. You
                        can now access all integrated features.
                  </p>

                  <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                        onClick={() => (window.location.href = "/dashboard")} // Adjust redirect as needed
                  >
                        <GitHubIcon />
                        Go to Dashboard
                  </motion.button>
            </motion.div>
      );

      // Error Card Component (Bonus UX improvement)
      const ErrorCard = () => (
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/20 backdrop-blur-md border border-red-800/50 p-8 rounded-2xl max-w-md w-full text-center"
            >
                  <h1 className="text-2xl font-bold text-red-400 mb-2">
                        Connection Failed
                  </h1>
                  <p className="text-red-300/80 mb-6">
                        Something went wrong while connecting to GitHub.
                  </p>
                  <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                        Try Again
                  </button>
            </motion.div>
      );

      return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                  {/* Background Gradient Mesh for "Greatest UI" feel */}
                  <div className="absolute inset-0 z-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/20 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
                  </div>

                  <div className="z-10 w-full flex justify-center">
                        <AnimatePresence mode="wait">
                              {uiState === "loading" && (
                                    <motion.div
                                          key="loading"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0, y: -20 }}
                                          transition={{ duration: 0.3 }}
                                    >
                                          <LoadingSpinner />
                                    </motion.div>
                              )}

                              {uiState === "success" && (
                                    <motion.div
                                          key="success"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.5 }}
                                    >
                                          <SuccessCard />
                                    </motion.div>
                              )}

                              {uiState === "error" && (
                                    <motion.div
                                          key="error"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.5 }}
                                    >
                                          <ErrorCard />
                                    </motion.div>
                              )}
                        </AnimatePresence>
                  </div>
            </div>
      );
};

export default Page;
