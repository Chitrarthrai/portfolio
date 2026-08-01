/** @type {import('next').NextConfig} */
const nextConfig = {
  // Advanced Next.js 14 Package Import Tree-Shaking Optimization
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "framer-motion",
      "clsx",
      "tailwind-merge",
      "mini-svg-data-uri",
    ],
  },
  // Auto Image WebP & AVIF Format Compression
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;