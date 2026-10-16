import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Servidor Node autocontenido (necesario para pagos, webhooks y base de datos) */
  output: "standalone",
  images: { unoptimized: true },
};

export default nextConfig;
