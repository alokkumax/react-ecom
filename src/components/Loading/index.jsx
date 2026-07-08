// Loading — Simple reusable loading message shown while data is fetching.

import PropTypes from 'prop-types'

function Loading({ message = 'Loading products...' }) {
  return <div className="loading">{message}</div>
}

// PropTypes: message is an optional string
Loading.propTypes = {
  message: PropTypes.string,
}

export default Loading
