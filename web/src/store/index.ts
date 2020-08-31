import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import orderDetailsReducer from '../slices/orderDetailsSlice';
import ordersReducer from '../slices/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
