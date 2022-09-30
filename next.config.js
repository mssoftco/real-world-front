/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  images: { unoptimized: true },
  ...{ ...(process.env.NODE_ENV === 'production' ? { assetPrefix: '/arvan-cloud-front/' } : {}) }
};

module.exports = nextConfig;
