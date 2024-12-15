import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = {
        client: {
          overlay: false, // Desactiva el popup de errores
        },
      };
    }
    return config;
  },
};

export default nextConfig;
