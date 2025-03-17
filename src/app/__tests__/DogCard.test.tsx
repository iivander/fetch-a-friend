import { render, screen } from "@testing-library/react";
import DogCard, { DogCardSkeleton } from "@/app/components/DogCard";
import { Dog } from "@/lib/types";

const mockDog: Dog = {
    id: "test123",
    img: "https://test.test.com",
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    zip_code: "12345",
};

describe("DogCard Component", () => {
    test("renders the dog's name", () => {
        render(<DogCard {...mockDog} />);
        expect(screen.getByText(/Buddy/i)).toBeInTheDocument();
    });

    test("renders the dog's age", () => {
        render(<DogCard {...mockDog} />);
        expect(screen.getByText(/Age: 3/i)).toBeInTheDocument();
    });

    test("renders the dog's breed", () => {
        render(<DogCard {...mockDog} />);
        expect(screen.getByText(/Breed: Golden Retriever/i)).toBeInTheDocument();
    });

    test("renders the dog's zip code", () => {
        render(<DogCard {...mockDog} />);
        expect(screen.getByText(/Zip Code: 12345/i)).toBeInTheDocument();
    });

    describe("DogCardSkeleton Component", () => {
        test("renders the skeleton loader", () => {
            render(<DogCardSkeleton />);

            expect(screen.getByTestId("dog-card-skeleton")).toBeInTheDocument();
            expect(screen.getByTestId("dog-card-skeleton")).toHaveClass("animate-pulse");
        });
    });
});
