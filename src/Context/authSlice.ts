import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const userData = action.payload;
      state.user = userData.email;
      state.token = userData.token;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.setItem('user', JSON.stringify(null));
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;