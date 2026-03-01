import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { usePokemonData } from '@/features/cards/hooks/usePokemonData'
import { useEthPrice } from '@/features/cards/hooks/useEthPrice'
import { CardsGrid } from '@/features/cards/components/CardsGrid'
import { Loader } from '@/components/Loader'

export function Home() {
  const { cards, loading, error } = usePokemonData()
  const { ethUsd } = useEthPrice()
  const [purchaseCounts, setPurchaseCounts] = useState({})

  // Tracks how many times each specific card has been "purchased".
  // When a card reaches 10 clicks, it becomes sold out and can no longer be clicked.
  const handlePurchaseClick = (card) => {
    setPurchaseCounts((prev) => {
      const current = prev[card.id] ?? 0
      const next = current + 1
      console.log('Number of', card.name, "sold so far are", next)
      return { ...prev, [card.id]: next }
    })
  }

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
        <div className="header-top">
          <h1>Pokémon TCG Prices</h1>
          <ConnectButton />
        </div>
        <p className="tagline">
          Top 10 most expensive cards · Data from{' '}
          <a href="https://tcgdex.dev/markets-prices" target="_blank" rel="noopener noreferrer">TCGdex</a> (Cardmarket & TCGplayer)
        </p>
      </header>

      <CardsGrid
        cards={cards}
        onPurchaseClick={handlePurchaseClick}
        purchaseCounts={purchaseCounts}
        ethUsd={ethUsd}
      />

      <footer className="footer">
        <p>Prices update hourly (TCGplayer) to daily (Cardmarket). Built for future NFT card listings.</p>
      </footer>
    </div>
  )
}
