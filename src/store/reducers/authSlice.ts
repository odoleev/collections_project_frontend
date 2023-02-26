import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '../../types';

const initialState: IAuth = {
  accessToken: null,
  refreshToken: null,
  role: null,
  id: null,
  username: null,
  banStatus: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: action.payload.username,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          role: action.payload.role,
          banStatus: action.payload.banStatus,
          id: action.payload.id,
        })
      );
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.banStatus = action.payload.banStatus;
    },
    logoutUser: (state) => {
      localStorage.clear();
      state.role = null;
      state.username = null;
      state.refreshToken = null;
      state.accessToken = null;
      state.banStatus = null;
      state.id = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setUser, logoutUser } = authSlice.actions;
