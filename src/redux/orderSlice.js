import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {API_URL} from '../const';
import {fetchCart, toggleCart} from './cartSlice';
import {API_URL} from '../const';

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
  status: "idle",
  error: null,
};

export const sendOrder = createAsyncThunk("order/sendOrder",
  async (_, {getState, dispatch, rejectWithValue}) => {
    try {
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

      const resp = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if(!resp.ok) {
        throw new Error('sendOrder response error.');
      }
      const data = await resp.json();

      dispatch(clearOrder());
      dispatch(toggleCart());
      dispatch(fetchCart());

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = 'loading';
        state.orderId = '';
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderId = action.payload.orderId;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.orderId = '';
        state.error = action.payload || action.error.message;
      });
  },
});
export default orderSlice.reducer;
export const {openOrder, clearOrder, closeOrder, updateOrderData} = orderSlice.actions;
