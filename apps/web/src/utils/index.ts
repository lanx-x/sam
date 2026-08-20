import { NavBasicItem } from "@/components/Nav";
import { CommonSection } from "cms-types"

export function collectExtend<T extends { key: string }>(...raw: T[]): Record<string, T> {
  const payload = raw?.flat() ?? []
  return Object.fromEntries(payload.filter(Boolean).map(xs => [xs.key, xs])) as Record<string, T>
}


export function mergeExtension(section: CommonSection): Record<string, { key: string; value: string }> {
  return collectExtend(section.payload?.extension as any, section.extension as any)
}



export function mergeDisplayText(section: CommonSection): { [key: string]: string } {
  return section?.payload?.display_text?.filter(xs => xs.key && xs.value)?.reduce((acc, cur) => ({ ...acc, [cur.key!]: cur.value }), {}) ?? {}
}

export function extractBlockText(blocks: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return '';

  return blocks
    .map((block) => {
      const children = typeof block === 'object' && block !== null ? (block as { children?: unknown }).children : undefined;

      if (!Array.isArray(children)) {
        return '';
      }

      return children
        .map((child) =>
          typeof child === 'object' && child !== null && 'text' in child && typeof child.text === 'string'
            ? child.text
            : '',
        )
        .join('');
    })
    .join(' ');
}

export function getHref(item: Pick<NavBasicItem, 'target_type' | 'target_page' | 'target_anchor' | 'external_url'>) {
  if (item.target_type === 'external_url' && item.external_url) return item.external_url;
  const slug = item.target_page?.slug;

  if (!slug) return '';
  return `/${slug}/${item.target_anchor ?? ''}`.replaceAll(/\/\//g, '/').replace(/\/$/, '')
}

export function withLocalePath(locale: string, path: string): string {
  if (path.startsWith('http')) return path

  return `/${locale}/${path}`.replaceAll(/\/\/+/g, '/').replace(/\/$/, '')
}
