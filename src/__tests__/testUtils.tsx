import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import cartReducer from "../redux/CartActionsSlice";

export const renderWithStore = (ui: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
};
