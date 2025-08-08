import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  officerData: null, 
  loginUser:null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOfficerData: (state, action) => {
      state.officerData = action.payload; // ✅ Naya reducer
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserData, setOfficerData,setLoginUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
