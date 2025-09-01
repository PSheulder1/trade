// components/Navbar.jsx (updated)
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModel";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Learn", href: "#" },
    { name: "Exchange", href: "#" },
    { name: "Shop", href: "shop" },
    ...(isLoggedIn
      ? [{ name: "Dashboard", href: "dashboard" }]
      : [{ name: "Login/Register", href: "#", action: true }]),
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  const router = useRouter();

  useEffect(() => {
    // Check on mount
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Listen for login event from AuthModal
    const handleLoginSuccess = () => setIsLoggedIn(true);
    window.addEventListener("login-success", handleLoginSuccess);

    return () => {
      window.removeEventListener("login-success", handleLoginSuccess);
    };
  }, []);

  return (
    <>
      <nav className="fixed w-full z-50 bg-dark/90 backdrop-blur-md border-b border-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-3 h-3 rounded-full bg-neon shadow-glow" />
                <span className="text-xl font-bold tracking-tighter">X180</span>
              </motion.div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8  cursor-pointer">
                {navItems.map((item) =>
                  item.action ? (
                    <motion.button
                      key={item.name}
                      onClick={() => setAuthModalOpen(true)}
                      className="text-base font-medium hover:text-neon transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.button>
                  ) : (
                    <motion.a
                      key={item.name}
                      onClick={() => router.push(`/${item.href}`)}
                      className="text-base font-medium hover:text-neon transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.a>
                  )
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-neon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                      mobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-current transition duration-300 ease-in-out ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
                  ></span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-emerald-500"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) =>
                  item.action ? (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-900 hover:text-neon"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.button>
                  ) : (
                    <motion.a
                      key={item.name}
                      onClick={() => router.push(`/${item.href}`)}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-900 hover:text-neon"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
