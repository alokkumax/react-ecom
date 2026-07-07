// ErrorMessage — Shown when an API request fails.
// Reusable on any page that fetches data.

function ErrorMessage() {
  return (
    <div className="error-message">
      <p>Something went wrong while fetching products.</p>
      <p>Please try again later.</p>
    </div>
  )
}

export default ErrorMessage
