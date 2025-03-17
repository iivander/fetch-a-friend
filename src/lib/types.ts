export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

export interface DogListResponse {
    data: Dog[];
    total: number;
}

export interface DogFilters {
    breeds?: string;
    ageMin?: number;
    ageMax?: number;
    zipCodes?: string;
}

export interface DogSort {
    sort: string;
    size?: number;
    currentPage?: number;
}

export type DogFiltersAndSort = DogFilters & DogSort;

export interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    value?: number;
}

export interface PaginationProps {
    totalDogs: number;
    currentPage: number;
}

export interface ModalProps {
    modalId: string;
}