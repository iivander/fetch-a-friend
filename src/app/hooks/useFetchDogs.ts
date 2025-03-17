import { useState, useEffect } from "react";
import { getDogLists } from "@/lib/api";
import { Dog } from "@/lib/types";

interface UseFetchDogsParams {
    currentPage: number;
    sort: string;
    breeds?: string;
    ageMin?: number;
    ageMax?: number;
}

export function useFetchDogs({ currentPage, sort, breeds, ageMin, ageMax }: UseFetchDogsParams) {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [totalDogs, setTotalDogs] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);

        const fetchDogs = async () => {
            try {
                const response = await getDogLists({ currentPage, sort, breeds, ageMin, ageMax });
                if (!response) {
                    setDogs([]);
                    setTotalDogs(0);
                } else {
                    setDogs(response.data);
                    setTotalDogs(Number(response.total));
                }
            } catch (error) {
                console.error("Error fetching dog list:", error);
                setDogs([]);
                setTotalDogs(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDogs();
    }, [currentPage, sort, breeds, ageMin, ageMax]);

    return { dogs, totalDogs, isLoading };
}