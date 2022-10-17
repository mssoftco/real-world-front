/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  ...{ ...(process.env.NODE_ENV === 'production' ? { assetPrefix: '/real-world-front/',basePath:'/real-world-front/',images: { unoptimized: true } } : {}) }
};

module.exports = nextConfig;
