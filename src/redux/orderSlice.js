import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {API_URL} from '../const';
import {fetchCart, toggleCart} from './cartSlice';

const initialState = {
  isOpen: false,
  orderId: '',
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',

    paymentOnline: 'true',
    deliveryDate: '',
    deliveryTime: '',
  },
};

export const sendOrder = createAsyncThunk("order/sendOrder", async (_, {getState, dispatch}) => {
  // const state = getState();
  const {order: {data: {
    buyerName,
    buyerPhone,
    recipientName,
    recipientPhone,
    street,
    house,
    apartment,

    paymentOnline,
    deliveryDate,
    deliveryTime,    
  }}} = getState();
  const orderData = {
    "buyer": {
      "name": buyerName,
      "phone": buyerPhone,
    },
    "recipient": {
      "name": recipientName,
      "phone": recipientPhone
    },
    "address": `${street}, ${house}, ${apartment}`,
    paymentOnline,
    deliveryDate,
    deliveryTime,
  };
  console.log('orderData: ', orderData);

  const resp = await fetch()

  dispatch(clearOrder());
  dispatch(toggleCart());
  dispatch(fetchCart());

  return await resp.json();
});



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
    },
    clearOrder(state, action) {
      console.log('clearOrder action: ', action);
      state.data = initialState.data;
    },
    updateOrderData(state, action) {
      console.log('updateOrderData action: ', action);
      //??? state.data[action.payload.name] = action.payload.value;
      state.data = {...state.data, ...action.payload};
    },
  },
});
export default orderSlice.reducer;
export const {openOrder, clearOrder, closeOrder, updateOrderData} = orderSlice.actions;
