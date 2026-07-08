// ProductList — Fetches and displays products on the Home page.
// Includes a catalog toolbar (category filter + sort) and infinite scroll.

import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useProducts from '../../hooks/useProducts'
import { selectSearchTerm, setSearchTerm } from '../../redux/slices/searchSlice'
import ProductItem from '../ProductItem'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import './ProductList.css'

function ProductList() {
  const { products, loading, loadingMore, error, loadMore, hasMore, total } =
    useProducts()

  // Get whatever the user typed in the search box (from Redux)
  const searchTerm = useSelector(selectSearchTerm)
  const dispatch = useDispatch()

  // Toolbar controls
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('all') // selected category filter
  const [sortBy, setSortBy] = useState('featured') // selected sort order

  // The "sentinel" is an empty div at the bottom of the list.
  // When it scrolls into view, we know the user reached the end.
  const sentinelRef = useRef(null)

  // Infinite scroll only runs for the default view (no search/filter/sort).
  // The sentinel is only rendered in this view, so the observer effect below
  // depends on it to re-attach whenever we return to the default view.
  const isDefaultView =
    searchTerm.trim() === '' && category === 'all' && sortBy === 'featured'

  // Load the list of categories once (for the dropdown)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          'https://dummyjson.com/products/category-list',
        )
        if (!response.ok) return
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.error('Error fetching categories:', err.message)
      }
    }
    fetchCategories()
  }, [])

  // Watch the sentinel and load more products when it becomes visible.
  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      // Start loading a bit before the sentinel is fully visible
      { rootMargin: '250px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [loadMore, isDefaultView, hasMore])

  // Step 1: Show loading message while fetching the first page
  if (loading) {
    return <Loading />
  }

  // Step 2: Show error message if fetch failed
  if (error) {
    return <ErrorMessage />
  }

  // Step 3: Filter by search term (title / brand / category)
  const term = searchTerm.toLowerCase()
  let result = products.filter((product) => {
    const title = (product.title || '').toLowerCase()
    const brand = (product.brand || '').toLowerCase()
    const cat = (product.category || '').toLowerCase()
    return title.includes(term) || brand.includes(term) || cat.includes(term)
  })

  // Step 4: Filter by the selected category
  if (category !== 'all') {
    result = result.filter((product) => product.category === category)
  }

  // Step 5: Sort the products
  if (sortBy === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'name') {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title))
  }

  // Turns "home-decoration" into "Home Decoration" for display
  const prettyCategory = (slug) =>
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  // Clear the search, category, and sort back to defaults
  function handleReset() {
    dispatch(setSearchTerm(''))
    setCategory('all')
    setSortBy('featured')
  }

  return (
    <section aria-label="Product catalog">
      {/* ----- Catalog toolbar ----- */}
      <div className="catalog-toolbar">
        <div className="catalog-heading">
          <h2>Browse the catalog</h2>
          <p className="catalog-count">
            {result.length} of {total} products
            {searchTerm.trim() !== '' && ` matching “${searchTerm}”`}
          </p>
        </div>

        <div className="catalog-controls">
          <label className="catalog-field">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((slug) => (
                <option key={slug} value={slug}>
                  {prettyCategory(slug)}
                </option>
              ))}
            </select>
          </label>

          <label className="catalog-field">
            Sort by
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
      </div>

      {/* ----- Product grid ----- */}
      {result.length === 0 ? (
        <div className="catalog-empty">
          <div className="catalog-empty-icon">🔍</div>
          <h2>No products found.</h2>
          <p>Try a different search term or clear the category filter.</p>
          <button
            type="button"
            className="catalog-empty-btn"
            onClick={handleReset}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="product-list">
          {result.map((product) => (
            // key must be unique — we use product.id from the API
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Infinite scroll trigger + "loading more" hint */}
      {isDefaultView && hasMore && (
        <div ref={sentinelRef} className="product-list-more">
          {loadingMore && <span>Loading more products...</span>}
        </div>
      )}
    </section>
  )
}

export default ProductList
