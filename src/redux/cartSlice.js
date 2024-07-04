import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart(state, action) {
            console.log('toggleCart action: ', action);
            state.isOpen = !state.isOpen;
        }
    }
});
export default cartSlice.reducer;
export const {toggleCart} = cartSlice.actions;
