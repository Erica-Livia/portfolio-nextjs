"use client";
import React, { useEffect, useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import Image from "next/image";

type User = {
    user: {
        id: number;
        name: string;
        email: string;
        role: "user" | "admin" | "superAdmin";
        avatarUrl?: string;
        createdAt: string;
    };
};

type DecodedToken = {
    id: number;
    email: string;
    iat: number;
    exp: number;
};

function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState<string | null>("profile");
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [isUpdatingName, setIsUpdatingName] = useState(false);
    const [isUpdatingImage, setIsUpdatingImage] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const confirmLogout = () => {
        setShowLogoutModal(true);
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/';
    };

    const toggleSection = (section: string) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    const router = useRouter();
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found, please log in.");
                    return;
                }

                const decoded = jwtDecode<DecodedToken>(token);
                const res = await axios.get(`http://127.0.0.1:8000/users/${decoded.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data.data);
                setName(res.data.data.user.name);
                setImagePreview(res.data.data.user.avatarUrl || null);

            } catch (err: any) {
                console.error(err);
                setError("Failed to fetch user data. Please try logging in again.");
                toast.error("Session may have expired. Please log in again.");
            } finally {
                setIsFetchingUser(false);
            }
        };

        fetchUser();
    }, []);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateName = async () => {
        if (!user || name === user.user.name) {
            toast.error("Name is unchanged.");
            return;
        }
        setIsUpdatingName(true);
        const toastId = toast.loading("Updating name...");
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`http://127.0.0.1:8000/users/${user.user.id}`, { name }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Name updated successfully!", { id: toastId });
            setUser(prev => prev ? { ...prev, user: { ...prev.user, name: name } } : null);
        } catch (err) {
            toast.error("Failed to update name.", { id: toastId });
        } finally {
            setIsUpdatingName(false);
        }
    };

    const handleUpdateImage = async () => {
        if (!imageFile) {
            toast.error("Please select an image first.");
            return;
        }
        setIsUpdatingImage(true);
        const toastId = toast.loading("Uploading image...");

        const formData = new FormData();
        formData.append("avatar", imageFile);

        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(`http://127.0.0.1:8000/users/${user?.user.id}/avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success("Profile image updated!", { id: toastId });
            setImagePreview(res.data.data.avatarUrl);
            setImageFile(null);
        } catch(err) {
            toast.error("Failed to upload image.", { id: toastId });
        } finally {
            setIsUpdatingImage(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmNewPassword } = passwordData;
        if (!currentPassword || !newPassword) {
            toast.error("Please fill out all password fields.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        setIsUpdatingPassword(true);
        const toastId = toast.loading("Changing password...");
        try {
            const token = localStorage.getItem("token");
            await axios.post(`http://127.0.0.1:8000/users/change-password`, {
                currentPassword,
                newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Password changed successfully!", { id: toastId });
            setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Failed to change password.", { id: toastId });
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    if (isFetchingUser) return <p className="text-center mt-10">Loading profile...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!user) return <p className="text-center mt-10">Could not load user profile.</p>;

    return (
        <div className="min-h-screen flex text-black">
            <aside className="w-1/5 bg-gray text-white flex flex-col items-center py-10 space-y-8">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                >
                    ← Go Back
                </button>


                <nav className="w-full text-start pl-4">
                    <ul className="space-y-4">
                        <li>
                            <button onClick={() => toggleSection("profile")} className="hover:underline">Profile
                            </button>
                        </li>
                        <li>
                            <button onClick={() => toggleSection("security")} className="hover:underline">Account &
                                Security
                            </button>
                        </li>
                        <li>
                            <button onClick={confirmLogout} className="hover:underline text-red-200">Logout</button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
                        <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setShowLogoutModal(false)}
                                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel
                            </button>
                            <button onClick={handleLogout}
                                    className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="w-4/5 bg-gray-100 p-10 space-y-6">
                <section id="profile" className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold w-full text-left mb-4">Profile Information</h2>
                    <div className="flex items-start gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Image
                                src={imagePreview || "/assets/erica.png"}
                                alt="Profile"
                                width={128}
                                height={128}
                                className="object-cover rounded-full w-32 h-32 border-4 border-gray-200"
                                unoptimized
                            />
                            <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" className="hidden"/>
                            <button onClick={() => imageInputRef.current?.click()} className="text-sm text-blue-600 hover:underline">Change Photo</button>
                            {imageFile && (
                                <button onClick={handleUpdateImage} disabled={isUpdatingImage} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:bg-gray-400">
                                    {isUpdatingImage ? "Uploading..." : "Save Photo"}
                                </button>
                            )}
                        </div>
                        <div className="flex-grow space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Username</label>
                                <div className="flex items-center gap-2">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" disabled={isUpdatingName} />
                                    <button onClick={handleUpdateName} disabled={isUpdatingName || name === user.user.name} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
                                        {isUpdatingName ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <input type="email" value={user.user.email} className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" disabled/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Account Created: {new Date(user.user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="security" className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold w-full text-left mb-4">Account & Security</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <p className="text-gray-600">Update your password to keep your account secure.</p>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Current Password</label>
                            <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})} className="border p-2 rounded w-full" required disabled={isUpdatingPassword} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">New Password</label>
                            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})} className="border p-2 rounded w-full" required disabled={isUpdatingPassword}/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Confirm New Password</label>
                            <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})} className="border p-2 rounded w-full" required disabled={isUpdatingPassword}/>
                        </div>
                        <button type="submit" disabled={isUpdatingPassword} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400">
                            {isUpdatingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </section>

            </main>
        </div>
    );
}

export default Page;

// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import axios, { AxiosError } from "axios";
// import { jwtDecode } from "jwt-decode";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { CiTrash } from "react-icons/ci";
// import Image from "next/image";
//
// type User = {
//     user: {
//         id: number;
//         name: string;
//         email: string;
//         role: "user" | "admin" | "superAdmin";
//         avatarUrl?: string;
//         createdAt: string;
//     };
// };
//
// type DecodedToken = {
//     id: number;
//     email: string;
//     iat: number;
//     exp: number;
// };
//
// function Page() {
//     const [user, setUser] = useState<User | null>(null);
//     const [error, setError] = useState("");
//     const [activeSection, setActiveSection] = useState<string>("profile");
//     const [showLogoutModal, setShowLogoutModal] = useState(false);
//     const [name, setName] = useState("");
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [passwordData, setPasswordData] = useState({
//         currentPassword: "",
//         newPassword: "",
//         confirmNewPassword: "",
//     });
//     const [isFetchingUser, setIsFetchingUser] = useState(true);
//     const [isUpdatingName, setIsUpdatingName] = useState(false);
//     const [isUpdatingImage, setIsUpdatingImage] = useState(false);
//     const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
//
//     const router = useRouter();
//     const imageInputRef = useRef<HTMLInputElement>(null);
//
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     setError("No token found, please log in.");
//                     return;
//                 }
//
//                 const decoded = jwtDecode<DecodedToken>(token);
//                 const res = await axios.get(`http://127.0.0.1:8000/users/${decoded.id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//
//                 setUser(res.data.data);
//                 setName(res.data.data.user.name);
//                 setImagePreview(res.data.data.user.avatarUrl || null);
//
//             } catch (err: any) {
//                 console.error(err);
//                 setError("Failed to fetch user data. Please try logging in again.");
//                 toast.error("Session may have expired. Please log in again.");
//             } finally {
//                 setIsFetchingUser(false);
//             }
//         };
//
//         fetchUser();
//     }, []);
//
//     const handleLogout = () => {
//         toast.success("Logged out successfully!");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setTimeout(() => window.location.href = "/login", 1000);
//     };
//
//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             setImageFile(file);
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };
//
//     const handleUpdateName = async () => {
//         if (!user || name === user.user.name) {
//             toast.error("Name is unchanged.");
//             return;
//         }
//         setIsUpdatingName(true);
//         const toastId = toast.loading("Updating name...");
//         try {
//             const token = localStorage.getItem("token");
//             await axios.put(`http://127.0.0.1:8000/users/${user.user.id}`, { name }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             toast.success("Name updated successfully!", { id: toastId });
//             setUser(prev => prev ? { ...prev, user: { ...prev.user, name: name } } : null);
//         } catch (err) {
//             toast.error("Failed to update name.", { id: toastId });
//         } finally {
//             setIsUpdatingName(false);
//         }
//     };
//
//     const handleUpdateImage = async () => {
//         if (!imageFile) {
//             toast.error("Please select an image first.");
//             return;
//         }
//         setIsUpdatingImage(true);
//         const toastId = toast.loading("Uploading image...");
//
//         const formData = new FormData();
//         formData.append("avatar", imageFile);
//
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.patch(`http://127.0.0.1:8000/users/${user?.user.id}/avatar`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//             toast.success("Profile image updated!", { id: toastId });
//             setImagePreview(res.data.data.avatarUrl);
//             setImageFile(null);
//         } catch(err) {
//             toast.error("Failed to upload image.", { id: toastId });
//         } finally {
//             setIsUpdatingImage(false);
//         }
//     };
//
//     const handlePasswordChange = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const { currentPassword, newPassword, confirmNewPassword } = passwordData;
//         if (!currentPassword || !newPassword) {
//             toast.error("Please fill out all password fields.");
//             return;
//         }
//         if (newPassword !== confirmNewPassword) {
//             toast.error("New passwords do not match.");
//             return;
//         }
//         setIsUpdatingPassword(true);
//         const toastId = toast.loading("Changing password...");
//         try {
//             const token = localStorage.getItem("token");
//             await axios.post(`http://127.0.0.1:8000/users/change-password`, {
//                 currentPassword,
//                 newPassword
//             }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             toast.success("Password changed successfully!", { id: toastId });
//             setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             toast.error(error.response?.data?.message || "Failed to change password.", { id: toastId });
//         } finally {
//             setIsUpdatingPassword(false);
//         }
//     };
//
//     if (isFetchingUser) return <p className="text-center mt-10">Loading profile...</p>;
//     if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
//     if (!user) return <p className="text-center mt-10">Could not load user profile.</p>;
//
//     return (
//         <div className="min-h-screen flex text-black">
//             <aside className="w-1/5 bg-gray text-white flex flex-col items-center py-10 space-y-8">
//
//             </aside>
//
//             {showLogoutModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
//                         <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
//                         <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
//                         <div className="flex justify-center gap-4">
//                             <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
//                             <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Yes, Logout</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             <main className="w-4/5 bg-gray-100 p-10 space-y-6">
//                 <section id="profile" className="bg-white rounded-xl shadow p-6">
//                     <h2 className="text-xl font-semibold w-full text-left mb-4">Profile Information</h2>
//                     <div className="flex items-start gap-8">
//                         <div className="flex flex-col items-center gap-4">
//                             <Image
//                                 src={imagePreview || "/assets/erica.png"}
//                                 alt="Profile"
//                                 width={128}
//                                 height={128}
//                                 className="object-cover rounded-full w-32 h-32 border-4 border-gray-200"
//                                 unoptimized
//                             />
//                             <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" className="hidden"/>
//                             <button onClick={() => imageInputRef.current?.click()} className="text-sm text-green hover:underline">Change Photo</button>
//                             {imageFile && (
//                                 <button onClick={handleUpdateImage} disabled={isUpdatingImage} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:bg-gray-400">
//                                     {isUpdatingImage ? "Uploading..." : "Save Photo"}
//                                 </button>
//                             )}
//                         </div>
//                         <div className="flex-grow space-y-4">
//                             <div>
//                                 <label className="text-sm font-medium text-gray-600">Username</label>
//                                 <div className="flex items-center gap-2">
//                                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" disabled={isUpdatingName} />
//                                     <button onClick={handleUpdateName} disabled={isUpdatingName || name === user.user.name} className="bg-green text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400">
//                                         {isUpdatingName ? "Saving..." : "Save"}
//                                     </button>
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="text-sm font-medium text-gray-600">Email</label>
//                                 <input type="email" value={user.user.email} className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" disabled/>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Account Created: {new Date(user.user.createdAt).toLocaleDateString()}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//
//                 <section id="security" className="bg-white rounded-xl shadow p-6">
//                     <h2 className="text-xl font-semibold w-full text-left mb-4">Account & Security</h2>
//                     <form onSubmit={handlePasswordChange} className="space-y-4">
//                         <p className="text-gray-600">Update your password to keep your account secure.</p>
//                         <div>
//                             <label className="text-sm font-medium text-gray-600">Current Password</label>
//                             <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})} className="border p-2 rounded w-full" required disabled={isUpdatingPassword} />
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-gray-600">New Password</label>
//                             <input type="password" name="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})} className="border p-2 rounded w-full" required disabled={isUpdatingPassword}/>
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-gray-600">Confirm New Password</label>
//                             <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})} className="border p-2 rounded w-full" required disabled={isUpdatingPassword}/>
//                         </div>
//                         <button type="submit" disabled={isUpdatingPassword} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400">
//                             {isUpdatingPassword ? "Updating..." : "Update Password"}
//                         </button>
//                     </form>
//                 </section>
//
//             </main>
//         </div>
//     );
// }
//
// export default Page;