"use client"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Adminnav from "@/components/Adminnav";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Superadminnav from "@/components/Superadminnav";


type Post = {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    likes?: number;
    category: number;
    isPublished: boolean;
};

type Comment = {
    id: number;
    content: string;
    user: {
        name: string;
    };
};


// --- REUSABLE MODAL COMPONENTS ---
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white text-black p-8 rounded-lg w-full max-w-xl relative max-h-[90vh]">
                <button className="absolute top-2 right-4 text-2xl" onClick={onClose}>✖</button>
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
    const [category, setCategory] = useState(post?.category?.toString() || "");
    const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");

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
                className="border p-2 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required className="border p-2 rounded-md">
                <option value="">Select a category</option>
                <option value="0">Technology</option>
                <option value="1">Education</option>
                <option value="2">Entertainment</option>
                <option value="3">Other</option>
            </select>
            <input
                className="border p-2 rounded-md"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
            />
            <textarea
                className="border p-2 rounded-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                rows={5}
                required
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors">
                {post ? "Update Post" : "Create Post"}
            </button>
        </form>
    );
}

// --- NEW VIEW POST MODAL COMPONENT ---
function ViewPostModal({ post, onClose }: { post: Post; onClose: () => void; }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            if (!post) return;
            setIsCommentsLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/post/${post.id}/comments`);
                setComments(response.data.data.comments || []);
            } catch (error) {
                toast.error("Failed to fetch comments for this post.");
            } finally {
                setIsCommentsLoading(false);
            }
        };

        fetchComments();
    }, [post]);

    const handleDeleteComment = async (commentId: number) => {
        if (!confirm("Are you sure you want to permanently delete this comment?")) return;

        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            await axios.delete(`http://127.0.0.1:8000/comments/${commentId}`, config);
            setComments(prevComments => prevComments.filter(c => c.id !== commentId));
            toast.success("Comment deleted.");
        } catch (error) {
            toast.error("Failed to delete comment.");
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
                <h2 className="text-3xl font-bold text-gray-900">{post.title}</h2>
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-lg" />}
                <div className="prose max-w-none">
                    <p>{post.content}</p>
                </div>

                <div className="border-t pt-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments ({comments.length})</h3>
                    {isCommentsLoading ? (
                        <p>Loading comments...</p>
                    ) : (
                        <div className="space-y-4">
                            {comments.length > 0 ? comments.map(comment => (
                                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start gap-4">
                                    <div>
                                        <p className="font-semibold">{comment.user?.name ?? 'Anonymous'}</p>
                                        <p className="text-gray-700">{comment.content}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                    >
                                        <MdDeleteOutline size={20} />
                                    </button>
                                </div>
                            )) : <p>No comments on this post yet.</p>}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}

// --- MAIN PAGE COMPONENT ---
function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingPost, setViewingPost] = useState<Post | null>(null);
    const [likes, setLikes] = useState(0);

    const fetchRecords = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/post/');
            setPosts(response.data.data.posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to fetch posts.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLikes = async (post: Post) => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/post/${post.id}/likes`);
            setLikes(data.data.count || 0);
        } catch (err) {
            console.error("Failed to fetch likes", err);
        }
    };

    const handleCreatePost = async (data: Omit<Post, "id" | "likes">) => {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.post("http://127.0.0.1:8000/post/create", data, config);
            toast.success("Post created successfully!");
            setShowCreateModal(false);
            fetchRecords();
        } catch (error) {
            toast.error("Failed to create post.");
        }
    };

    const handleEditPost = async (data: Omit<Post, "id" | "likes">) => {
        if (!editingPost) return;
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.put(`http://127.0.0.1:8000/post/${editingPost.id}`, data, config);
            toast.success("Post updated successfully!");
            setShowEditModal(false);
            setEditingPost(null);
            fetchRecords();
        } catch (error) {
            toast.error("Failed to update post.");
        }
    };

    const handleDeletePost = async (id: number) => {
        const role = localStorage.getItem("role");
        if (role !== "superAdmin") {
            toast.error("You are not authorized to delete posts.");
            return;
        }
        if (confirm("Are you sure you want to delete this post?")) {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                await axios.delete(`http://127.0.0.1:8000/post/${id}`, config);
                toast.success("Post deleted successfully.");
                fetchRecords();
            } catch (error) {
                toast.error("Failed to delete post.");
            }
        }
    };

    const togglePublish = async (post: Post) => {
        const role = localStorage.getItem("role");
        if (role !== "superAdmin") {
            toast.error("You are not authorized to change post status.");
            return;
        }
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const newStatus = !post.isPublished;
        try {
            await axios.put(`http://127.0.0.1:8000/post/${post.id}`, { isPublished: newStatus }, config);
            toast.success(newStatus ? "Post published!" : "Post unpublished.");
            fetchRecords();
        } catch (error) {
            toast.error("Failed to update post status.");
        }
    };

    const handleViewPost = (post: Post) => {
        setViewingPost(post);
        setShowViewModal(true);
    };

    useEffect(() => {
        fetchRecords();
        // fetchLikes(post());
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <div className="flex w-full bg-gray min-h-screen">
                <Superadminnav />
                <main className="flex-1 p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-white">Blogs Management</h1>
                        <button onClick={() => setShowCreateModal(true)} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-green-700 transition-colors">
                            Create a new Post
                        </button>
                    </header>

                    {isLoading ? (
                        <div className="text-center text-gray-500">Loading posts...</div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105">
                                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover"/>}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-xl font-bold text-gray-900 flex-1 pr-2">{post.title}</h2>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${post.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {post.isPublished ? "Published" : "Draft"}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{likes} Likes</p>
                                        <div className="flex-grow"></div>
                                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end items-center gap-2">
                                            <button onClick={() => handleViewPost(post)} className="p-2 text-gray-600 hover:text-green-700 hover:bg-gray-100 rounded-full">
                                                <FaEye size={22}/>
                                            </button>
                                            <button onClick={() => togglePublish(post)} className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors">
                                                {post.isPublished ? "Unpublish" : "Publish"}
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-green-700 hover:bg-gray-100 rounded-full" onClick={() => { setEditingPost(post); setShowEditModal(true); }}>
                                                <CiEdit size={22}/>
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-red-700 hover:bg-gray-100 rounded-full" onClick={() => handleDeletePost(post.id)}>
                                                <MdDeleteOutline size={22}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-16">
                            <h3 className="text-2xl font-semibold">No Posts Found</h3>
                            <p>Click "Create a new Post" to get started.</p>
                        </div>
                    )}
                </main>
            </div>

            {showCreateModal && (
                <Modal onClose={() => setShowCreateModal(false)}>
                    <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
                    <PostForm onSubmit={handleCreatePost} />
                </Modal>
            )}

            {showEditModal && editingPost && (
                <Modal onClose={() => { setShowEditModal(false); setEditingPost(null); }}>
                    <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
                    <PostForm post={editingPost} onSubmit={handleEditPost} />
                </Modal>
            )}

            {showViewModal && viewingPost && (
                <ViewPostModal
                    post={viewingPost}
                    onClose={() => {
                        setShowViewModal(false);
                        setViewingPost(null);
                    }}
                />
            )}
        </>
    );
}

export default Page;