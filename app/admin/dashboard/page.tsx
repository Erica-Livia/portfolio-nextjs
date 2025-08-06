"use client";
import React, { useEffect, useState } from "react";
import Adminnav from "@/components/Adminnav";
import axios from "axios";

function Page() {
    const [usersCount, setUsersCount] = useState(0);
    const [postsCount, setPostsCount] = useState({ published: 0, unpublished: 0 });
    const [recentPosts, setRecentPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const postsRes = await axios.get("http://127.0.0.1:8000/post/", { headers });

                const posts = postsRes.data.data.posts;

                if (Array.isArray(posts)) {
                    const published = posts.filter((post: any) => post.isPublished).length;
                    const unpublished = posts.length - published;

                    setPostsCount({ published, unpublished });
                } else {
                    console.error("Posts is not an array:", posts);
                }

                setRecentPosts(posts.slice(0, 3));
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="flex w-full flex-row">
            <Adminnav />
            <div className="bg-white min-h-screen text-gray flex flex-col items-center px-16 pt-28 gap-8 w-full">
                <h2 className="text-4xl font-bold text-center">
                    Welcome Back <span className="text-gray">Admin!</span>
                </h2>
                <p className="text-lg">How are we changing the world today?</p>

                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
                    <div className="flex flex-col items-center border-2 p-8 rounded-3xl">
                        <h2 className="text-xl">Total Likes</h2>
                        <p className="text-lg font-bold">{usersCount}</p>
                    </div>
                    <div className="flex flex-col items-center border-2 p-8 rounded-3xl">
                        <h2 className="text-xl">Published Blogs</h2>
                        <p className="text-lg font-bold">{postsCount.published}</p>
                    </div>
                    <div className="flex flex-col items-center border-2 p-8 rounded-3xl">
                        <h2 className="text-xl">Unpublished Blogs</h2>
                        <p className="text-lg font-bold">{postsCount.unpublished}</p>
                    </div>
                </div>

                <div className="mt-12 w-full">
                    <h3 className="text-2xl font-semibold mb-4">Recent Blog Posts</h3>
                    <ul className="space-y-2">
                        {recentPosts.map((post: any) => (
                            <li key={post.id} className="border border-grey p-4 rounded shadow-2xl  text-gray">
                                <p className="font-bold">{post.title}</p>
                                <p className="text-sm text-gray-300">
                                    Status: {post.isPublished ? "Published" : "Unpublished"}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Page;
