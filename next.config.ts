import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['lh3.googleusercontent.com'],
  },

   typescript: {
        // Set to true to allow production builds to complete despite type errors
        ignoreBuildErrors: true,
      },

   eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
};

export default nextConfig;
