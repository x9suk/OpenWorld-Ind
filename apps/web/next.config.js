/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@openworld/types', '@openworld/shared', '@openworld/ui'],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: { optimizePackageImports: ['@openworld/ui', '@openworld/shared'] },
};
module.exports = nextConfig;
