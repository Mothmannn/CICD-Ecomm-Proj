import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

import { vi } from "vitest";

vi.mock("../auth/useAuth", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    logout: vi.fn(),
  }),
}));

describe("NavBar", () => {
  test("renders app title", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText(/mystore/i)).toBeInTheDocument();
  });
});
