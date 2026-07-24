/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Site is served from https://arjunchavan219.github.io/bio/
// In prod we need basePath/assetPrefix so the static export resolves under /bio.
const basePath = isProd ? '/bio' : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isProd ? '/bio/' : '',
  trailingSlash: true,
  images: { unoptimized: true },
  // Next rewrites hrefs for next/link and framework-managed assets, but NOT for
  // plain <a href="/file.pdf"> pointing at public/. Export the basePath so
  // lib/asset.ts can prefix those by hand — otherwise they 404 in prod while
  // working perfectly on localhost.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
