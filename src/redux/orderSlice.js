import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        openOrder(state, action) {
            console.log('openOrder action: ', action);
            state.isOpen = true;
        },
        closeOrder(state, action) {
            console.log('closeOrder action: ', action);
            state.isOpen = false;
        }
    }
});
export default orderSlice.reducer;
export const {openOrder, closeOrder} = orderSlice.actions;
