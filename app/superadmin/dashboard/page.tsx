"use client";
import React, { useEffect, useState } from "react";
import Adminnav from "@/components/Superadminnav";
import { GrArticle } from "react-icons/gr";
import { LuUsers } from "react-icons/lu";
import { RiDraftLine } from "react-icons/ri";
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

                const usersRes = await axios.get("http://127.0.0.1:8000/users/", { headers });
                const postsRes = await axios.get("http://127.0.0.1:8000/post/", { headers });

                const users = usersRes.data.data;
                const posts = postsRes.data.data.posts;

                if (Array.isArray(posts)) {
                    const published = posts.filter((post: any) => post.isPublished).length;
                    const unpublished = posts.length - published;

                    setUsersCount(users.length);
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
        <div className="flex w-full flex-row bg-gray">
            <Adminnav />
            <div className="bg-gray min-h-screen text-white flex flex-col items-center px-16 pt-28 gap-8 w-full">
                <h2 className="text-4xl font-bold text-center">
                    Welcome Back <span className="text-green">Erica!</span>
                </h2>
                <p className="text-lg">How are we changing the world today?</p>

                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6 w-full text-green">
                    <div className="flex items-center justify-between border-2 p-8 px-12 rounded-3xl">
                        <div className="text-green text-48px">
                            <LuUsers/>
                        </div>
                        <div className=" flex-col items-center text-center">
                            <h2 className="text-2xl font-bold">Users</h2>
                            <p className="text-xl">{usersCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-2 p-8 px-8 rounded-3xl">
                        <div className="text-green text-48px">
                            <GrArticle/>
                        </div>
                        <div className=" flex-col items-center text-center">
                            <h2 className="text-2xl font-bold">Published</h2>
                            <p className="text-xl">{postsCount.published}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-2 p-8 px-12 rounded-3xl">
                        <div className="text-green text-48px">
                            <RiDraftLine />
                        </div>
                        <div className=" flex-col items-center text-center">
                            <h2 className="text-2xl font-bold">Drafts</h2>
                            <p className="text-xl">{postsCount.unpublished}</p>
                        </div>
                    </div>
                </div>

                {/* Optional: Recent posts preview */}
                <div className="mt-12 w-full">
                    <h3 className="text-2xl font-semibold mb-4">Recent Blog Posts</h3>
                    <ul className="space-y-2">
                        {recentPosts.map((post: any) => (
                            <li key={post.id} className="border border-grey p-4 rounded shadow-2xl text-white">
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
