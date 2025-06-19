"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";
import { CiTrash } from "react-icons/ci";
import Image from "next/image";

type User = {
    user: any;
    id: number;
    name: string;
    email: string;
};

type DecodedToken = {
    id: number;
    email: string;
    iat: number;
    exp: number;
};

function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState<string | null>("profile");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const confirmLogout = () => {
        setShowLogoutModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/';
    };


    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found");
                    return;
                }

                const decoded = jwtDecode<DecodedToken>(token);
                const res = await axios.get(`http://127.0.0.1:8000/users/${decoded.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data.data);
                console.log(res.data.data);
            } catch (err: any) {
                console.error(err);
                setError("Failed to fetch user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const toggleSection = (section: string) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // @ts-ignore
    return (
        <div className="min-h-screen flex text-black">
            {/* Sidebar */}
            <aside className="w-1/5 bg-gray text-white flex flex-col items-center py-10 space-y-8">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                >
                    ← Go Back
                </button>

                <div>
                    <div className="rounded-full w-32 h-32 overflow-hidden border-4 border-white">
                        <Image
                            src="/assets/erica.png"
                            alt="Profile"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                            unoptimized
                        />
                    </div>

                </div>


                <nav className="w-full text-start pl-4">
                    <ul className="space-y-4">
                        <li><button onClick={() => toggleSection("profile")} className="hover:underline">Profile</button></li>
                        <li><button onClick={() => toggleSection("security")} className="hover:underline">Account & Security</button></li>
                        <li><button onClick={() => toggleSection("account")} className="text-red-400 hover:underline">Delete Account</button></li>
                        <li><button onClick={confirmLogout} className="hover:underline text-red-200">Logout</button></li>
                    </ul>
                </nav>
            </aside>

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
                        <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="w-4/5 bg-gray-100 p-10 space-y-6">
                {/* Profile Section */}
                <section id="profile" className="bg-white rounded-xl shadow p-6">
                    <button
                        onClick={() => toggleSection("profile")}
                        className="text-xl font-semibold w-full text-left"
                    >
                        Profile Information
                    </button>
                    {user?.user.role === "admin" && (
                        <span className="bg-green text-black text-xs px-3 py-1 rounded-full shadow-lg">Admin</span>
                    )}
                    {activeSection === "profile" && user && (
                        <div className="mt-4 space-y-4">
                            <p className="text-gray-600">Add and update your personal details.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder={`${user.user.name}`}
                                    value={user.user.name}
                                    className="border p-2 rounded w-full"
                                    disabled
                                />
                                <input
                                    type="email"
                                    placeholder={`${user.user.email}`}
                                    value={user.user.email}
                                    className="border p-2 rounded w-full"
                                    disabled
                                />
                            </div>
                            <div>
                                <p>Account Created at {user.user.createdAt}</p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Security Section */}
                <section id="security" className="bg-white rounded-xl shadow p-6">
                    <button
                        onClick={() => toggleSection("security")}
                        className="text-xl font-semibold w-full text-left"
                    >
                        Account Settings
                    </button>
                    {activeSection === "security" && (
                        <div className="mt-4 space-y-4">
                            <p className="text-gray-600">Update your password and secure your account.</p>
                            <input type="password" placeholder="Current Password" className="border p-2 rounded w-full" disabled />
                            <input type="password" placeholder="New Password" className="border p-2 rounded w-full" disabled />
                            <input type="password" placeholder="Confirm New Password" className="border p-2 rounded w-full" disabled />
                        </div>
                    )}
                </section>

                {/* Danger Zone */}
                <section id="account" className="bg-white rounded-xl shadow p-6">
                    <button
                        onClick={() => toggleSection("account")}
                        className="text-xl font-semibold w-full text-left text-red-600"
                    >
                        Danger Zone
                    </button>
                    {activeSection === "account" && (
                        <div className="mt-4">
                            <p className="text-gray-600">Permanently delete your account and all data.</p>
                            <button className="mt-4 flex items-center gap-2 text-red-500 hover:underline">
                                <CiTrash size={20} /> Delete my account
                            </button>
                        </div>
                    )}
                </section>


            </main>
        </div>
    );
}

export default Page;
