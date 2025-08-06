"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast';

function Page() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!token) {
            toast.error("Invalid or missing reset token. Please request a new link.");
            return;
        }

        setIsLoading(true);
        const toastId = toast.loading("Changing your password...");

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/reset-password/${token}`, {
                newPassword: formData.newPassword,
            });

            if (res.status === 200) {
                toast.success("Password updated successfully! Redirecting to login...", { id: toastId });
                setTimeout(() => router.push("/login"), 3000);
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || "Failed to reset password. The link may have expired.";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            required
                            disabled={isLoading} // 5. Use isLoading for disabled state
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                        {isLoading ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Page;