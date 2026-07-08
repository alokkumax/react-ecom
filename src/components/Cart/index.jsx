// Cart page — two columns: the item list and an order summary panel.
// Totals are derived from Redux (subtotal) plus shipping/tax rules here.

import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/slices/cartSlice'
import CartItem from '../CartItem'
import './Cart.css'

// Order rules
const FREE_SHIPPING_THRESHOLD = 100 // spend this much for free shipping
const SHIPPING_FEE = 7.99
const TAX_RATE = 0.08 // 8%

function Cart() {
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartTotal)
  const navigate = useNavigate()

  // Empty state
  if (items.length === 0) {
    return (
      <div className="cart cart-empty">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="cart-shop-link">
          Continue shopping
        </Link>
      </div>
    )
  }

  // Work out shipping, tax, and the grand total
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shipping = hasFreeShipping ? 0 : SHIPPING_FEE
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax
  const remainingForFree = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <div className="cart">
      <div className="cart-layout">
        {/* Left: list of items */}
        <div className="cart-main">
          <h1>Your cart</h1>
          <div className="cart-list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right: order summary */}
        <aside className="cart-summary">
          <h2>Order summary</h2>

          <div
            className={`cart-shipping-note ${
              hasFreeShipping ? 'is-free' : ''
            }`}
          >
            {hasFreeShipping
              ? "You've unlocked free shipping!"
              : `Add $${remainingForFree.toFixed(2)} more for free shipping.`}
          </div>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="cart-summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="cart-checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to checkout
          </button>

          <Link to="/" className="cart-continue">
            ← Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}

export default Cart
