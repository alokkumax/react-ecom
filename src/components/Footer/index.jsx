// Footer — Simple site footer shown at the bottom of every page.

import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">ShoppyGlobe</span>
          <p className="footer-tagline">
            Handpicked products, honest prices, zero hassle.
          </p>
        </div>

        <nav className="footer-links">
          <Link to="/">Home</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© {year} ShoppyGlobe. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
