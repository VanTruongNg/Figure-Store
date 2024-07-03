import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteRemoveProduct,
  getUserCart,
  postAddToCart,
  putUpdateQantity,
} from "../redux-thunk/CartThunk";
import { CartItem } from "../../models/Cart";

interface CartState {
  cartId: string | null;
  cart: CartItem[];
}

const initialState: CartState = {
  cartId: null,
  cart: [] as CartItem[],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
      toast.success("Sốp cảm ơn nhiều");
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item: any = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    setQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    resetQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.quantity !== 1) {
        item.quantity = 1;
      }
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      toast.error("MUA ĐI MÀ SAO LẠI XOÁ");
    },
    clearCart: (state) => {
      state.cartId = null;
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.cartId = action.payload.id;
      state.cart = action.payload.items;
    });
    builder.addCase(postAddToCart.fulfilled, (state, action) => {
      state.cart = action.payload.items;
    });
    builder.addCase(putUpdateQantity.fulfilled, (state, action) => {
      state.cart = action.payload.items;
    });
    builder.addCase(deleteRemoveProduct.fulfilled, (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    });
  },
});

export const { reducer: cartReducer, actions: cartAction } = CartSlice;
