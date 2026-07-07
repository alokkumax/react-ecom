// cartSlice.js — Redux state for the shopping cart.
// Redux Toolkit uses "slices" — each slice owns one piece of app state.

import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each cart item will be stored here later
  },
  reducers: {
    // These reducers are placeholders for now.
    // We just return state unchanged — real logic comes in a later step.

    addToCart: (state) => {
      return state
    },
    removeFromCart: (state) => {
      return state
    },
    increaseQuantity: (state) => {
      return state
    },
    decreaseQuantity: (state) => {
      return state
    },
    clearCart: (state) => {
      return state
    },
  },
})

// Export actions so components can dispatch them later
// Example: dispatch(addToCart(product))
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
