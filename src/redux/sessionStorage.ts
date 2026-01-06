import type { CartState } from "./CartActionsSlice";

// Save cart to sessionStorage
export const saveCartToSession = (cart: CartState) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

// Load cart from sessionStorage
export const loadCartFromSession = (): CartState | undefined => {
  const data = sessionStorage.getItem("cart");
  if (!data) return undefined;
  try {
    return JSON.parse(data) as CartState;
  } catch {
    return undefined;
  }
};
