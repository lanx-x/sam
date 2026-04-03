export function collectExtend(raw: { key: string, value: string }[] | null | undefined) {
  const payload = raw ? raw : []
  return Object.fromEntries(payload.map(xs => [xs.key, xs.value]))
}
