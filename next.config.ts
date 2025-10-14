import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"], // ← 外部画像ドメインを許可
  },
  reactStrictMode: true, // （任意）推奨：開発中のチェックを強化
};

export default nextConfig;
