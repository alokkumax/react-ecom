// Checkout page — a simple order form plus a summary of the cart.
// This is a "dummy" page: the form doesn't actually submit anywhere yet.

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from '../../redux/slices/cartSlice'
import './Checkout.css'

function Checkout() {
  // Read the cart straight from Redux
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const dispatch = useDispatch()

  // Tracks whether the order has been placed (shows the success screen)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Runs when the user clicks "Place Order"
  function handlePlaceOrder() {
    setOrderPlaced(true) // show the "Order Placed" UI
    dispatch(clearCart()) // empty the cart
  }

  // ----- Success screen shown after the order is placed -----
  if (orderPlaced) {
    return (
      <div className="checkout">
        <div className="order-success">
          <div className="order-success-check">✓</div>
          <h1>Order Placed!</h1>
          <p>Thank you for your purchase. Your order is on its way.</p>
          <Link to="/" className="order-success-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      {/* ----- Dummy details form ----- */}
      <form className="checkout-form">
        <label className="checkout-label">
          Name
          <input type="text" placeholder="Your name" />
        </label>

        <label className="checkout-label">
          Email
          <input type="email" placeholder="you@example.com" />
        </label>

        <label className="checkout-label">
          Phone
          <input type="tel" placeholder="Your phone number" />
        </label>

        <label className="checkout-label">
          Address
          <textarea placeholder="Your delivery address" rows="3" />
        </label>
      </form>

      {/* ----- Order summary ----- */}
      <div className="checkout-summary">
        <h2>Order Summary</h2>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="checkout-summary-list">
            {items.map((item) => (
              <li key={item.id} className="checkout-summary-item">
                <span>
                  {item.title} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="checkout-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
      </div>

      {/* Place Order → show success UI + clear the cart */}
      <button
        type="button"
        className="checkout-place-order"
        onClick={handlePlaceOrder}
        disabled={items.length === 0}
      >
        Place Order
      </button>
    </div>
  )
}

export default Checkout
