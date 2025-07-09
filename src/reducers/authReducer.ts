import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role")
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; role: string} >) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logout(state) {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;