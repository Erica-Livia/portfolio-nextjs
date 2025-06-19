"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { CiHeart } from "react-icons/ci";
import axios from "axios";

type Post = {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    category: number;
    isPublished?: boolean;
};

type Params = {
    params: { id: string };
};

export default function BlogDetailPage({ params }: Params) {
    const router = useRouter();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/post/${params.id}`, {
                    headers,
                });
                if (!data.data.post.isPublished) {
                    throw new Error("Post not published");
                }
                setPost(data.data.post);
                setLikes(data.data.post.likes || 0);
                setLiked(data.data.post.likedByCurrentUser || true);
            } catch (err: any) {
                setError(err.message);
            }
        };

        const fetchLikes = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/post/${params.id}/likes`);
                setLikes(data.data.count || 0);
            } catch (err) {
                console.error("Failed to fetch likes", err);
            }
        };

        const fetchComments = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/post/${params.id}/comments`);
                const loaded = data.data.comments.map((c: any) => c.content);
                setComments(loaded);
            } catch (err) {
                console.error("Failed to fetch comments", err);
            }
        };

        fetchPost();
        fetchLikes();
        fetchComments();
        setLoading(false);
    }, [params.id]);

    const handleLike = async () => {
        if (!token) {
            alert("Please login to like/unlike posts");
            return;
        }

        try {
            if (!liked) {
                await axios.post(
                    `http://127.0.0.1:8000/post/${post?.id}/like`,
                    {},
                    { headers }
                );
                setLikes((prev) => prev + 1);
                setLiked(true);
            } else {
                await axios.delete(`http://127.0.0.1:8000/post/${post?.id}/like`, {
                    headers,
                });
                setLikes((prev) => Math.max(prev - 1, 0));
                setLiked(false);
            }
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to toggle like");
        }
    };


    const handleAddComment = async () => {
        const trimmed = newComment.trim();
        if (!trimmed) return;

        if (!token) {
            alert("Please login to comment");
            return;
        }

        try {
            await axios.post(
                `http://127.0.0.1:8000/post/${post?.id}/comment`,
                { content: trimmed },
                { headers }
            );

            setComments((prev) => [...prev, trimmed]);
            setNewComment("");
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to add comment");
        }
    };

    if (loading) return (<><p className="text-center p-8"><Navbar/></p></>
);
if (error) return
    <p className="text-center p-8 text-red-600">{error}</p>;
    if (!post) return null;

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded mt-8 mb-16">
                <button
                    onClick={() => router.back()}
                    className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    ← Go Back
                </button>

                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    unoptimized={true}
                    className="w-full h-64 object-cover rounded mb-6"
                />

                <p className="whitespace-pre-wrap text-gray-800 mb-8">{post.content}</p>

                <div className="flex items-center mb-6 gap-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 text-2xl ${
                            liked ? "text-red-600 hover:text-red-800" : "text-gray-600 hover:text-red-500"
                        }`}
                        aria-label={liked ? "Unlike this post" : "Like this post"}
                    >
                        <CiHeart/>
                        <span className="text-lg font-semibold">{likes}</span>
                    </button>

                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    {comments.length === 0 && (
                        <p className="mb-4 text-gray-500">No comments yet. Be the first to comment!</p>
                    )}
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                        {comments.map((comment, i) => (
                            <p
                                key={i}
                                className="bg-gray-100 rounded p-3 text-gray-700 border border-gray-300"
                            >
                                {comment}
                            </p>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border border-gray rounded px-3 py-2 focus:outline-none"
                        />
                        <button
                            onClick={handleAddComment}
                            className="bg-green text-black px-5 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
