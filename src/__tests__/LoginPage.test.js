import { render, screen, cleanup } from "@testing-library/react"
import AdminPage from "../components/AdminPage/AdminPage"
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './../components/LoginPage/LoginPage';


test("Login Page Test", () => {
    render(<LoginPage />)
    const login = screen.getByTestId("login-1");
    expect(login).toBeInTheDocument();
    expect(login).toHaveTextContent("Welcome")
    expect(login).t
})