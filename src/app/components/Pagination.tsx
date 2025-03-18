"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { ButtonProps, PaginationProps } from "@/lib/types";

const PAGE_SIZE = 25;
const POSSIBLE_MAX_TOTAL = 10000;
const MAX_PAGE_DISPLAY = 3;

const PreviousButton = ({ onClick, disabled }: ButtonProps) => (
    <button
        className="join-item btn btn-square btn-ghost mx-1 dark:text-gray-800 dark:hover:text-white"
        onClick={onClick}
        disabled={disabled}
    >
        <ChevronLeftIcon width={16} height={16} />
    </button>
);

const NextButton = ({ onClick, disabled }: ButtonProps) => (
    <button
        className="join-item btn btn-square btn-ghost mx-1 dark:text-gray-800 dark:hover:text-white"
        onClick={onClick}
        disabled={disabled}
    >
        <ChevronRightIcon width={16} height={16} />
    </button>
);

const PageSpreadButton = () => (
    <button className="join-item btn btn-square btn-ghost btn-disabled dark:text-gray-800">...</button>
);

const PageButton = ({ onClick, active, value }: ButtonProps) => (
    <button
        className={classNames("join-item btn btn-square btn-ghost rounded-sm mx-1 dark:text-gray-800 dark:hover:text-white", {
            "btn-active dark:text-white": active,
        })}
        onClick={onClick}
    >
        {value}
    </button>
);

// TODO: the logic to handle smaller page count needs to be implemented (when totalPages are 3, 4, or 5)
// TODO: implement a solution where the pagination would stay consistent & prevent shifting of buttons
const Pagination = ({ totalDogs, currentPage }: PaginationProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const calculatedTotalPages = Math.min(
            Math.ceil(totalDogs / PAGE_SIZE),
            POSSIBLE_MAX_TOTAL / PAGE_SIZE
        );
        setTotalPages(calculatedTotalPages);
    }, [totalDogs]);

    if (totalPages <= 1) {
        return <PageButton active={currentPage === 1} value={1} />;
    }

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    let startPage = Math.max(3, currentPage - Math.floor(MAX_PAGE_DISPLAY / 2));
    let endPage = Math.min(totalPages - 2, startPage + MAX_PAGE_DISPLAY - 1);

    if (endPage > totalPages - 2) {
        endPage = totalPages - 2;
        startPage = Math.max(3, endPage - MAX_PAGE_DISPLAY + 1);
    }

    const middlePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="join my-6 flex items-center">
            <PreviousButton
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
            />

            <PageButton onClick={() => goToPage(1)} value={1} active={currentPage === 1} />
            <PageButton onClick={() => goToPage(2)} value={2} active={currentPage === 2} />
            {startPage > 3 && <PageSpreadButton />}

            {middlePages.map((page) => (
                <PageButton
                    key={page}
                    active={currentPage === page}
                    onClick={() => goToPage(page)}
                    value={page}
                />
            ))}

            {endPage < totalPages - 2 && <PageSpreadButton />}

            <PageButton
                onClick={() => goToPage(totalPages - 1)}
                value={totalPages - 1}
                active={currentPage === totalPages - 1}
            />
            <PageButton
                onClick={() => goToPage(totalPages)}
                value={totalPages}
                active={currentPage === totalPages}
            />

            <NextButton
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </div>
    );
};

export default Pagination;
