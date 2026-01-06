import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadCartFromSession, saveCartToSession } from './sessionStorage';

export interface CartItem {
    id: string,
    title: string,
    price: number,
    image: string,
    quantity: number,
}

export interface CartState {
    items: CartItem[],
}

const initialState: CartState = loadCartFromSession() || {
    items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToSession(state);
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToSession(state);
    },

    clearCart(state) {
      state.items = [];
      saveCartToSession(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;