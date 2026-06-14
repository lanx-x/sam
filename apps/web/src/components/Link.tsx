import type { AnchorHTMLAttributes } from 'react'

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  children?: React.ReactNode
  // next/link compatibility — accepted but ignored.
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  locale?: string
  shallow?: boolean
  passHref?: boolean
}

// Native <a> wrapper used in place of next/link's <Link>.
//
// Why: next/link does client-side navigation, which on every nav sends a
// request with a `_rsc=<hash>` query param. The hash encodes the current
// router state (next-router-state-tree etc.), so the same destination URL
// reached from different source pages has a different `_rsc` value. That
// defeats browser HTTP caching — each navigation is a unique URL, never
// reusing the previous response even with Cache-Control: max-age.
//
// By using a plain <a> we trigger a full-page navigation:
//   - URL has no `_rsc`, so the browser cache hits on repeat visits
//   - Cache-Control headers actually take effect
//   - Trade-off: lose SPA-style smooth transitions (no RSC payload, full HTML)
//
// To revert to SPA navigation, change the import in the consuming file
// from '@/components/Link' back to 'next/link'. The API is compatible.
export function Link({ children, ...props }: LinkProps) {
  return <a {...props}>{children}</a>
}

export default Link
