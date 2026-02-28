import { useState, useEffect } from 'react'
import { getTop10ByPrice } from './api/tcgdex'
import './App.css'

// TCGdex image URLs need /high.webp (or /low.webp) — the API returns the base path only.
// In dev we use a proxy so the CDN doesn't block hotlinking.
function cardImageUrl(url) {
  if (!url) return ''
  const base = 'https://assets.tcgdex.net'
  const path = url.startsWith(base) ? url.slice(base.length) : url
  const withFormat = path.includes('.') ? path : path.replace(/\/?$/, '/high.webp')
  if (import.meta.env.DEV && url.startsWith(base))
    return '/tcgdex-assets' + withFormat
  return url.startsWith(base) ? base + withFormat : url
}

function formatPrice(value, unit = 'USD') {
  if (value == null) return '—'
  const sym = unit === 'EUR' ? '€' : '$'
  return `${sym}${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function CardPrice({ card }) {
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

function App() {
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

  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1>Pokémon TCG Prices</h1>
          <p className="tagline">Top 10 most expensive cards (market data via TCGdex)</p>
        </header>
        <div className="loading">
          <div className="loader" />
          <p>Loading top cards…</p>
        </div>
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

      <section className="cards-grid">
        {cards.map((card, i) => (
          <article key={card.id} className="card-tile">
            <span className="rank">#{i + 1}</span>
            <div className="card-image-wrap">
              <img src={cardImageUrl(card.image)} alt={card.name} className="card-image" loading="lazy" />
            </div>
            <div className="card-info">
              <h2 className="card-name">{card.name}</h2>
              <p className="card-set">{card.set?.name ?? '—'}</p>
              <CardPrice card={card} />
            </div>
          </article>
        ))}
      </section>

      <footer className="footer">
        <p>Prices update hourly (TCGplayer) to daily (Cardmarket). Built for future NFT card listings.</p>
      </footer>
    </div>
  )
}

export default App
