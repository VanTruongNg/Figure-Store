import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils";

export const getProducts = createAsyncThunk(
  "home/fetchProducts",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get("user/products");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  "home/fetchCategory",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get("user/product-categories");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postAddProduct = createAsyncThunk(
  "home/AddProduct",
  async (productData: ProductDTO, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/admin/products",
        productData,
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

export const putUpdateProduct = createAsyncThunk(
  "home/UpdateProduct",
  async (
    { id, product }: { id: string; product: ProductDTO },
    { rejectWithValue }
  ) => {
    console.log(product);
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(
        `/admin/products/${id}`,
        product,
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

export const postAddImage = createAsyncThunk(
  "user/AddImage",
  async (formData: FormData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/admin/product-images",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "home/DeleteProduct",
  async (id: string, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(`admin/products/${id}`, {
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
