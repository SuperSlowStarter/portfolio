import type { NextConfig } from "next";

// 정적 포트폴리오: 모든 페이지를 빌드 때 미리 만든다 (Cache Components 미사용 → dynamicParams 등 기존 세그먼트 설정 사용)
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
};

export default nextConfig;
