import Image from "next/image";
import { Dog } from "@/lib/types";

export const DogCardSkeleton = () => (
    <div
        className="h-[386px] card bg-base-200 shadow-lg rounded-lg overflow-hidden animate-pulse w-auto m-2"
        data-testid="dog-card-skeleton"
    >
        <div className="h-64 w-full bg-gray-300"></div>
        <div className="w-full bg-base-300 z-10 p-4 flex flex-col gap-2">
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
        </div>
    </div>
);

const DogCard = ({ id, img, name, age, breed, zip_code }: Dog) => (
    <div
        id={`dog-card-${id}`}
        className="h-[386px] card bg-base-200 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105 w-auto m-2"
    >
        <div className="h-64 w-full relative overflow-hidden rounded-t-lg">
            <Image
                src={img}
                alt="dog image"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
            />
        </div>
        <div className="w-full bg-base-300 z-10 p-4 flex flex-col gap-1">
            <span className="font-semibold text-lg text-gray-800">{name}</span>
            <span className="text-sm text-gray-600">Age: {age}</span>
            <span className="text-sm text-gray-600">Breed: {breed}</span>
            <span className="text-sm text-gray-600">Zip Code: {zip_code}</span>
        </div>
    </div>
);

export default DogCard;
