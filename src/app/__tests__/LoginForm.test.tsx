import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/app/components/LoginForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("LoginForm Component", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.clearAllMocks();
    });

    test("renders login form correctly", () => {
        render(<LoginForm />);
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    test("allows user to type into name and email fields", async () => {
        render(<LoginForm />);
        const nameInput = screen.getByLabelText("Name");
        const emailInput = screen.getByLabelText("Email");

        await userEvent.type(nameInput, "John Doe");
        await userEvent.type(emailInput, "john@example.com");

        expect(nameInput).toHaveValue("John Doe");
        expect(emailInput).toHaveValue("john@example.com");
    });

    test("displays error message when login fails", async () => {
        (signIn as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });
        render(<LoginForm />);

        fireEvent.submit(screen.getByRole("button", { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByRole("alert")).toHaveTextContent("Invalid name or email");
        });
    });

    test("redirects to main page on successful login", async () => {
        (signIn as jest.Mock).mockResolvedValue({ error: null });
        render(<LoginForm />);

        fireEvent.submit(screen.getByRole("button", { name: /sign in/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/main");
        });
    });
});
