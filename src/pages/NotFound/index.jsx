// NotFound — shown for any URL that doesn't match a route (404).

import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="not-found-link">
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
