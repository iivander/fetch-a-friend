import { render, screen, fireEvent } from "@testing-library/react";
import TopNav from "@/app/components/TopNav";
import { useRouter } from "next/navigation";

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
});
