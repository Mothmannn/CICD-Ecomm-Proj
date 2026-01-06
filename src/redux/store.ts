// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartActionsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // this key matches `state.cart` in selectors
  },
});

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
