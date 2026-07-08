// ProductItem — One product card in the grid.
// Receives a single "product" object as a prop from ProductList.

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
} from '../../redux/slices/cartSlice'
import './ProductItem.css'

function ProductItem({ product }) {
  const dispatch = useDispatch()

  // Find this product in the cart (if it's there) to read its quantity
  const cartItem = useSelector((state) =>
    selectCartItems(state).find((item) => item.id === product.id),
  )
  const quantity = cartItem ? cartItem.quantity : 0

  // Add a brand-new item to the cart + show a toast
  function handleAdd() {
    dispatch(addToCart(product))
    toast.success('Added to cart')
  }

  // Minus: drop quantity by 1, or remove the item entirely when it hits 0
  function handleDecrease() {
    if (quantity <= 1) {
      dispatch(removeFromCart(product.id))
      toast.info('Removed from cart')
    } else {
      dispatch(decreaseQuantity(product.id))
    }
  }

  return (
    <div className="product-item">
      {/* Image + title link to the single product page */}
      <Link to={`/product/${product.id}`} className="product-item-link">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-item-image"
          loading="lazy"
        />
      </Link>

      {/* Product info */}
      <div className="product-item-body">
        {product.category && (
          <span className="product-item-category">{product.category}</span>
        )}
        <Link to={`/product/${product.id}`} className="product-item-title-link">
          <h3 className="product-item-title">{product.title}</h3>
        </Link>
        <p className="product-item-price">${product.price}</p>
        <p className="product-item-rating">⭐ {product.rating}</p>

        {/* Before adding: show the button.
            After adding: show a quantity stepper. */}
        {quantity === 0 ? (
          <button
            type="button"
            className="product-item-btn"
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        ) : (
          <div className="product-item-stepper">
            <button
              type="button"
              className="product-item-step-btn"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="product-item-step-qty">{quantity}</span>
            <button
              type="button"
              className="product-item-step-btn"
              onClick={() => dispatch(increaseQuantity(product.id))}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// PropTypes check that the right data is passed in (helps catch bugs)
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
}

export default ProductItem
