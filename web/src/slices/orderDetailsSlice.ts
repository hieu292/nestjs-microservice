import {createSlice} from '@reduxjs/toolkit';
import * as apiOrders from '../apis/apiOrders';
import {OrderEntity} from '../apis/apiOrders';
import {AppThunk, RootState} from '../store';
import {updateOrderSucceeded} from './ordersSlice';

export interface OrderDetailsState {
  orderDetails: OrderEntity | null;
  loading: boolean;
  hasErrors: boolean;
}

const initialState: OrderDetailsState = {
  orderDetails: null,
  loading: false,
  hasErrors: false,
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    fetchOrderDetailsStarted: (state) => {
      state.loading = true;
    },
    fetchOrderDetailsSucceeded: (state, action) => {
      state.orderDetails = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    fetchOrderDetailsFailed: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  fetchOrderDetailsStarted,
  fetchOrderDetailsSucceeded,
  fetchOrderDetailsFailed,
} = orderDetailsSlice.actions;

export const fetchOrderDetails = (id: string): AppThunk => async (dispatch) => {
  dispatch(fetchOrderDetailsStarted());
  try {
    const order = await apiOrders.getOrder(id);
    dispatch(fetchOrderDetailsSucceeded(order));
    dispatch(updateOrderSucceeded(order));
  } catch (err) {
    dispatch(fetchOrderDetailsFailed());
  }
};

export const cancelOrder = (id: string): AppThunk => async (dispatch) => {
  try {
    const order = await apiOrders.cancelOrder(id);
    dispatch(fetchOrderDetailsSucceeded(order));
    dispatch(updateOrderSucceeded(order));
  } catch (err) {
    window.alert(err);
  }
};

export const orderDetailsSelector = (state: RootState) => state.orderDetails;

export default orderDetailsSlice.reducer;
