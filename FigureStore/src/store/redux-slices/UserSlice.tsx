import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAddress,
  getUserAddress,
  patchProfileImage,
  patchSetDefaultAddress,
  patchUserProfile,
  postAddUserAddress,
  putUpdateAddress,
} from "../redux-thunk/UserThunk";
import { logoutUser } from "../redux-thunk/AuthThunk";

interface UserState {
  profileImage: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: UserAddress[];
  defaultAddress: string | null;
}
const initialState: UserState = {
  profileImage: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  address: [],
  defaultAddress: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(patchProfileImage.fulfilled, (state, action) => {
      state.profileImage = action.payload;
    });
    builder.addCase(patchUserProfile.fulfilled, (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
    });
    builder.addCase(logoutUser.fulfilled, () => {
      return initialState;
    });
    builder.addCase(getUserAddress.fulfilled, (state, action) => {
      state.address = action.payload;
    });
    builder.addCase(postAddUserAddress.fulfilled, (state, action) => {
      state.address.push(action.payload);
    });
    builder.addCase(patchSetDefaultAddress.fulfilled, (state, action) => {
      state.defaultAddress = action.payload.defaultAddress;
    });
    builder.addCase(putUpdateAddress.fulfilled, (state, action) => {
      const updatedAddressIndex = state.address.findIndex(
        (addr) => addr.id === action.payload.id
      );
      if (updatedAddressIndex !== -1) {
        state.address[updatedAddressIndex] = action.payload;
      }
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.address = state.address.filter(
        (address) => address.id !== action.payload
      );
    });
  },
});

export const { reducer: UserReducer, actions: UserAction } = userSlice;
