import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiAuth from '../apis/apiAuth';
import {UserEntity} from '../apis/apiAuth';
import {AppThunk, RootState} from '../store';
import {ACCESS_TOKEN_HEADER_NAME, LOCAL_STORAGE_KEY} from '../constants';

export interface AuthState {
  user: UserEntity | null;
  loading: boolean;
  hasErrors: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  hasErrors: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStarted: (state) => {
      state.loading = true;
    },
    loginSucceeded: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.hasErrors = false;
      axios.defaults.headers.common[ACCESS_TOKEN_HEADER_NAME] = action.payload.token;
      window.localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(action.payload));
    },
    loginFailed: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.hasErrors = false;
      axios.defaults.headers.common[ACCESS_TOKEN_HEADER_NAME] = null;
      window.localStorage.removeItem(LOCAL_STORAGE_KEY.USER);
    },
  },
});

export const {loginStarted, loginSucceeded, loginFailed, logout} = authSlice.actions;

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
  dispatch(loginStarted());
  try {
    dispatch(loginSucceeded(await apiAuth.login(username, password)));
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const userSelector = (state: RootState) => state.auth.user;

export const authenticatedSelector = (state: RootState) => !!state.auth.user;

export default authSlice.reducer;
