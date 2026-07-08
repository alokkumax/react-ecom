// ErrorMessage — Shown when an API request fails.
// Reusable on any page that fetches data.

import PropTypes from 'prop-types'

function ErrorMessage({ message = 'Something went wrong while fetching products.' }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      <p>Please try again later.</p>
    </div>
  )
}

// PropTypes: message is an optional string
ErrorMessage.propTypes = {
  message: PropTypes.string,
}

export default ErrorMessage
