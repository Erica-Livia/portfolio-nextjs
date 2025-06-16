"use client"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Adminnav from "@/components/Adminnav";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

type Post = {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    likes?: number;
    category: number;
    isPublished: boolean;
};

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-8 rounded-lg w-[90%] max-w-xl relative">
                <button className="absolute top-2 right-4 text-xl" onClick={onClose}>✖</button>
                {children}
            </div>
        </div>
    );
}

function PostForm({
                      post,
                      onSubmit,
                  }: {
    post?: Post;
    onSubmit: (formData: Omit<Post, "id" | "likes">) => void;
}) {
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
    const [category, setCategory] = useState(post?.category || "");
    const [imageUrl, SetImageUrl] = useState(post?.imageUrl || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            content,
            category: Number(category),
            imageUrl,
            isPublished: post?.isPublished || false
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                className="border p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select a category</option>
                <option value="0">Technology</option>
                <option value="1">Education</option>
                <option value="2">Entertainment</option>
                <option value="3">Other</option>
            </select>
            <input
                className="border p-2"
                value={imageUrl}
                onChange={(e) => SetImageUrl(e.target.value)}
                placeholder="Image URL"
            />
            <textarea
                className="border p-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                rows={5}
                required
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
                {post ? "Update Post" : "Create Post"}
            </button>
        </form>
    );
}

function Page() {
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

    // if (role !== "admin") {
    //     alert("You are not authorized to perform this action.");
    //     return;
    // }

    const [posts, setPosts] = useState<Post[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/post/');
            setPosts(response.data.data.posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleCreatePost = async (data: Omit<Post, "id" | "likes">) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.post("http://127.0.0.1:8000/post/create", data, config);
            setShowCreateModal(false);
            fetchRecords();
        } catch (error) {
            console.error("Create failed:", error);
        }
    };

    const handleEditPost = async (data: Omit<Post, "id" | "likes">) => {
        if (!editingPost) return;
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            await axios.put(`http://127.0.0.1:8000/post/${editingPost.id}`, data, config);
            setShowEditModal(false);
            setEditingPost(null);
            fetchRecords();
        } catch (error) {
            console.error("Edit failed:", error);
        }
    };

    const handleDelete = async (id: number) => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            alert("You are not authorized to delete posts.");
            return;
        }

        if (confirm("Are you sure you want to delete this post?")) {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            try {
                await axios.delete(`http://127.0.0.1:8000/post/${id}`, config);
                fetchRecords();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const togglePublish = async (id: number, currentStatus: boolean) => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            alert("You are not authorized to publish/unpublish posts.");
            return;
        }

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        try {
            await axios.put(
                `http://127.0.0.1:8000/post/${id}`,
                { isPublished: !currentStatus },
                config
            );
            fetchRecords();
        } catch (error) {
            console.error("Publish/unpublish failed:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="flex w-full bg-gray min-h-screen">
            <Adminnav />
            <div className="flex-1 text-white px-16">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Blogs</h1>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-gray w-fit my-8 text-white border border-white px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-green hover:text-black hover:border-green cursor-pointer transition-colors duration-300"
                    >
                        Create a new Post
                    </button>
                </div>

                <div className="overflow-auto">
                    <table className="min-w-full border border-white rounded-lg">
                        <thead>
                        <tr className="text-left text-gray-300">
                            <th className="p-3 border border-white">Title</th>
                            {/*<th className="p-3 border border-white">Category</th>*/}
                            <th className="p-3 border border-white">Likes</th>
                            <th className="p-3 border border-white">Status</th>
                            <th className="p-3 border border-white">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border border-white">
                                <td className="p-3 border border-white">{post.title}</td>
                                {/*<td className="p-3 border border-white">{post.category}</td>*/}
                                <td className="p-3 border border-white">{post.likes}</td>
                                <td className="p-3 border border-white">
                                    {post.isPublished ? (
                                        <span className="text-green-400">Published</span>
                                    ) : (
                                        <span className="text-yellow-400">Draft</span>
                                    )}
                                </td>
                                <td className="p-3 flex gap-2">
                                    {/*<button*/}
                                    {/*    className="px-3 py-1 rounded hover:bg-blue-600"*/}
                                    {/*    onClick={() => window.location.href = `/posts/view/${post.id}`}*/}
                                    {/*>*/}
                                    {/*    View*/}
                                    {/*</button>*/}
                                    <button
                                        className="px-3 py-1 rounded text-2xl"
                                        onClick={() => {
                                            setEditingPost(post);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        <CiEdit />
                                    </button>
                                    <button
                                        className="text-red-500 text-2xl px-3 py-1 rounded"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                    <button
                                        className="bg-green text-black px-3 py-1 rounded hover:bg-black hover:text-white cursor"
                                        onClick={() => togglePublish(post.id, post.isPublished)}
                                    >
                                        {post.isPublished ? "Unpublish" : "Publish"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {posts.length === 0 && (
                        <p className="text-center text-gray-400 mt-4">No posts found.</p>
                    )}
                </div>
            </div>

            {showCreateModal && (
                <Modal onClose={() => setShowCreateModal(false)}>
                    <h2 className="text-xl font-bold mb-4">Create New Post</h2>
                    <PostForm onSubmit={handleCreatePost} />
                </Modal>
            )}

            {showEditModal && editingPost && (
                <Modal onClose={() => {
                    setShowEditModal(false);
                    setEditingPost(null);
                }}>
                    <h2 className="text-xl font-bold mb-4">Edit Post</h2>
                    <PostForm post={editingPost} onSubmit={handleEditPost} />
                </Modal>
            )}
        </div>
    );
}

export default Page;