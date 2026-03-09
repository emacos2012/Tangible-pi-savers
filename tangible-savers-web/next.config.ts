import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed "output: export" to enable API routes for Pi payment processing
  // Use "output: export" only when deploying to static hosting without server
  turbopack: {
    root: "./",
  },
  images: {
    unoptimized: true,
  },
  // Handle external scripts
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['firebase', '@firebase'],
  },
  /* config options here */
};

export default nextConfig;
