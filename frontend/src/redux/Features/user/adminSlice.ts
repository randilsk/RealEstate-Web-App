import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminsignInStart: (state) => {
      state.loading = true;
    },
    adminsignInSuccess: (state, action) => {
      state.currentUser = action.payload; 
      state.loading = false;
      state.error = null;
    },
    adminsignInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    adminsignOutUserStart: (state) => {
      state.loading = true;
    },
    adminsignOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    adminsignOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

  },
});

export const { 
  adminsignInStart, 
  adminsignInSuccess, 
  adminsignInFailure,
  adminsignOutUserStart, 
  adminsignOutUserSuccess, 
  adminsignOutUserFailure,

 
} = adminSlice.actions;
export default adminSlice.reducer;
