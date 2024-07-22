import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../redux-thunk";
import {
  deleteProduct,
  getCategory,
  postAddImage,
  postAddProduct,
  putUpdateProduct,
} from "../redux-thunk/ProductThunk";
import {
  deleteCategory,
  postAddCategory,
  putUpdateCategory,
} from "../redux-thunk/CategoryThunk";

interface HomeState {
  products: Product[];
  categories: Category[];
  checkedCategories: Category[];
  filteredProducts: Product[];
}

const initialState: HomeState = {
  products: [],
  categories: [],
  checkedCategories: [],
  filteredProducts: [],
};

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      const index = state.checkedCategories.findIndex(
        (b) => b.name === category.name
      );
      if (index !== -1) {
        state.checkedCategories.splice(index, 1);
      } else {
        state.checkedCategories.push(category);
      }
    },
    clearCheckedCategories: (state) => {
      state.checkedCategories = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(postAddProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(putUpdateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(postAddImage.fulfilled, (state, action) => {
      const { id, url } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        state.products[productIndex].images.push({ id, url });
      }
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id === action.payload
      );
    });
    builder.addCase(postAddCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(putUpdateCategory.fulfilled, (state, action) => {
      const index = state.categories.findIndex(
        (categories: any) => categories.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (categories: any) => categories.id !== action.payload
      );
    });
  },
});

export const { reducer: homeReducer, actions: homeAction } = HomeSlice;
