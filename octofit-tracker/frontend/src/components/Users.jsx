import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        const data = await fetchCollection(usersEndpoint)
        if (!ignore) {
          setUsers(data)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load users: {error}</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id ?? user.id ?? user.email}>
            <article className="data-card h-100">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <span className="badge text-bg-success">{user.role ?? 'student'}</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users