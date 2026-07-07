// useProducts.js — Custom hook to fetch products from an API.
// A "custom hook" is just a function that uses other React hooks inside it.
// We can reuse this hook in any component that needs product data.

import { useState, useEffect } from 'react'

function useProducts() {
  // Step 1: Create state variables to hold our data
  const [products, setProducts] = useState([]) // list of products from API
  const [loading, setLoading] = useState(true) // true while fetching
  const [error, setError] = useState(null) // holds error message if fetch fails

  // Step 2: useEffect runs after the component mounts (appears on screen)
  useEffect(() => {
    // async function inside useEffect to fetch data
    async function fetchProducts() {
      try {
        // Show loading state while we wait for the API
        setLoading(true)
        setError(null)

        // Step 3: Call the dummyjson API
        const response = await fetch('https://dummyjson.com/products')

        // If the server responds with an error status (404, 500, etc.)
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        // Step 4: Convert response to JavaScript object
        const data = await response.json()

        // dummyjson returns { products: [...] } — we only need the array
        setProducts(data.products)
      } catch (err) {
        // Step 5: If anything goes wrong, save the error message
        setError(err.message)
        console.error('Error fetching products:', err.message)
      } finally {
        // Step 6: Always turn off loading, whether success or failure
        setLoading(false)
      }
    }

    fetchProducts()
  }, []) // empty [] means run only once when component first loads

  // Step 7: Return values so any component using this hook can access them
  return { products, loading, error }
}

export default useProducts
