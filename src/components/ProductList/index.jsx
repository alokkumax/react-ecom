// ProductList — Fetches and displays all products on the Home page.

import { useSelector } from 'react-redux'
import useProducts from '../../hooks/useProducts'
import { selectSearchTerm } from '../../redux/slices/searchSlice'
import ProductItem from '../ProductItem'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import './ProductList.css'

function ProductList() {
  // Get products, loading, and error from our custom hook
  const { products, loading, error } = useProducts()

  // Get whatever the user typed in the search box (from Redux)
  const searchTerm = useSelector(selectSearchTerm)

  // Step 1: Show loading message while fetching
  if (loading) {
    return <Loading />
  }

  // Step 2: Show error message if fetch failed
  if (error) {
    return <ErrorMessage />
  }

  // Step 3: Filter products by the search term.
  // We compare everything in lowercase so case doesn't matter,
  // and we search across title, brand, and category.
  const term = searchTerm.toLowerCase()
  const filteredProducts = products.filter((product) => {
    const title = (product.title || '').toLowerCase()
    const brand = (product.brand || '').toLowerCase()
    const category = (product.category || '').toLowerCase()
    return (
      title.includes(term) ||
      brand.includes(term) ||
      category.includes(term)
    )
  })

  // Step 4: Loop through the filtered products and render a card for each
  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        // key must be unique — we use product.id from the API
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
