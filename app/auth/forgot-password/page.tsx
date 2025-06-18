"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

function Page() {
    const [formData, setFormData] = useState({ email: '' });
    const router = useRouter();
    const [status, setStatus] = useState<"normal" | "processing" | "success" | "error">("normal");
    const [message, setMessage] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("processing");
        setMessage("");

        try {
            const {email} = formData;
            const res = await axios.post('http://127.0.0.1:8000/auth/forgot-password', {
                email,
            });

            if (res.status === 200) {
                setStatus("success");
                setMessage("Check your email. We've sent you a link to reset your password.");
                setTimeout(() => router.push("/login"), 10000);
            }
        } catch (err: any) {
            setStatus("error");
            if (err.response?.data?.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage("Resetting password process failed.");
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Password Reset</h2>

                {status !== "success" && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Please enter your email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray rounded-lg focus:outline-none"
                                disabled={status === "processing"}
                            />
                        </div>

                        {status === "processing" && (
                            <div className="text-green text-sm text-center">Sending reset link...</div>
                        )}

                        {message && status === "error" && (
                            <div className="text-red-500 text-sm text-center">{message}</div>
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
                            {status === "processing" ? "Processing..." : "Send Reset Link"}
                        </button>
                    </form>
                )}

                {status === "success" && (
                    <div className="text-green-600 text-center font-medium mt-4">{message}</div>
                )}
            </div>
        </div>
    );
}

export default Page;
