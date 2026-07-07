// ProductDetail — Shows full info for one product.
// The :id in the URL (/product/5) tells us which product to fetch.

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import './ProductDetail.css'

function ProductDetail() {
  // useParams reads the id from the URL (e.g. /product/1 → id is "1")
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    <div className="product-detail">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-detail-image"
      />

      <div className="product-detail-info">
        <h1>{product.title}</h1>
        <p className="product-detail-price">${product.price}</p>
        <p className="product-detail-rating">⭐ {product.rating} rating</p>
        <p className="product-detail-description">{product.description}</p>

        <ul className="product-detail-meta">
          <li>
            <strong>Brand:</strong> {product.brand}
          </li>
          <li>
            <strong>Category:</strong> {product.category}
          </li>
          <li>
            <strong>Stock:</strong> {product.stock} left
          </li>
        </ul>

        <button type="button" className="product-detail-btn">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
