import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorizar peticion del dominio ngrok para no bloquearnos con CORS/HMR
  allowedDevOrigins: ['ramrod-robin-buffoon.ngrok-free.dev'],
};

export default nextConfig;