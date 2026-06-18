import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const teamsEndpoint = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      try {
        const data = await fetchCollection(teamsEndpoint)
        if (!ignore) {
          setTeams(data)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadTeams()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load teams: {error}</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-lg-6" key={team._id ?? team.id ?? team.name}>
            <article className="data-card h-100">
              <h2>{team.name}</h2>
              <p>{team.mascot}</p>
              <div className="member-list">
                {(team.members ?? []).map((member) => (
                  <span className="badge text-bg-light" key={member._id ?? member.id ?? member.email ?? member}>
                    {typeof member === 'string' ? member : member.name}
                  </span>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams