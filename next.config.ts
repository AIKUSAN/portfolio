import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Deployed to custom domain via GitHub Pages: lorenztazan.com
  // CNAME file in public/ folder points to custom domain
  // No basePath needed - domain points directly to repository root
  reactCompiler: true,
};

export default nextConfig;
