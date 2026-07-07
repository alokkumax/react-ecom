// Checkout page — a simple order form plus a summary of the cart.
// This is a "dummy" page: the form doesn't actually submit anywhere yet.

import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/slices/cartSlice'
import './Checkout.css'

function Checkout() {
  // Read the cart straight from Redux
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

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

        <p className="checkout-total">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Place Order does nothing yet */}
      <button type="button" className="checkout-place-order">
        Place Order
      </button>
    </div>
  )
}

export default Checkout
