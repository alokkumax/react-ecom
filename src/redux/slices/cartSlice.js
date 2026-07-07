// cartSlice.js — Redux state for the shopping cart.
// Redux Toolkit uses "slices" — each slice owns one piece of app state.
//
// Note: Redux Toolkit uses "Immer" under the hood, so we are allowed to
// "mutate" state directly (like state.items.push()). Immer turns that into
// a safe, immutable update for us.

import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item looks like: { ...product, quantity: number }
  },
  reducers: {
    // Add a product to the cart.
    // If it's already there, just increase its quantity by 1.
    addToCart: (state, action) => {
      const product = action.payload

      // Check if this product is already in the cart
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        // Already in cart → bump the quantity
        existingItem.quantity += 1
      } else {
        // New product → add it with quantity 1
        state.items.push({ ...product, quantity: 1 })
      }
    },

    // Remove a product from the cart completely (by its id).
    removeFromCart: (state, action) => {
      const id = action.payload
      // Keep every item EXCEPT the one whose id matches
      state.items = state.items.filter((item) => item.id !== id)
    },

    // Increase a product's quantity by 1.
    increaseQuantity: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity += 1
      }
    },

    // Decrease a product's quantity by 1.
    // We never let quantity go below 1.
    decreaseQuantity: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },

    // Empty the whole cart.
    clearCart: (state) => {
      state.items = []
    },
  },
})

// Export actions so components can dispatch them.
// Example: dispatch(addToCart(product))
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

// ----- Selectors -----
// Selectors are small functions that "select" a piece of data from the store.
// Using them keeps our components clean (no need to dig into state everywhere).

// Get the full list of items in the cart
export const selectCartItems = (state) => state.cart.items

// Get the total number of items (adds up every item's quantity)
// Example: 2 shirts + 3 mugs = 5
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

// Get the total price of everything in the cart (price × quantity)
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

export default cartSlice.reducer
