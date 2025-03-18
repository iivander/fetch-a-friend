"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MultiValue } from "react-select";
import { getDogBreeds } from "@/lib/api";
import dynamic from "next/dynamic";
import { ModalProps } from "@/lib/types";

// Dynamic import for React-Select due to SSR issues
const Select = dynamic(() => import("react-select"), { ssr: false });

// TODO: add Zip Code / Location filters
const FiltersModal = ({ modalId }: ModalProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [ageMin, setAgeMin] = useState<string>("");
    const [ageMax, setAgeMax] = useState<string>("");

    useEffect(() => {
        const fetchBreeds = async () => {
            const data = await getDogBreeds();
            if (data) {
                setBreeds(data);
            }
        };
        fetchBreeds();
    }, []);

    useEffect(() => {
        const breedParam = searchParams.get("breeds");
        const ageMinParam = searchParams.get("ageMin");
        const ageMaxParam = searchParams.get("ageMax");

        if (breedParam) {
            setSelectedBreeds(breedParam.split(","));
        }
        if (ageMinParam) {
            setAgeMin(ageMinParam);
        }
        if (ageMaxParam) {
            setAgeMax(ageMaxParam);
        }
    }, [searchParams]);

    const handleClose = () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const params = new URLSearchParams(searchParams);

        const filters: Record<string, string | string[] | null> = {
            breeds: selectedBreeds.length > 0 ? selectedBreeds.join(",") : null,
            ageMin: ageMin || null,
            ageMax: ageMax || null,
        };

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value.toString());
            } else {
                params.delete(key);
            }
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });

        handleClose();
    };

    const handleBreedChange = (
        newValue: MultiValue<{ value: string; label: string }> | unknown
    ) => {
        if (Array.isArray(newValue)) {
            setSelectedBreeds(newValue.map((option) => option.value));
        }
    };

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle" aria-modal="true">
            <form className="modal-box bg-white text-gray-800" onSubmit={handleSubmit}>
                <span className="font-bold text-lg" aria-labelledby="modal-title">
                    Filter Options
                </span>
                <div className="py-4 space-y-4 text-sm text-gray-700">
                    <label className="block">
                        Breed:
                        <Select
                            value={selectedBreeds?.map((breed) => ({ value: breed, label: breed }))}
                            onChange={handleBreedChange}
                            options={breeds?.map((breed) => ({ value: breed, label: breed }))}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            instanceId={modalId}
                            aria-label="Select dog breeds"
                        />
                    </label>
                    <label className="block">
                        Age Min:
                        <input
                            type="number"
                            name="ageMin"
                            value={ageMin}
                            onChange={(e) => setAgeMin(e.target.value)}
                            className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-gray-600"
                            min={0}
                            placeholder="Minimum age"
                            aria-label="Minimum age"
                        />
                    </label>
                    <label className="block">
                        Age Max:
                        <input
                            type="number"
                            name="ageMax"
                            value={ageMax}
                            onChange={(e) => setAgeMax(e.target.value)}
                            className="input input-bordered w-full dark:bg-white dark:text-gray-900 dark:border-gray-600"
                            min={Number(ageMin) || 0}
                            placeholder="Maximum age"
                            aria-label="Maximum age"
                        />
                    </label>
                </div>
                <div className="modal-action">
                    <button
                        type="button"
                        className="btn"
                        onClick={handleClose}
                        aria-label="Cancel filter options"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn" aria-label="Apply filter options">
                        Apply
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default FiltersModal;
