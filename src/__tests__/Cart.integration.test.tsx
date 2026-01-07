import { renderWithStore } from "./testUtils";
import { addToCart } from "../redux/CartActionsSlice";

describe("Cart Integration", () => {
  test("cart updates when product is added", () => {
    const { store } = renderWithStore(<div />);

    store.dispatch(
      addToCart({
        id: "1",
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
