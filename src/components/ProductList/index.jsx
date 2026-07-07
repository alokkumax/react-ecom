// ProductList — Fetches and displays all products on the Home page.

import useProducts from '../../hooks/useProducts'
import ProductItem from '../ProductItem'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import './ProductList.css'

function ProductList() {
  // Get products, loading, and error from our custom hook
  const { products, loading, error } = useProducts()

  // Step 1: Show loading message while fetching
  if (loading) {
    return <Loading />
  }

  // Step 2: Show error message if fetch failed
  if (error) {
    return <ErrorMessage />
  }

  // Step 3: Loop through products and render a card for each one
  return (
    <div className="product-list">
      {products.map((product) => (
        // key must be unique — we use product.id from the API
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
