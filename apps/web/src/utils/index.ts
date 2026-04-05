import { CommonSection } from "cms-types"

export function collectExtend(...raw: { key: string, value: string }[]) {
  const payload = raw?.flat() ?? []
  return Object.fromEntries(payload.filter(Boolean).map(xs => [xs.key, xs.value]))
}


export function mergeExtension(section: CommonSection) {
  return collectExtend(section.payload?.extension as any, section.extension as any)
}


export function extractBlockText(blocks: any[]): string {
  if (!blocks?.length) return '';
  return blocks.map(block => block.children?.map((c: any) => c.text || '').join('') || '').join(' ');
}

