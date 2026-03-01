import { cardImageUrl } from '@/utils/cardImageUrl'
import { CardPrice } from './CardPrice'

function getCardPriceUsd(card) {
  const p = card.pricing
  if (!p) return null
  return p.tcgplayer?.holofoil?.marketPrice ?? p.tcgplayer?.normal?.marketPrice ?? p.tcgplayer?.reverse?.marketPrice ?? null
}

function formatEth(ethAmount) {
  if (ethAmount == null || Number.isNaN(ethAmount)) return null
  const str = ethAmount.toFixed(6)
  return parseFloat(str).toString()
}

export function CardTile({ card, rank, onPurchaseClick, isSoldOut, ethUsd }) {
  const handleClick = () => {
    if (!isSoldOut) {
      onPurchaseClick(card)
    }
  }

  const usd = getCardPriceUsd(card)
  const ethPrice = (ethUsd != null && usd != null && ethUsd > 0) ? usd / ethUsd : null
  const ethDisplay = ethPrice != null ? formatEth(ethPrice) : null

  return (
    <article className="card-tile">
      <span className="rank">#{rank}</span>
      <div className="card-image-wrap">
        <img src={cardImageUrl(card.image)} alt={card.name} className="card-image" loading="lazy" />
      </div>
      <div className="card-info">
        <h2 className="card-name">{card.name}</h2>
        <p className="card-set">{card.set?.name ?? '—'}</p>
        <CardPrice card={card} />
        <p className="card-price-eth">{ethDisplay != null ? `${ethDisplay} ETH` : '— ETH'}</p>
        <button
          type="button"
          className={`card-purchase-btn${isSoldOut ? ' card-purchase-btn--sold-out' : ''}`}
          onClick={handleClick}
          disabled={isSoldOut}
        >
          {isSoldOut ? 'Sold out' : `Purchase · ${ethDisplay != null ? `${ethDisplay} ETH` : '—'}`}
        </button>
      </div>
    </article>
  )
}
