import { render, screen } from "@testing-library/react";

test("sanity check", () => {
  render(<div>Hello World</div>);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
