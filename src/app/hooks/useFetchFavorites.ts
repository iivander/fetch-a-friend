import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {deleteFavoriteDog, fetchFavoritedDog, setFavoriteDog} from "@/lib/api";

export function useFetchFavorites() {
    const { data: session } = useSession();
    const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);

    useEffect(() => {
        const userId = session?.user?.id;
        if (!userId) return;

        const fetchFavorites = async () => {
            try {
                const favoriteDogIds = await fetchFavoritedDog(userId);
                if (favoriteDogIds.length > 0) {
                    setFavoriteDogIds(favoriteDogIds.map((fav) => fav));
                }
            } catch (error) {
                console.error("Error fetching favorite dogs:", error);
            }
        };

        fetchFavorites();
    }, [session]);

    const handleDogFavoriteClick = async (dogId: string) => {
        const userId = session?.user?.id;
        if (!userId) return;

        const isCurrentlyFavorited = favoriteDogIds.includes(dogId);
        const previousFavorites = [...favoriteDogIds];

        let updatedFavorites;
        if (isCurrentlyFavorited) {
            updatedFavorites = favoriteDogIds.filter((id) => id !== dogId);
            setFavoriteDogIds(updatedFavorites);

            const success = await deleteFavoriteDog(userId, dogId);
            if (!success) {
                setFavoriteDogIds(previousFavorites); // Revert state if request fails
                console.error("Unable to update favorite Dog");
            }
        } else {
            updatedFavorites = [...favoriteDogIds, dogId];
            setFavoriteDogIds(updatedFavorites);

            const success = await setFavoriteDog(userId, dogId);
            if (!success) {
                setFavoriteDogIds(previousFavorites); // Revert state if request fails
                console.error("Unable to update favorite Dog");
            }
        }
    };

    return { favoriteDogIds, handleDogFavoriteClick };
}