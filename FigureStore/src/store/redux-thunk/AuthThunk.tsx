import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthResponse,
  LoginParams,
  RegisterParams,
} from "../../models/Authentication";
import { axiosInstance } from "../../utils";

export const postAuth = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.authenticationDTO.token);
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postRegister = createAsyncThunk(
  "auth/register",
  async (
    { firstName, lastName, email, password, phoneNumber }: RegisterParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.authenticationDTO.token);
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
