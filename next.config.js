/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  ...{ ...(process.env.NODE_ENV === 'production' ? { assetPrefix: '/real-world-front/',images: { unoptimized: true } } : {}) }
};

module.exports = nextConfig;
