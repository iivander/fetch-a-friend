"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getDogLists } from "@/lib/api";
import Pagination from "@/app/components/Pagination";
import DogCard, { DogCardSkeleton } from "@/app/components/DogCard";
import { Dog } from "@/lib/types";
import SortDropdown, { SORT_OPTIONS } from "@/app/components/SortDropdown";
import FiltersModal from "@/app/components/FiltersModal";

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

    const [dogs, setDogs] = useState<Dog[]>([]);
    const [totalDogs, setTotalDogs] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);

        const fetchDogs = async () => {
            const response = await getDogLists({ currentPage, sort, breeds, ageMin, ageMax });
            if (!response) {
                setDogs([]);
                setTotalDogs(0);
            } else {
                setDogs(response.data);
                setTotalDogs(Number(response.total));
            }
            setIsLoading(false);
        };

        fetchDogs();
    }, [currentPage, sort, breeds, ageMin, ageMax]);

    const handleModalOpen = () => {
        const modal = document.getElementById("filtersDropdown") as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-orange-50 mt-16 pt-4">
            <div className="flex flex-row items-center justify-between w-full px-2">
                <button
                    className="btn btn-ghost"
                    onClick={handleModalOpen}
                    aria-label="Open filters modal"
                >
                    Filters
                </button>
                <SortDropdown />
            </div>

            <FiltersModal modalId="filtersDropdown" />
            <div
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 w-full px-4"
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
                          ))
                        : dogs?.map((dog: Dog) => (
                              <motion.div
                                  key={dog.id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                              >
                                  <DogCard {...dog} />
                              </motion.div>
                          ))}
                </AnimatePresence>
            </div>
            <Pagination totalDogs={totalDogs} currentPage={currentPage} />
        </div>
    );
};

export default MainContent;
