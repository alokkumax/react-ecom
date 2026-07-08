// useProducts.js — Custom hook to fetch products from an API.
// It loads products in "pages" so we can keep loading more as the user scrolls.

import { useState, useEffect, useRef, useCallback } from 'react'

// How many products to fetch at a time
const PAGE_SIZE = 20

function useProducts() {
  const [products, setProducts] = useState([]) // all products loaded so far
  const [loading, setLoading] = useState(true) // true during the very first load
  const [loadingMore, setLoadingMore] = useState(false) // true while loading extra pages
  const [error, setError] = useState(null) // error message if a fetch fails
  const [total, setTotal] = useState(0) // total number of products available

  // A ref lets us block overlapping fetches without causing re-renders.
  const fetchingRef = useRef(false)

  // Fetch one page of products starting at "skip".
  const fetchProducts = useCallback(async (skip) => {
    // Don't start a new fetch if one is already running
    if (fetchingRef.current) return
    fetchingRef.current = true

    try {
      // First page shows the big loader; later pages show a small one
      if (skip === 0) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }
      setError(null)

      const response = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()

      setTotal(data.total)
      // First page replaces the list; later pages get added on the end
      setProducts((prev) =>
        skip === 0 ? data.products : [...prev, ...data.products],
      )
    } catch (err) {
      setError(err.message)
      console.error('Error fetching products:', err.message)
    } finally {
      setLoading(false)
      setLoadingMore(false)
      fetchingRef.current = false
    }
  }, [])

  // Load the first page once when the component mounts
  useEffect(() => {
    fetchProducts(0)
  }, [fetchProducts])

  // Are there still more products left to load?
  const hasMore = products.length < total

  // Called by the page to load the next batch of products
  const loadMore = useCallback(() => {
    if (fetchingRef.current || !hasMore) return
    fetchProducts(products.length)
  }, [fetchProducts, products.length, hasMore])

  return { products, loading, loadingMore, error, loadMore, hasMore, total }
}

export default useProducts
