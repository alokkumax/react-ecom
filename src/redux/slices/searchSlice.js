// searchSlice.js — Redux state for the search bar.
// The search term is shared across the app via Redux.

import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '', // whatever the user types in the search box
  },
  reducers: {
    // Save whatever the user typed into the search box.
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  },
})

// Export the action so components can call dispatch(setSearchTerm('shoes'))
export const { setSearchTerm } = searchSlice.actions

// Selector — read the current search term from the store.
export const selectSearchTerm = (state) => state.search.searchTerm

export default searchSlice.reducer
