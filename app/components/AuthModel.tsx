// components/AuthModal.jsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

import toast from "react-hot-toast";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let url = "";

    if (activeTab === "login") {
      url += "log-in";
    } else if (activeTab === "signup") {
      url += "register";
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/${url}/`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success! :", response.data);

      if (activeTab === "signup") {
        setRegisteredEmail(email);
        setShowOTPModal(true);
        toast.success(response.data.message);
      }

      if (activeTab === "login") {
        toast.success("Logged In!");
        if (response.data.access) {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          // Optionally trigger a custom event for cross-component update
          window.dispatchEvent(new Event("login-success"));
        }
      }

      onClose(); // Close modal if success
    } catch (error: any) {
      if (error.response) {
        console.log("Backend error:", error.response.data);
        alert(
          error.response.data.error ||
            error.response.data.errors?.[0] ||
            "Une erreur s'est produite. Vérifiez vos infos."
        );
      } else {
        console.error("Request failed:", error);
        alert("Impossible de contacter le serveur.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-md py-6 "
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-dark-800 rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon/10 to-emerald-400/10 opacity-30 pointer-events-none" />

                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-center relative top-[15px] ">
                    <h2 className="text-2xl font-bold">
                      {activeTab === "login"
                        ? "Welcome Back"
                        : "Create Account"}
                    </h2>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-white"
                      onClick={onClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Tabs */}
                  <div className="mt-6 flex space-x-4 border-b border-gray-800">
                    <button
                      className={`pb-3 px-1 relative ${
                        activeTab === "login"
                          ? "text-neon"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                      {activeTab === "login" && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-neon"
                          layoutId="authTabIndicator"
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                          }}
                        />
                      )}
                    </button>
                    <button
                      disabled={isLoading}
                      className={`pb-3 px-1 relative ${
                        activeTab === "signup"
                          ? "text-neon"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                      onClick={() => setActiveTab("signup")}
                    >
                      Sign Up
                      {activeTab === "signup" && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-neon"
                          layoutId="authTabIndicator"
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                          }}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-400 mb-1"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            className="w-full bg-dark-700 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <div className="absolute right-3 top-3 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-400 mb-1"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            className="w-full bg-dark-700 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div className="absolute right-3 top-3 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {activeTab === "signup" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-gray-400 mb-1"
                            >
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                id="confirmPassword"
                                className="w-full bg-dark-700 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition"
                                placeholder="••••••••"
                                required
                              />
                              <div className="absolute right-3 top-3 text-gray-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex items-center justify-between">
                   
                        {activeTab === "login" && (
                          <motion.a
                            whileHover={{ color: "#00FF99", x: 2 }}
                            href="#"
                            className="text-sm text-gray-400 hover:text-neon transition-colors"
                          >
                            Forgot password?
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className="mt-6 cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold rounded-lg shadow-lg shadow-neon/30 relative overflow-hidden"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(0, 255, 153, 0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">
                        {activeTab === "login"
                          ? "Login to Account"
                          : "Create Account"}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white opacity-0"
                        animate={{
                          opacity: [0, 0.2, 0],
                          left: ["-100%", "100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      />
                    </motion.button>
                  </form>

              

                  <div className="mt-6 text-center text-sm text-gray-500">
                    {activeTab === "login" ? (
                      <p>
                        Don't have an account?{" "}
                        <motion.button
                          type="button"
                          className="font-medium text-neon hover:text-emerald-300 transition-colors"
                          whileHover={{ color: "#00FF99", x: 2 }}
                          onClick={() => setActiveTab("signup")}
                        >
                          Sign up
                        </motion.button>
                      </p>
                    ) : (
                      <p className="relative top-[-15px]">
                        Already have an account?{" "}
                        <motion.button
                          type="button"
                          className="font-medium text-neon hover:text-emerald-300 transition-colors"
                          whileHover={{ color: "#00FF99", x: 2 }}
                          onClick={() => setActiveTab("login")}
                        >
                          Login
                        </motion.button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthModal;
