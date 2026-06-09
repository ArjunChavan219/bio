/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Site is served from https://arjunchavan219.github.io/bio/
// In prod we need basePath/assetPrefix so the static export resolves under /bio.
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/bio' : '',
  assetPrefix: isProd ? '/bio/' : '',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
