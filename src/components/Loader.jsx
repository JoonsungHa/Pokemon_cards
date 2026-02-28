export function Loader({ message = 'Loading…' }) {
  return (
    <div className="loading">
      <div className="loader" />
      <p>{message}</p>
    </div>
  )
}
