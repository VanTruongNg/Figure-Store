import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, User } from "../../models/Authentication";
import { logoutUser, postAuth, postRegister } from "../redux-thunk/AuthThunk";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      postAuth.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.authenticationDTO.token;
        localStorage.setItem("token", action.payload.authenticationDTO.token);
        state.isLoggedIn = true;
      }
    );
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    });
    builder.addCase(
      postRegister.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.authenticationDTO.token;
        localStorage.setItem("token", action.payload.authenticationDTO.token);
        state.isLoggedIn = true;
      }
    );
  },
});

export const { reducer: authReducer, actions: authAction } = authSlice;
