import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Export estático para despliegue con nginx (genera carpeta out/) */
  output: "export",
};

export default nextConfig;
