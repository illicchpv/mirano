import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    type: 'bouquets', // bouquets     toys     postcards
    minPrice: '',
    maxPrice: '',
    category: '',
    //search
    //list    
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action) {
      console.log('setFilters action: ', action);
      state.filters = action.payload
    }
  }
});

export const {setFilters} = filterSlice.actions

export default filterSlice.reducer