// ProductItem — One product card in the grid.
// Receives a single "product" object as a prop from ProductList.

import PropTypes from 'prop-types'
import './ProductItem.css'

function ProductItem({ product }) {
  return (
    <div className="product-item">
      {/* Product image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-item-image"
      />

      {/* Product info */}
      <div className="product-item-body">
        <h3 className="product-item-title">{product.title}</h3>
        <p className="product-item-price">${product.price}</p>
        <p className="product-item-rating">⭐ {product.rating}</p>

        {/* Button does nothing yet — Redux comes in a later step */}
        <button type="button" className="product-item-btn">
          Add to Cart
        </button>
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
  }).isRequired,
}

export default ProductItem
