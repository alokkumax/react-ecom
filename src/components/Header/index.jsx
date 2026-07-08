// Header — Top navigation bar shown on every page

import { useState, useEffect, useRef } from 'react'
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

  // On mobile the search is hidden behind an icon until the user taps it
  const [searchOpen, setSearchOpen] = useState(false)
  const inputRef = useRef(null)

  // Focus the input as soon as the mobile search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  return (
    <header className={`header ${searchOpen ? 'header--search-open' : ''}`}>
      {/* Left cluster: logo + Home link */}
      <div className="header-left">
        <NavLink to="/" className="header-logo">
          ShoppyGlobe
        </NavLink>

        <nav className="header-nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </nav>
      </div>

      {/* Search box — filters on every keystroke.
          On mobile it stays hidden until "searchOpen" is true. */}
      <div className={`header-search ${searchOpen ? 'header-search--open' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        {/* Clear button — appears inside the input when there's text */}
        {searchTerm && (
          <button
            type="button"
            className="header-search-clear"
            onClick={() => dispatch(setSearchTerm(''))}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search icon — mobile only. Opens/closes the full-width search
          (which replaces the logo/Home/cart on that line). */}
      <button
        type="button"
        className="header-search-toggle"
        onClick={() => setSearchOpen((open) => !open)}
        aria-label={searchOpen ? 'Close search' : 'Open search'}
      >
        {searchOpen ? '✕' : '🔍'}
      </button>

      {/* Cart icon with live item count — also links to cart page */}
      <NavLink
        to="/cart"
        className="header-cart"
        aria-label={`View cart, ${cartCount} items`}
      >
        <span className="cart-icon" aria-hidden="true">
          🛒
        </span>
        <span className="cart-count">{cartCount}</span>
      </NavLink>
    </header>
  )
}

export default Header
