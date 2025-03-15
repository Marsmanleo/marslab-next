/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/data/image/:path*',
        destination: 'http://localhost:8000/data/image/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
