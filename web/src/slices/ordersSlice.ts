import {createSlice} from '@reduxjs/toolkit';
import * as _ from 'lodash';
import * as apiOrders from '../apis/apiOrders';
import {AppThunk, RootState} from '../store';

export interface OrdersState {
  orders: apiOrders.OrderEntity[];
  loading: boolean;
  hasErrors: boolean;
  page: number;
  pageCount: number;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  hasErrors: false,
  page: 0,
  pageCount: 0,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStarted: (state, action) => {
      state.page = action.payload;
      state.loading = true;
    },
    fetchOrdersSucceeded: (state, action) => {
      state.orders = action.payload.data;
      state.page = +action.payload.headers['x-page'];
      state.pageCount = +action.payload.headers['x-pages-count'];
      state.loading = false;
      state.hasErrors = false;
    },
    fetchOrdersFailed: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateOrderSucceeded: (state, action) => {
      state.orders = _.map(state.orders, (order) => (order.id === action.payload.id ? action.payload : order));
    },
  },
});

export const {fetchOrdersStarted, fetchOrdersSucceeded, fetchOrdersFailed, updateOrderSucceeded} = ordersSlice.actions;

export const fetchOrders = (page?: number): AppThunk => async (dispatch, getState) => {
  if (!page) {
    page = getState().orders.page;
  }
  dispatch(fetchOrdersStarted(page));
  try {
    dispatch(fetchOrdersSucceeded(await apiOrders.getOrders(page)));
  } catch (err) {
    dispatch(fetchOrdersFailed());
  }
};

export const ordersSelector = (state: RootState) => state.orders;

export default ordersSlice.reducer;
