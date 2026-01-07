import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

jest.mock("../auth/useAuth", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    logout: jest.fn(),
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
