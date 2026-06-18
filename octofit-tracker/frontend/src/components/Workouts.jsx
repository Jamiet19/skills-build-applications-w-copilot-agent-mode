import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts')
        if (!ignore) {
          setWorkouts(data)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="status-message text-danger">Unable to load workouts: {error}</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-4" key={workout._id ?? workout.id ?? workout.title}>
            <article className="data-card h-100">
              <span className="badge text-bg-warning text-capitalize">{workout.difficulty}</span>
              <h2>{workout.title}</h2>
              <p>{workout.description}</p>
              <strong>{workout.durationMinutes} minutes</strong>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts