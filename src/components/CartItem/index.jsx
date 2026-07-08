// CartItem — one row in the shopping cart.
// It shows a single product and lets the user change how many they want,
// or remove it from the cart completely.

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice'
import './CartItem.css'

function CartItem({ item }) {
  // useDispatch lets us send actions to the Redux store.
  const dispatch = useDispatch()

  // Remove this product and show a toast
  function handleRemove() {
    dispatch(removeFromCart(item.id))
    toast.info('Removed from cart')
  }

  return (
    <div className="cart-item">
      {/* Product image */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="cart-item-image"
        loading="lazy"
      />

      {/* Product info */}
      <div className="cart-item-info">
        <h3 className="cart-item-title">{item.title}</h3>
        {item.category && (
          <p className="cart-item-category">{item.category}</p>
        )}
        <span className="cart-item-each">≈${item.price.toFixed(2)} each</span>
      </div>

      {/* Quantity controls */}
      <div className="cart-item-controls">
        {/* Minus: lower the quantity by 1.
            The reducer already stops it from going below 1,
            but we also disable the button when quantity is 1. */}
        <button
          type="button"
          className="cart-item-btn"
          onClick={() => dispatch(decreaseQuantity(item.id))}
          disabled={item.quantity <= 1}
        >
          -
        </button>

        <span className="cart-item-quantity">{item.quantity}</span>

        {/* Plus: raise the quantity by 1 */}
        <button
          type="button"
          className="cart-item-btn"
          onClick={() => dispatch(increaseQuantity(item.id))}
        >
          +
        </button>
      </div>

      {/* Line total for this item (price × quantity) */}
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove: take this product out of the cart entirely */}
      <button
        type="button"
        className="cart-item-remove"
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  )
}

// PropTypes make sure the "item" prop has the shape we expect.
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    category: PropTypes.string,
  }).isRequired,
}

export default CartItem
