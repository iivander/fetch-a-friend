import { render, screen, waitFor } from "@testing-library/react";
import FiltersModal from "@/app/components/FiltersModal";
import { getDogBreeds } from "@/lib/api";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    useSearchParams: () => new URLSearchParams(""),
    usePathname: () => "/",
}));

jest.mock("@/lib/api", () => ({
    getDogBreeds: jest.fn(),
}));

describe("FiltersModal Component", () => {
    const modalId = "test-modal";

    beforeEach(() => {
        (getDogBreeds as jest.Mock).mockResolvedValue(["Golden Retriever", "Labrador", "Poodle"]);
    });

    test("renders modal with correct elements", async () => {
        render(<FiltersModal modalId={modalId} />);

        await waitFor(() => {
            expect(screen.getByText("Filter Options")).toBeInTheDocument();
            expect(screen.getByLabelText("Minimum age")).toBeInTheDocument();
            expect(screen.getByLabelText("Maximum age")).toBeInTheDocument();
        });
    });
});
