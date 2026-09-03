import { NODE_ENV } from "@/utils/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Point cacheHandler directly at Next.js's built-in FileSystemCache.
  // The path string itself doesn't matter — what matters is that
  // `cacheHandler` is set, which flips hasCustomCacheHandler=true in
  // IncrementalCache and bypasses the 2MB per-entry Data Cache limit
  // (see next/dist/server/lib/incremental-cache/index.js).
  // We use require.resolve to get an absolute path that survives Next.js
  // compiling next.config.ts into a different directory.
  cacheHandler: require.resolve(
    'next/dist/server/lib/incremental-cache/file-system-cache.js'
  ),
  // Bump in-memory cache budget from 50MB (default) to 500MB so large
  // getPage responses (which can exceed 2MB) have room to stay resident.
  cacheMaxMemorySize: 500 * 1024 * 1024,
  allowedDevOrigins: ['127.0.0.1', 'localhost', 'cms:1337', '10.0.0.5', '*.wukongshijue.com'],
  async headers() {
    return [
      {
        // Apply to all locale-prefixed pages (HTML + RSC payloads).
        // Browser caches 5 min, then SWR for 7 days. s-maxage is for
        // future CDN use (currently no-op without a shared cache layer).
        source: '/:locale/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=604800, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
  images: {
    dangerouslyAllowLocalIP: NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cms',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ]
  },
};

export default nextConfig;

