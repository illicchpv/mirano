import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem('cart') || "[]"),
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
      if(title.includes('Dolche vita')){
        state.items = [];
      }else{
        const existItem = state.items.find((item) => item.id === id);
        if (existItem) {
          existItem.count = count;
        } else {
          state.items.push({id, img, title, dateDelivery, price, count});
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  }
});
export default cartSlice.reducer;
export const {toggleCart, addItemToCart} = cartSlice.actions;
