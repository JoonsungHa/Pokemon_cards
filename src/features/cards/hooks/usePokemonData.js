import { useState, useEffect } from 'react'
import { getTop10ByPrice } from '../services/tcgdex'

/**
 * Fetches the top 10 Pokémon cards by market price from TCGdex.
 * @returns {{ cards: array, loading: boolean, error: string | null }}
 */
export function usePokemonData() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getTop10ByPrice()
      .then((data) => {
        if (!cancelled) setCards(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  return { cards, loading, error }
}
