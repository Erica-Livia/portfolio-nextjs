"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function Page() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const [status, setStatus] = useState<"normal" | "processing" | "success" | "error">("normal");
    const [message, setMessage] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setStatus("processing");

        if (formData.newPassword !== formData.confirmNewPassword) {
            setStatus("error");
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/reset-password/${token}`, {
                newPassword: formData.newPassword,
            });

            if (res.status === 200) {
                setStatus("success");
                setMessage("Password updated successfully! Redirecting to login...");
                setTimeout(() => router.push("/login"), 8000);
            }

        } catch (err: any) {
            setStatus("error");
            if (err.response?.data?.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage("Reset password failed.");
            }
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
                            disabled={status === "processing"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg "
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
                            disabled={status === "processing"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {message && (
                        <p
                            className={`text-sm text-center mt-2 ${
                                status === "success" ? "text-green-600" : "text-red-500"
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={status === "processing"}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                            status === "processing"
                                ? "bg-white text-black cursor-not-allowed"
                                : "bg-gray text-white hover:bg-white hover:text-black cursor-pointer hover:border"
                        }`}
                    >
                        {status === "processing" ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Page;
