export function collectExtend(...raw: { key: string, value: string }[]) {
  const payload = raw?.flat() ?? []
  return Object.fromEntries(payload.filter(Boolean).map(xs => [xs.key, xs.value]))
}
