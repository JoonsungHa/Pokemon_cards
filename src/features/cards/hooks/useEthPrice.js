import { useState, useEffect } from 'react'
import { getEthPriceUsd } from '@/services/ethPrice'

/**
 * Fetches the current ETH/USD price (e.g. for converting card prices).
 * @returns {{ ethUsd: number | null, loading: boolean, error: string | null }}
 */
export function useEthPrice() {
  const [ethUsd, setEthUsd] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getEthPriceUsd()
      .then((price) => {
        if (!cancelled) setEthUsd(price)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  return { ethUsd, loading, error }
}
