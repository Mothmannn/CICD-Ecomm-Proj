//src/__tests__/Cart.integration.test.tsx
import { renderWithStore } from "../utils/testUtils";
import { addToCart } from "../redux/CartActionsSlice";

jest.mock("../redux/sessionStorage", () => ({
  loadCartFromSession: () => null,
  saveCartToSession: () => {},
}));

describe("Cart Integration", () => {
  test("cart updates when product is added", () => {
    const { store } = renderWithStore(<div />);

    store.dispatch(
      addToCart({
        id:"1",
        title: "Test Product",
        price: 20,
        image: "test.jpg",
      })
    );

    const items = store.getState().cart.items;

    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Test Product");
    expect(items[0].quantity).toBe(1);
  });
});
