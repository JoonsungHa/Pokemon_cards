/**
 * Format a numeric price with currency symbol.
 */
export function formatPrice(value, unit = 'USD') {
  if (value == null) return '—'
  const sym = unit === 'EUR' ? '€' : '$'
  return `${sym}${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * Format an Ethereum/wallet address for display (e.g. 0x1234...5678).
 */
export function formatAddress(address, chars = 6) {
  if (!address || typeof address !== 'string') return ''
  if (address.length <= chars * 2) return address
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Format a date for display.
 */
export function formatDate(value) {
  if (value == null) return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}
