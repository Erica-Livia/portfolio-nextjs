"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import axios from "axios";
import BlogCard from "@/components/Blogcard";

type Post = {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    category: number;
    likes?: number;
    isPublished?: boolean;
};

function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = [
        { label: "All", value: "all" },
        { label: "Technology", value: "0" },
        { label: "Education", value: "1" },
        { label: "Entertainment", value: "2" },
        { label: "Other", value: "3" },
    ];

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/post/");
            const fetchedPosts = response.data.data.posts;
            const publishedPosts = fetchedPosts.filter((post: Post) => post.isPublished);
            setPosts(publishedPosts);
            setFilteredPosts(publishedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === "all") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter((post) => String(post.category) === category));
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <div className="bg-gray flex flex-col justify-center items-center text-white min-h-96 gap-8">
                    <h2 className="text-48px text-center">Keep up with Erica's newest updates</h2>
                    <Link href={"/"}>
                        <button className="p-3 text-xl text-white cursor-pointer underline">Go Back to Home</button>
                    </Link>
                </div>

                <div className="flex justify-center mt-6">
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <p className="text-center py-8">Loading posts...</p>
                ) : (
                    <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-8">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <BlogCard key={post.id} post={post}/>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">No published posts found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;
