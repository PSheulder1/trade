"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCheck, FiAlertCircle, FiLogIn } from "react-icons/fi";

export default function MagicLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Get token from URL on client side only
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get("token");
      setToken(tokenParam);

      if (!tokenParam) {
        setStatus("error");
        setErrorMessage("Missing login token");
        return;
      }

      const encodedToken = encodeURIComponent(tokenParam);

      async function loginWithToken() {
        try {
          const response = await fetch(`${API_URL}/magic-login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: encodedToken }),
            credentials: "include",
            mode: "cors",
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Login failed");
          }

          setStatus("success");
          // Redirect after a short delay to show success message
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } catch (error: any) {
          setStatus("error");
          setErrorMessage(error.message || "Login failed");
        }
      }

      loginWithToken();
    }
  }, [router, API_URL]);

  const renderContent = () => {
    switch (status) {
      case "pending":
        return (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mx-auto w-16 h-16 rounded-full border-4 border-neon border-t-transparent mb-6"
            />
            <p className="text-xl font-semibold text-gray-300">Logging you in...</p>
          </div>
        );

      case "success":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-neon to-emerald-500 flex items-center justify-center mb-6">
              <FiCheck className="text-white text-2xl" />
            </div>
            <p className="text-xl font-semibold text-neon mb-2">Login Successful!</p>
            <p className="text-gray-400">Redirecting to your dashboard...</p>
          </motion.div>
        );

      case "error":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-6">
              <FiAlertCircle className="text-white text-2xl" />
            </div>
            <p className="text-xl font-semibold text-red-400 mb-2">Login Failed</p>
            <p className="text-gray-400 mb-6">{errorMessage}</p>
            <motion.button
              onClick={() => router.push("/login")}
              className="px-6 py-3 rounded-md bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLogIn className="mr-2" /> Back to Login
            </motion.button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      
      {/* Glow effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-neon/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-dark-800 rounded-2xl shadow-xl border border-gray-800 p-8 relative z-10"
      >
        {/* Glow effect inside card */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon/10 to-emerald-400/10 opacity-30 pointer-events-none rounded-2xl" />

        <div className="text-center mb-8 relative">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-neon to-emerald-500 flex items-center justify-center mb-4">
            <FiLogIn className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Magic Login</h1>
        </div>

        {renderContent()}
      </motion.div>
    </div>
  );
}