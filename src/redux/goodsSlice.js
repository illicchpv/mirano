import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL, gatValidFilters} from '../const';

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async (params) => {
  params = gatValidFilters(params)
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_URL}/api/products${queryString ? `?${queryString}` : ''}`;
  console.log('url: ', url);
  const resp = await fetch(url);
  return await resp.json();
});

const initialState = {
  items: [],
  status: 'idle', // 'idle' 'loading', 'succeeded', 'failed'
  error: null,
  categories: [],
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
        state.categories = [];
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        action.payload.forEach(el => {
          if (el.categories) {
            el.categories.forEach(cat => {
              if (!state.categories.includes(cat)) state.categories.push(cat);
            });
          }
        });
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const {} = goodsSlice.actions

export default goodsSlice.reducer;