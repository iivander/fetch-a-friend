"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const TopNav = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLogoClicked, setIsLogoClicked] = useState(false);
    const [isUserClicked, setIsUserClicked] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 10);
            };

            window.addEventListener("scroll", handleScroll);

            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleLogoClick = () => {
        setIsLogoClicked(true);
        setTimeout(() => setIsLogoClicked(false), 200);
        router.push("/main");
    };

    const handleMainClick = () => router.push("/main");
    const handleFavoritesClick = () => router.push("/favorites");

    const handleUserClick = () => {
        setIsUserClicked(true);
        setTimeout(() => setIsUserClicked(false), 200);
    };

    const handleLogoutClick = () => signOut();

    return (
        <div
            className={classNames(
                "navbar fixed top-0 w-full z-50 px-2 shadow-sm transition-all duration-300 gap-2",
                isScrolled ? "bg-orange-200/70 backdrop-blur-md shadow-md" : "bg-orange-200"
            )}
        >
            <div className="flex-none">
                <Image
                    src="/fetch-logo.svg"
                    alt="Fetch"
                    width={150}
                    height={50}
                    onClick={handleLogoClick}
                    className={classNames(
                        "cursor-pointer transition-all duration-200 hover:scale-105",
                        isLogoClicked ? "scale-95 opacity-80" : "scale-100 opacity-100"
                    )}
                />
            </div>
            <div className="flex-none">
                <button
                    onClick={handleMainClick}
                    className="btn btn-square btn-ghost w-fit px-4 py-2 rounded-md dark:text-gray-800 dark:hover:text-white transition-all duration-300"
                    aria-label="Go to Main Page"
                >
                    Main
                </button>
            </div>
            <div className="flex-1">
                <button
                    onClick={handleFavoritesClick}
                    className="btn btn-square btn-ghost w-fit px-4 py-2 rounded-md dark:text-gray-800 dark:hover:text-white transition-all duration-300"
                    aria-label="Go to Favorites Page"
                >
                    Favorites
                </button>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className={classNames(
                            "btn btn-ghost btn-circle avatar transition-all duration-200 hover:scale-105",
                            isUserClicked ? "scale-95 opacity-80" : "scale-100 opacity-100"
                        )}
                        onClick={handleUserClick}
                    >
                        <div className="w-10 rounded-full flex items-center justify-center">
                            <Image
                                src="/user.svg"
                                alt="User"
                                width={50}
                                height={50}
                                className="transition-transform duration-300"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow transition-all duration-300"
                    >
                        <li>
                            <a onClick={handleLogoutClick}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
