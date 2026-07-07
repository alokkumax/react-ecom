// Header — Top navigation bar shown on every page

import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      {/* Logo / website name — click to go home */}
      <NavLink to="/" className="header-logo">
        ShoppyGlobe
      </NavLink>

      {/* Main navigation links */}
      <nav className="header-nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/cart" className="nav-link">
          Cart
        </NavLink>
      </nav>

      {/* Search box — not connected yet, just for looks */}
      <div className="header-search">
        <input type="text" placeholder="Search products..." />
      </div>

      {/* Cart icon — also links to cart page */}
      <NavLink to="/cart" className="header-cart">
        <span className="cart-icon">🛒</span>
      </NavLink>
    </header>
  )
}

export default Header
