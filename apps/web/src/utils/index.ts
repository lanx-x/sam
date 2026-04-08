import { NavBasicItem } from "@/components/Nav";
import { CommonSection } from "cms-types"

export function collectExtend<T extends { key: string }>(...raw: T[]): Record<string, T> {
  const payload = raw?.flat() ?? []
  return Object.fromEntries(payload.filter(Boolean).map(xs => [xs.key, xs])) as Record<string, T>
}


export function mergeExtension(section: CommonSection): Record<string, { key: string; value: string }> {
  return collectExtend(section.payload?.extension as any, section.extension as any)
}


export function extractBlockText(blocks: any[]): string {
  if (!blocks?.length) return '';
  return blocks.map(block => block.children?.map((c: any) => c.text || '').join('') || '').join(' ');
}

export function getHref(item: Pick<NavBasicItem, 'target_type' | 'target_page' | 'target_anchor' | 'external_url'>) {
  if (item.target_type === 'external_url' && item.external_url) return item.external_url;
  const slug = item.target_page?.slug;

  if (!slug) return '';
  return `/${slug}/${item.target_anchor ?? ''}`.replaceAll(/\/\//g, '/')
}

export function withLang(lang: string, path: string): string {
  if (path.startsWith('http')) return path

  return `/${lang}/${path}`.replaceAll(/\/\/+/g, '/')
}
