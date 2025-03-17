"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classnames";

const LoginForm = () => {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setIsLoading(true);

        const response = await signIn("credentials", {
            name,
            email,
            redirect: false,
        });

        if (!response?.error) {
            router.push("/main");
        } else {
            setError(true);
            setIsLoading(false);
        }
    };

    // Add some sort of background image of dogs...?
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
            <div className="card w-80 p-6 bg-white shadow-md text-gray-800">
                <h1 className="text-xl font-bold mb-4 text-center" aria-labelledby="login-title">
                    Sign In
                </h1>
                <form onSubmit={handleSubmit}>
                    <label className="floating-label" htmlFor="login-name">
                        <span>Name</span>
                        <input
                            id="login-name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            aria-required="true"
                            className="input input-info w-full validator mb-4"
                        />
                    </label>
                    <label className="floating-label" htmlFor="login-email">
                        <span>Email</span>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-required="true"
                            className="input input-info w-full validator"
                        />
                    </label>
                    <p
                        id="login-error-message"
                        className={classNames(
                            "text-xs text-red-500 transition-opacity cursor-default my-2",
                            error ? "opacity-100" : "opacity-0"
                        )}
                        role="alert"
                    >
                        Invalid name or email
                    </p>
                    <button
                        id="login-button"
                        type="submit"
                        className={classNames("btn btn-info w-full", isLoading && "btn-disabled")}
                        disabled={isLoading}
                        aria-busy={isLoading}
                        aria-disabled={isLoading}
                    >
                        Sign In
                        {isLoading && (
                            <span className="loading loading-spinner loading-xs" role="status" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
