// Checkout page — a simple order form plus a summary of the cart.
// This is a "dummy" page: the form doesn't actually submit anywhere yet.

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate() // lets us send the user to another page

  // Runs when the user clicks "Place Order"
  function handlePlaceOrder() {
    alert('Order placed') // simple confirmation popup
    dispatch(clearCart()) // empty the cart
    navigate('/') // go back to the Home page
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

        <p className="checkout-total">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Place Order → alert, clear cart, then redirect home */}
      <button
        type="button"
        className="checkout-place-order"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  )
}

export default Checkout
