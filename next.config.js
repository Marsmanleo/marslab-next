/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // 圖片資源代理
      {
        source: "/data/image/:path*",
        destination: "http://localhost:8000/data/image/:path*",
      },
      // API代理
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
