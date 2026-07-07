// searchSlice.js — Redux state for the search bar.
// The search term is shared across the app via Redux.

import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '', // whatever the user types in the search box
  },
  reducers: {
    // Placeholder for now — just returns state unchanged.
    // Real logic will update searchTerm in a later step.
    setSearchTerm: (state) => {
      return state
    },
  },
})

// Export the action so components can call dispatch(setSearchTerm('shoes'))
export const { setSearchTerm } = searchSlice.actions

export default searchSlice.reducer
