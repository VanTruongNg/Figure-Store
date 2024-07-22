import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils";
import { CategoryDTO } from "../../models/Category";

export const postAddCategory = createAsyncThunk(
  "category/AddCategory",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/admin/product-categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUpdateCategory = createAsyncThunk(
  "category/UpdateCategory",
  async (category: CategoryDTO, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(
        `/admin/product-categories/${category.id}`,
        category.name,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/DeleteCategory",
  async (id: string, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(`/admin/product-categories/${id}`, {
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
