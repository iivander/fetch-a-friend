"use client";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/app/components/Pagination";
import DogCard, { DogCardSkeleton } from "@/app/components/DogCard";
import { Dog } from "@/lib/types";
import SortDropdown, { SORT_OPTIONS } from "@/app/components/SortDropdown";
import FiltersModal from "@/app/components/FiltersModal";
import { useFetchDogs } from "@/app/hooks/useFetchDogs";
import { useFetchFavorites } from "@/app/hooks/useFetchFavorites";

const DEFAULT_PAGE = 1;

const MainContent = () => {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || DEFAULT_PAGE;
    const sort = searchParams.get("sort") || SORT_OPTIONS[0].value;

    const breeds: string | undefined = searchParams.get("breeds") || undefined;
    const ageMin: number | undefined = searchParams.get("ageMin")
        ? Number(searchParams.get("ageMin"))
        : undefined;
    const ageMax: number | undefined = searchParams.get("ageMax")
        ? Number(searchParams.get("ageMax"))
        : undefined;

    const { dogs, totalDogs, isLoading } = useFetchDogs({
        currentPage,
        sort,
        breeds,
        ageMin,
        ageMax,
    });
    const { favoriteDogIds, handleDogFavoriteClick } = useFetchFavorites();

    const handleFilterModalOpen = () => {
        const modal = document.getElementById("filtersModal") as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-orange-50 mt-16 pt-4 relative">
            <div className="flex flex-row items-center justify-between w-full px-2">
                <button
                    className="btn btn-ghost dark:text-gray-800 dark:hover:text-white transition-all duration-300"
                    onClick={handleFilterModalOpen}
                    aria-label="Open filters modal"
                >
                    Filters
                </button>
                <SortDropdown />
            </div>

            <FiltersModal modalId="filtersModal" />
            <div
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-1 mt-6 w-full px-4"
                aria-live="polite"
                aria-busy={isLoading}
            >
                <AnimatePresence mode="popLayout">
                    {isLoading
                        ? [...Array(25)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <DogCardSkeleton />
                            </motion.div>
                        )) : dogs?.map((dog: Dog) => (
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
            <Pagination totalDogs={totalDogs} currentPage={currentPage} />
        </div>
    );
};

export default MainContent;
