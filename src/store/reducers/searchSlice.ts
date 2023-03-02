import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { search: string } = {
  search: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<{ search: string }>) => {
      state.search = action.payload.search;
    },
  },
});

export const searchReducer = searchSlice.reducer;

export const { setSearch } = searchSlice.actions;
