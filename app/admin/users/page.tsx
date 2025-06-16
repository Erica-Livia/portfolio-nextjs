"use client";
import React, { useEffect, useState } from "react";
import Adminnav from "@/components/Adminnav";
import axios from "axios";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return setError("No token found");

            const res = await axios.get("http://127.0.0.1:8000/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(res.data.data);
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 403) {
                setError("Access forbidden: You don't have permission to view this data.");
            } else {
                setError("Failed to fetch users");
            }
        }
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://127.0.0.1:8000/users/${userId}`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchUsers();
        } catch (err) {
            console.error("Failed to update role", err);
            alert("Failed to update role");
        }
    };

    const handleDelete = async (userId: number) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:8000/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (err) {
            console.error("Failed to delete user", err);
            alert("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex w-full flex-row align-items-center bg-gray">
            <Adminnav />
            <div className="bg-gray min-h-screen text-white flex flex-col items-center px-16 gap-8 w-full">
                <h2 className="text-4xl font-bold text-start py-8">Users</h2>
                {error && <p className="text-red-500">{error}</p>}
                <table className="w-full table-auto border-collapse border border-white">
                    <thead>
                    <tr className="bg-gray text-white">
                        <th className="border border-white px-4 py-2">Number</th>
                        <th className="border border-white px-4 py-2">Name</th>
                        <th className="border border-white px-4 py-2">Email</th>
                        <th className="border border-white px-4 py-2">Role</th>
                        <th className="border border-white px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="text-center">
                            <td className="border border-white px-4 py-2">{index + 1}</td>
                            <td className="border border-white px-4 py-2">{user.name}</td>
                            <td className="border border-white px-4 py-2">{user.email}</td>
                            <td className="border border-white px-4 py-2">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="text-black bg-white px-2 py-1 rounded"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="border border-white px-4 py-2">
                                <button
                                    className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white font-bold"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Page;
