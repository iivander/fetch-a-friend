import { render, screen, fireEvent } from "@testing-library/react";
import TopNav from "@/app/components/TopNav";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
    signOut: jest.fn(),
}));

describe("TopNav Component", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.clearAllMocks();
    });

    test("renders logo and user icon", () => {
        render(<TopNav />);
        expect(screen.getByAltText("Fetch")).toBeInTheDocument();
        expect(screen.getByAltText("User")).toBeInTheDocument();
    });

    test("navigates to main page when logo is clicked", () => {
        render(<TopNav />);
        const logo = screen.getByAltText("Fetch");
        fireEvent.click(logo);
        expect(mockPush).toHaveBeenCalledWith("/main");
    });

    test("opens user dropdown when user icon is clicked", () => {
        render(<TopNav />);
        const userIcon = screen.getByRole("button");
        fireEvent.click(userIcon);
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    test("calls signOut when logout is clicked", () => {
        render(<TopNav />);
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText("Logout"));
        expect(signOut).toHaveBeenCalled();
    });
});
