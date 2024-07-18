import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL, deliveryDate} from '../const';

const initialState = {
  isOpen: false,
  items: [],
  status: "idle",
  accessKey: null,
  error: null,
  deliveryDate: deliveryDate(),
};

export const addItemToCart = createAsyncThunk("cart/addItemToCart",
  async ({productId, quantity}, {getState, rejectWithValue}) => {
    try {
      const state = getState();
      const cartItems = state.cart.items;
      if(isNaN(parseInt(quantity))) {
        const cartItem = cartItems.find(item => item.id === productId);
        quantity = cartItem ? cartItem.quantity + 1 : 1;
      }
      const resp = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId, quantity}),
      });
      if (!resp.ok) {
        throw new Error('addItemToCart response error');
      }
      return await resp.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const registerCart = createAsyncThunk("cart/registerCart", async () => {
  const resp = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!resp.ok) {
    throw new Error('registerCart response error');
  }
  return await resp.json();
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const resp = await fetch(`${API_URL}/api/cart`, {
    credentials: 'include',
  });
  if (!resp.ok) {
    throw new Error('fetchCart response error');
  }
  return await resp.json();
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state, action) {
      console.log('toggleCart action: ', action);
      state.isOpen = !state.isOpen;
    },
    changeDeliveryDate(state, action) {
      console.log('changeDeliveryDate action: ', action);
      state.deliveryDate = deliveryDate();
    },

    // добавление в корзину localStorage+
    // addItemToCart(state, action) {
    //   console.log('addItemToCart action: ', action);
    //   const {id, img, title, dateDelivery, price, count = 1} = action.payload;
    //   if (title.includes('Dolche vita')) {
    //     state.items = [];
    //   } else {
    //     const existItem = state.items.find((item) => item.id === id);
    //     if (existItem) {
    //       existItem.count = count;
    //     } else {
    //       state.items.push({id, img, title, dateDelivery, price, count});
    //     }
    //   }
    //   localStorage.setItem('cart', JSON.stringify(state.items));
    // },
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
        state.error = action.payload || action.error.message;
      });

    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});
export default cartSlice.reducer;
export const {toggleCart, changeDeliveryDate} = cartSlice.actions; // addItemToCart
