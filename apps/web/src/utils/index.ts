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

