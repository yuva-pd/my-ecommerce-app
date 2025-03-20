import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  // Add any other fields your User object may have
}

interface AuthState {
  accessToken: string | null;
  user: User | null; // Use User type instead of `any`
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
