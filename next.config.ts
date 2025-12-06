// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... autres configurations
  experimental: {
    // Ceci est nécessaire pour les dossiers entre parenthèses (route groups)
    // dans l'App Router
    appDir: true,
    serverActions: true,
  },
  // Activez les logs de débogage si nécessaire
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
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
