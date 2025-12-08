// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... autres configurations
  experimental: {
    serverActions: true,
  },
  // Activez les logs de débogage si nécessaire
  logging: {
    fetches: {
      fullUrl: true,
    },
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

module.exports = nextConfig;
