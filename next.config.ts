import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: process.env.NODE_ENV === "development" ? ".next" : "dist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
