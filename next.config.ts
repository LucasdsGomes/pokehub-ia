import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",   // qualquer chamada para /api/*
        destination: "http://localhost:8000/:path*", // vai pro backend FastAPI
      },
    ];
  },
};

export default nextConfig;
