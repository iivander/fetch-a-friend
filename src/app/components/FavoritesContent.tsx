"use client";
import {AnimatePresence, motion} from "framer-motion";
import DogCard, {DogCardSkeleton} from "@/app/components/DogCard";
import {Dog} from "@/lib/types";
import {useFetchFavorites} from "@/app/hooks/useFetchFavorites";
import { useFetchFavoriteDogs } from "@/app/hooks/useFetchFavoriteDogs";
import {useState} from "react";
import {getMatchedDog} from "@/lib/api";
import MatchModal from "@/app/components/MatchModal";

// TODO: Add Pagination to this page
const FavoritesContent = () => {
    const { favoriteDogIds, handleDogFavoriteClick } = useFetchFavorites();
    const { dogs, isLoading } = useFetchFavoriteDogs();

    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

    const handleMatchModalOpen = async () => {
        try {
            const data = (await getMatchedDog({ favoriteDogIds }))?.[0] || null;
            if (data) {
                setMatchedDog(data);
                const modal = document.getElementById("matchModal") as HTMLDialogElement | null;
                if (modal) modal.showModal();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-orange-50 pt-20 relative">
            <div className="flex justify-center px-4 w-full sm:w-fit">
                <button
                    className="w-full btn btn-outline btn-primary shadow-lg dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:text-gray-400 dark:disabled:border-gray-500"
                    onClick={handleMatchModalOpen}
                    aria-label="Open match modal"
                    disabled={favoriteDogIds.length === 0}
                >
                    Generate a Match
                </button>
            </div>
            <MatchModal data={matchedDog} modalId="matchModal" />
            {!isLoading && dogs.length === 0 && (
                <p className="text-center text-gray-600 col-span-full mt-4">
                    No favorite dogs found. Start adding some!
                </p>
            )}
            {isLoading || dogs.length > 0 && (
                <div
                    className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1 mt-6 w-full px-4"
                    aria-live="polite"
                    aria-busy={isLoading}
                >
                    <AnimatePresence mode="popLayout">
                        {isLoading
                            ? [...Array(10)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <DogCardSkeleton />
                                </motion.div>
                            ))
                            : dogs?.map((dog: Dog) => (
                                <motion.div
                                    key={dog.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <DogCard
                                        {...dog}
                                        isFavorite={favoriteDogIds.includes(dog.id)}
                                        onFavoriteClick={() => handleDogFavoriteClick(dog.id)}
                                    />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default FavoritesContent;