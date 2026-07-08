// ProductDetail — Shows full info for one product.
// The :id in the URL (/product/5) tells us which product to fetch.

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
} from '../../redux/slices/cartSlice'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import ProductItem from '../../components/ProductItem'
import './ProductDetail.css'

function ProductDetail() {
  // useParams reads the id from the URL (e.g. /product/1 → id is "1")
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Products from the same category (shown as "related products")
  const [related, setRelated] = useState([])

  const dispatch = useDispatch()

  // Look up this product in the cart to know its current quantity
  const cartItem = useSelector((state) =>
    selectCartItems(state).find((item) => item.id === product?.id),
  )
  const quantity = cartItem ? cartItem.quantity : 0

  // Add the product to the cart + toast
  function handleAdd() {
    dispatch(addToCart(product))
    toast.success('Added to cart')
  }

  // Minus: lower quantity, or remove entirely when it reaches 0
  function handleDecrease() {
    if (quantity <= 1) {
      dispatch(removeFromCart(product.id))
      toast.info('Removed from cart')
    } else {
      dispatch(decreaseQuantity(product.id))
    }
  }

  // Fetch product whenever the id in the URL changes
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `https://dummyjson.com/products/${id}`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id]) // re-run when id changes

  // Once we know the product, fetch other products in the same category
  useEffect(() => {
    if (!product) return

    async function fetchRelated() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${product.category}`,
        )
        if (!response.ok) return

        const data = await response.json()
        // Drop the current product and keep up to 4 others
        const others = data.products
          .filter((item) => item.id !== product.id)
          .slice(0, 4)
        setRelated(others)
      } catch (err) {
        console.error('Error fetching related products:', err.message)
      }
    }

    fetchRelated()
  }, [product])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage />
  }

  if (!product) {
    return null
  }

  return (
    <>
      <div className="product-detail">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-detail-image"
        loading="lazy"
      />

      <div className="product-detail-info">
        <h1>{product.title}</h1>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-rating">⭐ {product.rating} rating</p>
        <p className="product-detail-description">{product.description}</p>

        <ul className="product-detail-meta">
          <li>
            <strong>Brand:</strong> {product.brand || '—'}
          </li>
          <li>
            <strong>Category:</strong> {product.category}
          </li>
          <li>
            <strong>Stock:</strong> {product.stock} left
          </li>
        </ul>

        {/* Add to Cart turns into a quantity stepper once in the cart */}
        {quantity === 0 ? (
          <button
            type="button"
            className="product-detail-btn"
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        ) : (
          <div className="product-detail-stepper">
            <button
              type="button"
              className="product-detail-step-btn"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="product-detail-step-qty">{quantity}</span>
            <button
              type="button"
              className="product-detail-step-btn"
              onClick={() => dispatch(increaseQuantity(product.id))}
            >
              +
            </button>
          </div>
        )}
      </div>
      </div>

      {/* Related products from the same category */}
      {related.length > 0 && (
        <section className="related">
          <h2 className="related-title">Related Products</h2>
          <div className="related-grid">
            {related.map((item) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetail
