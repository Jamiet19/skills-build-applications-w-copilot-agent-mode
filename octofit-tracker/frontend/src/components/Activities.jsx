import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function formatUser(user) {
  if (!user) {
    return 'Unassigned user'
  }

  return typeof user === 'string' ? user : user.name
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      try {
        const data = await fetchCollection(activitiesEndpoint)
        if (!ignore) {
          setActivities(data)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load activities: {error}</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Movement Log</p>
        <h1>Activities</h1>
      </div>
      <div className="table-responsive data-table-wrap">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Activity</th>
              <th>User</th>
              <th>Duration</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? activity.id}>
                <td>{activity.type}</td>
                <td>{formatUser(activity.user)}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities