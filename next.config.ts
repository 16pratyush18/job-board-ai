import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for Turbopack occasionally inferring the wrong workspace root
  // (especially when multiple lockfiles exist on the system).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;

