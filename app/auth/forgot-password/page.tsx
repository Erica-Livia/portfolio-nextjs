"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast';

function Page() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const toastId = toast.loading('Sending reset link...');

        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/forgot-password', {
                email,
            });

            if (res.status === 200) {
                toast.success(res.data.message || "Reset link sent successfully!", { id: toastId });
                setIsSuccess(true);
                setTimeout(() => router.push("/login"), 10000);
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || "Failed to send reset link.";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Password Reset</h2>

                {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Please enter your email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray rounded-lg focus:outline-none"
                                disabled={isLoading}
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                                isLoading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
                            }`}
                        >
                            {isLoading ? "Processing..." : "Send Reset Link"}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-green-600 font-medium">
                            Request received! If an account with that email exists, we've sent it a link to reset your password.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            You will be redirected to the login page shortly.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;