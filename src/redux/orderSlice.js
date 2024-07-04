import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        toggleOrder(state, action) {
            console.log('toggleOrder action: ', action);
            state.isOpen = !state.isOpen;
        }
    }
});
export default orderSlice.reducer;
export const {toggleOrder} = orderSlice.actions;
