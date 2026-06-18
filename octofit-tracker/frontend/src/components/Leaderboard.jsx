import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function formatName(value) {
  if (!value) {
    return 'Unassigned'
  }

  return typeof value === 'string' ? value : value.name
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection(leaderboardEndpoint)
        if (!ignore) {
          setEntries(data)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load leaderboard: {error}</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Rankings</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry, index) => (
          <article className="leaderboard-row" key={entry._id ?? entry.id}>
            <span className="rank">#{index + 1}</span>
            <div>
              <h2>{formatName(entry.user)}</h2>
              <p>{formatName(entry.team)}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard