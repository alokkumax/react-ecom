// Header — Top navigation bar shown on every page

import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, selectSearchTerm } from '../../redux/slices/searchSlice'
import { selectCartCount } from '../../redux/slices/cartSlice'
import './Header.css'

function Header() {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)

  // Live count of items in the cart (updates automatically via Redux)
  const cartCount = useSelector(selectCartCount)

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

      {/* Search box — saves what the user types into Redux */}
      <div className="header-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {/* Cart icon with live item count — also links to cart page */}
      <NavLink to="/cart" className="header-cart">
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cartCount}</span>
      </NavLink>
    </header>
  )
}

export default Header
