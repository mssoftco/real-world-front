/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/arvan-cloud-front/' : '',
  images: { unoptimized: true }
};

module.exports = nextConfig;
