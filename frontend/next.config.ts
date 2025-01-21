import { source } from "framer-motion/client";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
      {
        source: '/home/:path*',
        destination: 'http://localhost:3000/*',
      }
    ];
  },
};

module.exports = nextConfig;