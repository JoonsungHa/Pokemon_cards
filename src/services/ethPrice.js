const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'

/**
 * Fetches the current Ethereum price in USD from CoinGecko.
 * No API key required (rate-limited on free tier).
 * @returns {Promise<number>} ETH price in USD
 */
export async function getEthPriceUsd() {
  const res = await fetch(COINGECKO_URL)
  if (!res.ok) throw new Error('Failed to fetch ETH price')
  const data = await res.json()
  const price = data?.ethereum?.usd
  if (typeof price !== 'number') throw new Error('Invalid ETH price response')
  return price
}
