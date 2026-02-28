/**
 * TCGdex image URLs need /high.webp (or /low.webp) — the API returns the base path only.
 * In dev we use a proxy so the CDN doesn't block hotlinking.
 */
export function cardImageUrl(url) {
  if (!url) return ''
  const base = 'https://assets.tcgdex.net'
  const path = url.startsWith(base) ? url.slice(base.length) : url
  const withFormat = path.includes('.') ? path : path.replace(/\/?$/, '/high.webp')
  if (import.meta.env.DEV && url.startsWith(base))
    return '/tcgdex-assets' + withFormat
  return url.startsWith(base) ? base + withFormat : url
}
