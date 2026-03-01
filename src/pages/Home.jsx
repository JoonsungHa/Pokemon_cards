import { useState, useRef, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'
import { usePokemonData } from '@/features/cards/hooks/usePokemonData'
import { useEthPrice } from '@/features/cards/hooks/useEthPrice'
import { usePurchaseCard } from '@/features/wallet/hooks/usePurchaseCard'
import { CardsGrid } from '@/features/cards/components/CardsGrid'
import { Loader } from '@/components/Loader'
import { POKEMON_SHOP_ADDRESS } from '@/config/contracts'

export function Home() {
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const { queryKey: balanceQueryKey } = useBalance({ address: address ?? undefined })
  const { cards, loading, error } = usePokemonData()
  const { ethUsd } = useEthPrice()
  const { purchaseCard, isPending, isSuccess, isError, error: txError, reset } = usePurchaseCard()
  const [purchaseCounts, setPurchaseCounts] = useState({})
  const purchaseCardIdRef = useRef(null)

  const handlePurchaseClick = (card, ethPrice) => {
    if (!POKEMON_SHOP_ADDRESS) {
      console.error('Deploy contracts/PokemonCardShop.sol and set VITE_POKEMON_SHOP_CONTRACT_ADDRESS in .env')
      return
    }
    purchaseCardIdRef.current = card.id
    purchaseCard(card.id, ethPrice)
  }

  useEffect(() => {
    if (isSuccess && purchaseCardIdRef.current) {
      const cardId = purchaseCardIdRef.current
      setPurchaseCounts((prev) => {
        const current = prev[cardId] ?? 0
        return { ...prev, [cardId]: current + 1 }
      })
      purchaseCardIdRef.current = null
      if (balanceQueryKey) {
        queryClient.invalidateQueries({ queryKey: balanceQueryKey })
      }
      reset()
    }
  }, [isSuccess, reset, queryClient, balanceQueryKey])

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

      {!POKEMON_SHOP_ADDRESS && (
        <p className="error" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Set VITE_POKEMON_SHOP_CONTRACT_ADDRESS in .env (deploy contracts/PokemonCardShop.sol first).
        </p>
      )}
      {isError && txError && (
        <p className="error" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Transaction failed: {txError.message}
        </p>
      )}

      <CardsGrid
        cards={cards}
        onPurchaseClick={handlePurchaseClick}
        purchaseCounts={purchaseCounts}
        ethUsd={ethUsd}
        isPurchasePending={isPending}
      />

      <footer className="footer">
        <p>Prices update hourly (TCGplayer) to daily (Cardmarket). Built for future NFT card listings.</p>
      </footer>
    </div>
  )
}
