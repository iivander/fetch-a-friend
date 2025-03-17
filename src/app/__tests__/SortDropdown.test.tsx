import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown, { SORT_OPTIONS } from "@/app/components/SortDropdown";
import { useSearchParams, useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useSearchParams: jest.fn(),
    useRouter: jest.fn(),
}));

describe("SortDropdown Component", () => {
    const mockReplace = jest.fn();

    beforeEach(() => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
        (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
        jest.clearAllMocks();
    });

    test("renders sort dropdown with options", () => {
        render(<SortDropdown />);

        expect(screen.getByText("Sort By:")).toBeInTheDocument();
        SORT_OPTIONS.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    test("changes sort option and updates URL", () => {
        render(<SortDropdown />);
        const select = screen.getByRole("combobox");

        fireEvent.change(select, { target: { value: SORT_OPTIONS[2].value } });

        expect(mockReplace).toHaveBeenCalledWith(
            expect.stringContaining(`sort=${encodeURIComponent(SORT_OPTIONS[2].value)}`), // ✅ Fix by encoding the expected value
            { scroll: false }
        );
    });
});
