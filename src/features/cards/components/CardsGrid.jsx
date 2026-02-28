import { CardTile } from './CardTile'

export function CardsGrid({ cards, onPurchaseClick, purchaseCounts = {} }) {
  return (
    <section className="cards-grid">
      {cards.map((card, i) => {
        const count = purchaseCounts[card.id] ?? 0
        const isSoldOut = count >= 10

        return (
          <CardTile
            key={card.id}
            card={card}
            rank={i + 1}
            onPurchaseClick={onPurchaseClick}
            isSoldOut={isSoldOut}
          />
        )
      })}
    </section>
  )
}
