"use server";
import { cookies } from "next/headers";
import { Dog, DogFiltersAndSort, DogListResponse } from "./types";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

// TODO: check and refresh token before it expires, maybe 5 minutes before it expires, and then only do it a maximum of a certain times, then auto log out
const getAuthToken = async (): Promise<string | null> => {
    return (await cookies()).get("auth_token")?.value ?? null;
};

const buildSearchUrl = ({
    currentPage = 1,
    sort,
    breeds,
    ageMin,
    ageMax,
}: DogFiltersAndSort): URL => {
    const url = new URL(`${BASE_URL}/dogs/search`);

    const filters: [string, string | number | null][] = [
        ["from", (currentPage - 1) * 25],
        ["ageMin", ageMin ?? ""],
        ["ageMax", ageMax ?? ""],
        ["sort", sort],
    ];

    filters.forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value.toString());
        }
    });

    if (breeds) {
        breeds.split(",").forEach((breed) => url.searchParams.append("breeds", breed.toString()));
    }

    return url;
};

const fetchSearchResults = async (url: URL, authToken: string | null) => {
    const response = await fetch(url.toString(), {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(authToken && { Cookie: authToken }),
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

const fetchDogDetails = async (resultIds: string[], authToken: string | null): Promise<Dog[]> => {
    const response = await fetch(`${BASE_URL}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(authToken && { Cookie: authToken }),
        },
        body: JSON.stringify(resultIds),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const getDogBreeds = async (): Promise<string[] | null> => {
    try {
        const authToken = await getAuthToken();

        const response = await fetch(`${BASE_URL}/dogs/breeds`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(authToken && { Cookie: authToken }),
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch dog breeds:", error);
        return null;
    }
};

export const getDogLists = async ({
    currentPage,
    sort,
    breeds,
    ageMin,
    ageMax,
}: DogFiltersAndSort): Promise<DogListResponse | null> => {
    try {
        const authToken = await getAuthToken();
        const url = buildSearchUrl({ currentPage, sort, breeds, ageMin, ageMax });

        const { resultIds, total } = await fetchSearchResults(url, authToken);
        const data = await fetchDogDetails(resultIds, authToken);

        return {
            data,
            total: Number(total) ?? 0,
        };
    } catch (error) {
        console.error("Failed to fetch dog:", error);
        return null;
    }
};

export const getMatchedDog = async ({ favoriteDogIds }: { favoriteDogIds: string[] }) => {
    try {
        const authToken = await getAuthToken();

        const response = await fetch(`${BASE_URL}/dogs/match`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(authToken && { Cookie: authToken }),
            },
            body: JSON.stringify(favoriteDogIds ?? []),
        });

        if (!response.ok) {
            throw new Error("Failed to match favorite dog");
        }

        const { match } = await response.json();
        return await fetchDogDetails([match], authToken);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchFavoritedDog = async (userId: string): Promise<string[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites?userId=${userId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch favorite dogs");
        }

        const favoriteDogs = await response.json();
        return favoriteDogs.map((fav: { dogId: string }) => fav.dogId);
    } catch (error) {
        console.error("Error fetching favorite dogs:", error);
        return [];
    }
};

export const setFavoriteDog = async (userId: string, dogId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, dogId }),
        });

        if (!response.ok) {
            throw new Error("Failed to set favorite dog");
        }

        return true;
    } catch (error) {
        console.error("Error adding favorite dog:", error);
        return false;
    }
};

export const deleteFavoriteDog = async (userId: string, dogId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, dogId }),
        });

        if (!response.ok) {
            throw new Error("Failed to delete favorite dog");
        }

        return true;
    } catch (error) {
        console.error("Error removing favorite dog:", error);
        return false;
    }
};
