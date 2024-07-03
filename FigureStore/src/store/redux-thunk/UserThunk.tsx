import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils";

export const patchProfileImage = createAsyncThunk(
  "user/patchProfileImage",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.patch(
        "/account/update-profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.profileImage;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const patchUserProfile = createAsyncThunk(
  "user/patchUserProfile",
  async (
    { firstName, lastName, phoneNumber }: UserRequest,
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.patch(
        "/account/update-profile",
        {
          firstName,
          lastName,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const patchChangePassword = createAsyncThunk(
  "user/changePassword",
  async (
    { oldPassword, newPassword, confirmPassword }: ChangePasswordRequest,
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.patch(
        "/account/change-password",
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserAddress = createAsyncThunk(
  "user/getUserAddress",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get("/account/address", {
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

export const postAddUserAddress = createAsyncThunk(
  "user/AddUserAddress",
  async ({ address, district, province }: UserAddress, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/account/address",
        {
          address,
          district,
          province,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const putUpdateAddress = createAsyncThunk(
  "user/updateAddress",
  async (updateData: UserAddress, { rejectWithValue }) => {
    const { id, address, district, province } = updateData;
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.put(
        `/account/address/${id}`,
        {
          address,
          district,
          province,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "user/DeleteAddress",
  async (id: string, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(`/account/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const patchSetDefaultAddress = createAsyncThunk(
  "user/SetDefaultAddress",
  async (id: UserAddress, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.patch(
        `/account/set-address/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
