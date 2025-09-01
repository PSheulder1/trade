"use client";

import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import Navbar from '../components/Navbar';


export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-3xl p-8">
            <h1 className="text-3xl font-bold mb-8">Welcome Back</h1>
            
            <form className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <div className="relative mt-2">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:border-blue-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm text-gray-400">Password</label>
                <div className="relative mt-2">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    className="w-full pl-12 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:border-blue-400 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox bg-transparent border-gray-600 rounded focus:ring-blue-400"
                  />
                  <span className="text-gray-400 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-blue-400 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center"
              >
                Log In
                <FiArrowRight className="ml-2" />
              </motion.button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/5 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Google Login */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/5 border border-gray-700 py-4 rounded-xl flex items-center justify-center gap-2 hover:border-blue-400 transition-colors"
              >
                <FcGoogle className="text-xl" />
                <span>Sign in with Google</span>
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:underline">
                Sign up
              </a>
            </p>
          </div>

          {/* Security Badges */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full">
              <FiLock className="text-green-400" />
              <span className="text-sm">Biometric Authentication</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}