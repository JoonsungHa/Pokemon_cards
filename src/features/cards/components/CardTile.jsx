import { cardImageUrl } from '@/utils/cardImageUrl'
import { CardPrice } from './CardPrice'

export function CardTile({ card, rank, onPurchaseClick }) {
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
        <button
          type="button"
          className="card-purchase-btn"
          onClick={() => onPurchaseClick(card)}
        >
          Purchase
        </button>
      </div>
    </article>
  )
}
