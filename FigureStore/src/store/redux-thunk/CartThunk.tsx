import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils";
import { AddToCart, Cart } from "../../models/Cart";

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get<Cart>("/user/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const postAddToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ cartId, product, quantity }: AddToCart, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        `/user/cart/${cartId}/products`,
        { productId: product.id, quantity: quantity },
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

export const putUpdateQantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, item, quantity }: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        `/user/cart/${cartId}/products/${item.id}`,
        {
          quantity,
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

export const deleteRemoveProduct = createAsyncThunk(
  "cart/removeQuantity",
  async ({ cartId, item }: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/user/cart/${cartId}/products/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return item.id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
