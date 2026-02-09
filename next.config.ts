import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Export estático para despliegue con nginx (genera carpeta out/) */
  output: "export",
  /** Imágenes sin optimización en servidor (compatible con output: export) */
  images: { unoptimized: true },
};

export default nextConfig;
