import { createSlice } from "@reduxjs/toolkit";
import {
  getOrderByUser,
  getOrders,
  postCreateOrder,
  postUpdateOrderStatus,
} from "../redux-thunk/OrderThunk";
import { Order } from "../../models/Order";

interface OrderState {
  orderId: string | null;
  order: Order[];
  orderAdmin: Order[];
}

const initialState: OrderState = {
  orderId: null,
  order: [],
  orderAdmin: [],
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderId: (state) => {
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCreateOrder.fulfilled, (state, action) => {
      state.orderId = action.payload;
    });
    builder.addCase(getOrderByUser.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orderAdmin = action.payload;
    });
    builder.addCase(postUpdateOrderStatus.fulfilled, (state, action) => {
      const index = state.orderAdmin.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orderAdmin[index].status = action.payload.status;
      }
    });
  },
});

export const { reducer: orderReducer, actions: orderAction } = OrderSlice;
