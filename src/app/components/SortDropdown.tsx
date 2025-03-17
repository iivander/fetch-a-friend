"use client";
import { ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const SORT_OPTIONS = [
    { label: "Breed (A-Z)", value: "breed:asc" },
    { label: "Breed (Z-A)", value: "breed:desc" },
    { label: "Name (A-Z)", value: "name:asc" },
    { label: "Name (Z-A)", value: "name:desc" },
    { label: "Age (Youngest - Oldest)", value: "age:asc" },
    { label: "Age (Oldest - Youngest)", value: "age:desc" },
];

const SortDropdown = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentSort = searchParams.get("sort") || SORT_OPTIONS[0].value;

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        const params = new URLSearchParams(searchParams);
        params.set("sort", newSort);

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <label className="flex items-center">
            <span className="text-sm font-semibold whitespace-nowrap mr-4">Sort By:</span>
            <select
                value={currentSort}
                onChange={handleSortChange}
                className="select bg-transparent border border-gray-300 rounded-md px-3 py-2 text-sm outline-none shadow-sm w-[200px]"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SortDropdown;
