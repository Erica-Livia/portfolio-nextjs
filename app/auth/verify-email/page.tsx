"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast'; // 1. Import toast

function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [pageStatus, setPageStatus] = useState<{
        status: "verifying" | "success" | "error";
        message: string;
    }>({
        status: "verifying",
        message: "Verifying your email, please wait..."
    });

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing verification token.");
            setPageStatus({
                status: "error",
                message: "The verification link is invalid or missing a token."
            });
            return;
        }

        const verificationPromise = axios.get(`http://127.0.0.1:8000/auth/verify-email/${token}`);

        toast.promise(
            verificationPromise,
            {
                loading: 'Verifying your email...',
                success: (res) => res.data.message || 'Email verified successfully!',
                error: (err: AxiosError<{ message: string }>) =>
                    err.response?.data?.message || 'Verification failed. The link may be invalid or expired.'
            }
        )
            .then((res) => {
                setPageStatus({ status: "success", message: res.data.message });
                setTimeout(() => {
                    router.push("/login");
                }, 3000); // Redirect after 3 seconds
            })
            .catch((err: AxiosError<{ message: string }>) => {
                setPageStatus({
                    status: "error",
                    message: err.response?.data?.message || "Verification failed. Please try signing up again."
                });
            });

    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                {pageStatus.status === "verifying" && (
                    <>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Verifying...</h2>
                        <p className="text-gray-700">{pageStatus.message}</p>
                    </>
                )}

                {pageStatus.status === "success" && (
                    <div className="text-green-600">
                        <h2 className="text-2xl font-semibold mb-2">Success!</h2>
                        <p>{pageStatus.message}</p>
                        <p className="mt-4 text-sm text-gray-500">You will be redirected to the login page shortly...</p>
                    </div>
                )}

                {pageStatus.status === "error" && (
                    <div className="text-red-600">
                        <h2 className="text-2xl font-semibold mb-2">Verification Failed</h2>
                        <p>{pageStatus.message}</p>
                        <button
                            onClick={() => router.push("/signup")}
                            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Go to Signup
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;