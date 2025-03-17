import Image from "next/image";
import { Dog } from "@/lib/types";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

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

interface DogCardProps extends Dog {
    isFavorite?: boolean;
    onFavoriteClick?: (id: string) => void;
}

const DogCard = ({ id, img, name, age, breed, zip_code, isFavorite, onFavoriteClick }: DogCardProps) => {
    const handleDogFavoriteClick = () => {
        if (onFavoriteClick) {
            onFavoriteClick(id);
        }
    }

    return (
        <div
            id={`dog-card-${id}`}
            className="h-[386px] card bg-base-200 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105 w-auto m-2 relative"
        >
            <div className="h-64 w-full relative overflow-hidden rounded-t-lg">
                {img && (
                    <Image
                        src={img}
                        alt="dog image"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                )}
            </div>
            <div className="w-full bg-base-300 z-10 p-4 flex flex-col gap-1">
                <span className="font-semibold text-lg text-gray-800">{name}</span>
                <span className="text-sm text-gray-600">Age: {age}</span>
                <span className="text-sm text-gray-600">Breed: {breed}</span>
                <span className="text-sm text-gray-600">Zip Code: {zip_code}</span>
            </div>
            {onFavoriteClick && (
                <button
                    onClick={handleDogFavoriteClick}
                    className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg z-[99] btn btn-circle"
                >
                    <AnimatePresence mode="wait">
                        {isFavorite ? (
                            <motion.div
                                key="solid-heart"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SolidHeartIcon className="h-6 w-6 text-red-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="outline-heart"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <OutlineHeartIcon className="h-6 w-6 text-gray-400" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            )}
        </div>
    );
}

export default DogCard;
