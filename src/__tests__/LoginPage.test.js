import { render, screen, cleanup } from "@testing-library/react"
import AdminPage from "../components/AdminPage/AdminPage"
import '@testing-library/jest-dom/extend-expect';


test("Login Page Test", () => {
    render(<AdminPage />)
    const login = screen.getByTestId("login-1");
    expect(login).toBeInTheDocument();
    expect(login).toHaveTextContent("Welcome")
})