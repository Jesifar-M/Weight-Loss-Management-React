import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ path, element }) => (path === "/" ? element : null),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  Navigate: () => null,
  useNavigate: () => jest.fn(),
}));

test("renders the login form", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /login/i })).toBeTruthy();
  expect(screen.getByLabelText(/email/i)).toBeTruthy();
  expect(screen.getByLabelText(/password/i)).toBeTruthy();
});
