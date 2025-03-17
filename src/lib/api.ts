"use server";
import { cookies } from "next/headers";
import { Dog, DogFiltersAndSort, DogListResponse } from "./types";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

// TODO: add a global snackbar if there are error, then show the error
export const getDogBreeds = async (): Promise<string[] | null> => {
    try {
        const authToken = (await cookies()).get("auth_token")?.value;

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
    currentPage = 1,
    sort,
    breeds,
    ageMin,
    ageMax,
}: DogFiltersAndSort): Promise<DogListResponse | null> => {
    try {
        // TODO: check and refresh token before it expires, maybe 5 minutes before it expires, and then only do it a maximum of a certain times, then auto log out
        const authToken = (await cookies()).get("auth_token")?.value;

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
            breeds
                .split(",")
                .forEach((breed) => url.searchParams.append("breeds", breed.toString()));
        }

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

        const { resultIds, total } = await response.json();

        const res = await fetch(`${BASE_URL}/dogs`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(authToken && { Cookie: authToken }),
            },
            body: JSON.stringify(resultIds),
        });

        const data: Dog[] = await res.json();
        return {
            data,
            total: Number(total) ?? 0,
        };
    } catch (error) {
        console.error("Failed to fetch dog:", error);
        return null;
    }
};
