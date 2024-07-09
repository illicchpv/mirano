import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../const';

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async (params) => {
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
  goodsTitle: 'Цветы', // Игрушки Открытки
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setGoodsTitle(state, action) {
      console.log('setGoodsTitle action: ', action);
      switch (action.payload) {
        default: state.goodsTitle = 'Цветы'; break;
        case 'toys': state.goodsTitle = 'Игрушки'; break;
        case 'postcards': state.goodsTitle = 'Открытки'; break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setGoodsTitle} = goodsSlice.actions

export default goodsSlice.reducer;