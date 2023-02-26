import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlert } from '../../types';

const initialState: IAlert = {
  isOpen: false,
  text: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlert>) => {
      state.isOpen = action.payload.isOpen;
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
  },
});

export const alertReducer = alertSlice.reducer;

export const { setAlert } = alertSlice.actions;
