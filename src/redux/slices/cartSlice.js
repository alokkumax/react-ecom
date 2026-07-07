// cartSlice.js — Placeholder reducer for the shopping cart.
// We will add real cart logic in a later step.

import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // cart products will go here later
  },
  reducers: {
    // cart actions will be added later
  },
})

export default cartSlice.reducer
