import { formatPrice } from '@/utils/format'

export function CardPrice({ card }) {
  const p = card.pricing
  if (!p) return <span className="price-none">No price data</span>

  const usd = p.tcgplayer?.holofoil?.marketPrice ?? p.tcgplayer?.normal?.marketPrice ?? p.tcgplayer?.reverse?.marketPrice
  const eur = p.cardmarket?.trend ?? p.cardmarket?.avg

  return (
    <div className="card-prices">
      {usd != null && <span className="price usd">{formatPrice(usd, 'USD')}</span>}
      {eur != null && <span className="price eur">{formatPrice(eur, 'EUR')}</span>}
      {!usd && !eur && <span className="price-none">No price data</span>}
    </div>
  )
}
