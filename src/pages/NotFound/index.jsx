// NotFound — shown for any URL that doesn't match a route (404).

import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h1>Oops!</h1>
      <p>The page you are trying to visit doesn&apos;t exist.</p>
      <Link to="/" className="not-found-link">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
