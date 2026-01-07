// src/__tests__/testUtils.tsx
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

  const utils = render(<Provider store={store}>{ui}</Provider>);

  return {
    store,
    ...utils,
  };
};
