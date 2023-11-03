import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./alertSlice";
import cartSlice from "./cartSlice";
import authenticationSlice from "./authenticationSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    cart: cartSlice.reducer,
    authentication: authenticationSlice.reducer,
  },
});

export const alertActions = alertSlice.actions;
export const cartActions = cartSlice.actions;
export const authenticationActions = authenticationSlice.actions;

export default store;
