// Cart page — shows everything currently in the shopping cart.
// Reads state straight from Redux using selectors (no manual totals).

import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/slices/cartSlice'
import CartItem from '../CartItem'

function Cart() {
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartTotal)

  // Empty state
  if (items.length === 0) {
    return (
      <div className="cart">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      <div className="cart-list">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <p className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</p>

      <button type="button" className="cart-checkout-btn">
        Checkout
      </button>
    </div>
  )
}

export default Cart
