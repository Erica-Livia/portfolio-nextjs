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
    likedByCurrentUser?: boolean;
    likes?: number;
};

type Comment = {
    content: string;
    user: {
        id: number;
        name: string;
    };
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
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/post/${params.id}`, { headers });
                if (!data.data.post.isPublished) throw new Error("Post not published");
                setPost(data.data.post);
                setLikes(data.data.post.likes || 0);
                setLiked(data.data.post.likedByCurrentUser || false);
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
                setComments(data.data.comments);
            } catch (err) {
                console.error("Failed to fetch comments", err);
            }
        };

        const loadData = async () => {
            await Promise.all([fetchPost(), fetchLikes(), fetchComments()]);
            setLoading(false);
        };

        loadData();
    }, [params.id]);

    const handleLike = async () => {
        if (!token) {
            alert("Please login to like/unlike posts");
            return;
        }

        try {
            if (!liked) {
                await axios.post(`http://127.0.0.1:8000/post/${post?.id}/like`, {}, { headers });
                setLikes((prev) => prev + 1);
                setLiked(true);
            } else {
                await axios.delete(`http://127.0.0.1:8000/post/${post?.id}/like`, { headers });
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
            const { data } = await axios.post(
                `http://127.0.0.1:8000/post/${post?.id}/comment`,
                { content: trimmed },
                { headers }
            );
            setComments((prev) => [...prev, data.data.comment]);
            setNewComment("");
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to add comment");
        }
    };

    if (loading)
        return (
            <>
                <Navbar />
                <p className="text-center p-8 text-gray-600">Loading...</p>
            </>
        );

    if (error)
        return (
            <>
                <Navbar />
                <p className="text-center p-8 text-red-600">{error}</p>
            </>
        );

    if (!post) return null;

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8 mb-16 shadow-lg border border-gray-200">
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 px-4 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-800 rounded transition font-medium"
                >
                    ← Back
                </button>

                <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    unoptimized={true}
                    className="w-full h-64 object-cover rounded mb-6 shadow-sm"
                />

                <p className="whitespace-pre-wrap text-gray-800 mb-8 leading-relaxed">{post.content}</p>

                <div className="flex items-center mb-10 gap-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 text-2xl transition ${
                            liked ? "text-green-600 hover:text-green-800" : "text-gray-600 hover:text-green-500"
                        }`}
                        aria-label={liked ? "Unlike this post" : "Like this post"}
                    >
                        <CiHeart />
                        <span className="text-lg font-semibold">{likes}</span>
                    </button>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h2>

                    {comments.length === 0 ? (
                        <p className="mb-4 text-gray-500 italic">No comments yet. Be the first to comment!</p>
                    ) : (
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                            {comments.map((comment, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm"
                                >
                                    <p className="text-sm text-green-700 font-semibold mb-1">
                                        {comment.user.name}
                                    </p>
                                    <p className="text-gray-800">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-3 items-start mt-4">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition"
                        />
                        <button
                            onClick={handleAddComment}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition font-medium"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
