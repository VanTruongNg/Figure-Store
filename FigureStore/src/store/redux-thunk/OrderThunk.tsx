import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils";
import { CartItem } from "../../models/Cart";

export const postCreateOrder = createAsyncThunk(
  "order/CreateOrder",
  async (amount: number, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post("/user/orders/create", amount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postAddProductToOrder = createAsyncThunk(
  "order/AddProductToOrder",
  async (
    { orderId, cartItems }: { orderId: string; cartItems: CartItem },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        `/user/orders/${orderId}/products/add`,
        {
          productId: cartItems.product.id,
          quantity: cartItems.quantity,
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

export const getOrderByUser = createAsyncThunk(
  "order/GetOrder",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get("/user/orders", {
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

export const getOrders = createAsyncThunk(
  "order/GetOrders",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get("/admin/orders", {
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

export const postUpdateOrderStatus = createAsyncThunk(
  "order/UpdateOrderStatus",
  async ({ id, status }: any, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(
        `/admin/orders/${id}/status`,
        status,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { id, status: response.data.status };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
