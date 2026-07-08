// Checkout page — a details form plus an order summary.
// The form is validated locally: an order can't be placed until every
// field is filled in. Nothing is sent to a real server (dummy checkout).

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from '../../redux/slices/cartSlice'
import { getOrderSummary } from '../../utils/orderSummary'
import './Checkout.css'

function Checkout() {
  // Read the cart straight from Redux
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartTotal)

  // Shared order math (shipping, tax, total) — same rules as the Cart page
  const { shipping, tax, total } = getOrderSummary(subtotal)

  const dispatch = useDispatch()

  // Form values and any validation errors
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Update a single field as the user types
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Check every field is filled + a basic email check.
  // Returns an object of error messages (empty means the form is valid).
  function validate() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!form.email.includes('@')) {
      nextErrors.email = 'Please enter a valid email.'
    }
    if (!form.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    if (!form.address.trim()) nextErrors.address = 'Please enter your address.'
    return nextErrors
  }

  // Runs when the form is submitted (Place Order clicked)
  function handleSubmit(e) {
    e.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    // Stop here if there are any errors — no order is placed
    if (Object.keys(nextErrors).length > 0) return

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

      {/* ----- Details form (all fields required) ----- */}
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="checkout-label">
          <label htmlFor="checkout-name">Name</label>
          <input
            id="checkout-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="checkout-error">{errors.name}</span>}
        </div>

        <div className="checkout-label">
          <label htmlFor="checkout-email">Email</label>
          <input
            id="checkout-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="checkout-error">{errors.email}</span>
          )}
        </div>

        <div className="checkout-label">
          <label htmlFor="checkout-phone">Phone</label>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            placeholder="Your phone number"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className="checkout-error">{errors.phone}</span>
          )}
        </div>

        <div className="checkout-label">
          <label htmlFor="checkout-address">Address</label>
          <textarea
            id="checkout-address"
            name="address"
            placeholder="Your delivery address"
            rows="3"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span className="checkout-error">{errors.address}</span>
          )}
        </div>

        {/* ----- Order summary ----- */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
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

              {/* Subtotal / shipping / tax breakdown (matches the Cart page) */}
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="checkout-summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </>
          )}

          <p className="checkout-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </p>
        </div>

        {/* Place Order → validate, then show success + clear the cart */}
        <button
          type="submit"
          className="checkout-place-order"
          disabled={items.length === 0}
        >
          Place Order
        </button>
      </form>
    </div>
  )
}

export default Checkout
