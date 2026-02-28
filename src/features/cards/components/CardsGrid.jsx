import { CardTile } from './CardTile'

export function CardsGrid({ cards, onPurchaseClick }) {
  return (
    <section className="cards-grid">
      {cards.map((card, i) => (
        <CardTile
          key={card.id}
          card={card}
          rank={i + 1}
          onPurchaseClick={onPurchaseClick}
        />
      ))}
    </section>
  )
}
