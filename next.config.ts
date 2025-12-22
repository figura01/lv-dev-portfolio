import type { NextConfig } from "next";
const isDevelopment = process.env.NODE_ENV === "development";
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // Désactive le Edge Runtime pour les routes API
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  // Désactive le Edge Runtime pour le middleware
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }
    return config;
  },
  async headers() {
    if (isDevelopment) return [];
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              script-src 'self' 'unsafe-eval' 'unsafe-inline' vercel.live;
              img-src 'self' data: vercel.live;
              connect-src 'self' vercel.live;
              style-src 'self' 'unsafe-inline';
              frame-src vercel.live;
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
