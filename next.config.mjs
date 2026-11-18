/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';

const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.app',
      },
    ],
    unoptimized: true,
  },

  // Next.js 16 已内置依赖导入优化，无需手动声明 optimizePackageImports
  poweredByHeader: false,
  compress: true,

  env: {
    BUILD_TIME: new Date().toISOString(),
  },

  // Next.js 16 默认 Turbopack，移除了旧的 webpack fs/net/tls fallback；
  // images.unoptimized=true 已规避对 node polyfill 的依赖。
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  ...(isGitHubPages
    ? { output: 'export', basePath: '', trailingSlash: true }
    : { output: 'standalone' }),

  staticPageGenerationTimeout: 180,

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
