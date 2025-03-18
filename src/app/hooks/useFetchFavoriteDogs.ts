import { useState, useEffect } from "react";
import { getFavoriteDogLists } from "@/lib/api";
import { Dog } from "@/lib/types";
import { useSession } from "next-auth/react";

export function useFetchFavoriteDogs() {
    const { data: session } = useSession();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const userId = session?.user?.id;
        if (!userId) return;

        setIsLoading(true);

        const fetchDogs = async () => {
            try {
                const response = await getFavoriteDogLists(userId);
                if (!response) {
                    setDogs([]);
                } else {
                    setDogs(response.data);
                }
            } catch (error) {
                console.error("Error fetching dog list:", error);
                setDogs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDogs();
    }, [session]);

    return { dogs, isLoading };
}
