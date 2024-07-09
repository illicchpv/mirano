import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../const';

export const registerCart = createAsyncThunk("cart/registerCart", async () => {
  const resp = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
  });
  return await resp.json();
});

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem('cart') || "[]"),
  status: "idle",
  accessKey: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state, action) {
      console.log('toggleCart action: ', action);
      state.isOpen = !state.isOpen;
    },

    // добавление в корзину localStorage+
    addItemToCart(state, action) {
      console.log('addItemToCart action: ', action);
      const {id, img, title, dateDelivery, price, count = 1} = action.payload;
      if (title.includes('Dolche vita')) {
        state.items = [];
      } else {
        const existItem = state.items.find((item) => item.id === id);
        if (existItem) {
          existItem.count = count;
        } else {
          state.items.push({id, img, title, dateDelivery, price, count});
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessKey = action.payload.accessKey;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.status = 'failed';
        state.accessKey = null;
        state.error = action.error.message;
      });
  },
});
export default cartSlice.reducer;
export const {toggleCart, addItemToCart} = cartSlice.actions;
