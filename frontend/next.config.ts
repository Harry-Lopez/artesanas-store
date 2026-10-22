/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorizar peticion del dominio ngrok para no bloquearnos con CORS/HMR
  allowedDevOrigins: ['ramrod-robin-buffoon.ngrok-free.dev'],
};

export default nextConfig; */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Evitar bloqueos cruzados
  allowedDevOrigins: ['ramrod-robin-buffoon.ngrok-free.dev'],
  
  // 2. Nuestro NGINX local: Redirigir peticiones API al servidor Lenovo
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ramrod-robin-buffoon.ngrok-free.dev/api/:path*' 
      }
    ]
  }
};

export default nextConfig;