import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  it("renders login form correctly", () => {
    render(<LoginScreen />, { wrapper: MemoryRouter });
    expect(screen.getByPlaceholderText("Please enter your email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Please enter your password")).toBeInTheDocument();
  });

  it("switches to registration form on 'Sign Up' click", () => {
    render(<LoginScreen />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText("Sign Up"));
    expect(screen.getByPlaceholderText("Please enter your name")).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    render(<LoginScreen />, { wrapper: MemoryRouter });
    
    fireEvent.change(screen.getByPlaceholderText("Please enter your email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Please enter your password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/login", expect.any(Object));
      expect(screen.getByText("Success!")).toBeInTheDocument();
    });
  });

  it("handles form submission error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Error occurred" }),
        ok: false,
      })
    ) as jest.Mock;

    render(<LoginScreen />, { wrapper: MemoryRouter });
    
    fireEvent.change(screen.getByPlaceholderText("Please enter your email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Please enter your password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));
    
    await waitFor(() => {
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
    });
  });
});
