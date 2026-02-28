import { useParams } from 'react-router-dom'

/**
 * Placeholder: single card detail page (e.g. /card/:id).
 */
export function CardDetail() {
  const { id } = useParams()
  return (
    <div className="app">
      <header className="header">
        <h1>Card Detail</h1>
      </header>
      <p className="tagline">Card ID: {id ?? '—'}</p>
      <p>Detail view coming soon.</p>
    </div>
  )
}
