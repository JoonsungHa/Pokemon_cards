import { usePokemonData } from '@/features/cards/hooks/usePokemonData'
import { CardsGrid } from '@/features/cards/components/CardsGrid'
import { Loader } from '@/components/Loader'

// TODO: implement purchase flow (e.g. checkout, NFT mint, etc.)
function handlePurchaseClick(card) {
  console.log('Purchase clicked for:', card.id, card.name)
}

export function Home() {
  const { cards, loading, error } = usePokemonData()

  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1>Pokémon TCG Prices</h1>
          <p className="tagline">Top 10 most expensive cards (market data via TCGdex)</p>
        </header>
        <Loader message="Loading top cards…" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <header className="header">
          <h1>Pokémon TCG Prices</h1>
        </header>
        <div className="error">
          <p>Could not load cards: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Pokémon TCG Prices</h1>
        <p className="tagline">
          Top 10 most expensive cards · Data from{' '}
          <a href="https://tcgdex.dev/markets-prices" target="_blank" rel="noopener noreferrer">TCGdex</a> (Cardmarket & TCGplayer)
        </p>
      </header>

      <CardsGrid cards={cards} onPurchaseClick={handlePurchaseClick} />

      <footer className="footer">
        <p>Prices update hourly (TCGplayer) to daily (Cardmarket). Built for future NFT card listings.</p>
      </footer>
    </div>
  )
}
