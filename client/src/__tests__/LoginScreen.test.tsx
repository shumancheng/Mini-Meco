import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginScreen from "./../screens/Auth/LoginScreen";

describe("LoginScreen Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: "testToken" }),
        ok: true,
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    render(<LoginScreen />, { wrapper: MemoryRouter });
    expect(
      screen.getByPlaceholderText("Please enter your email address")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Please enter your password")
    ).toBeInTheDocument();
  });
});
