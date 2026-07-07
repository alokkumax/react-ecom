// store.js — The central Redux store for ShoppyGlobe.
// All app-wide state (cart, search, etc.) lives here.

import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import searchReducer from './slices/searchSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
})

export default store
