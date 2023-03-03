import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { search: string; tag: string } = {
  search: '',
  tag: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<{ search: string }>) => {
      state.search = action.payload.search;
    },
    setTag: (state, action: PayloadAction<{ tag: string }>) => {
      state.tag = action.payload.tag;
    },
  },
});

export const searchReducer = searchSlice.reducer;

export const { setSearch, setTag } = searchSlice.actions;
