// searchSlice.js — Placeholder reducer for the search bar.
// We will add real search logic in a later step.

import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // search text will be stored here later
  },
  reducers: {
    // search actions will be added later
  },
})

export default searchSlice.reducer
