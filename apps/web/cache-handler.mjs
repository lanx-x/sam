// Re-export Next.js built-in FileSystemCache.
//
// Why: setting `cacheHandler` in next.config.ts flips
// `hasCustomCacheHandler=true` in IncrementalCache, which bypasses
// the 2MB per-entry Data Cache size limit (see
// next/dist/server/lib/incremental-cache/index.js). We get the exact
// same storage behavior as the default (memory LRU + disk persistence,
// tag-based invalidation, stream handling) just without the size cap.
import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache.js'

export default FileSystemCache
