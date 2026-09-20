import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.mimir.business",
        port: "",
        pathname: "/assets/**",
        search: "",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
