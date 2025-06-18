"use client"
import React, { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";

type BlogCardProps = {
    post: {
        id: number;
        title: string;
        content: string;
        imageUrl: string;
        category: number;
        likes?: number;
        isPublished?: boolean;
    };
};



const BlogCard: React.FC<BlogCardProps> = ({ post}) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState("");


    return (
        <div className="border border-grey p-4 rounded shadow">
            <Link href={`/blog/${post.id}`}>
                <div className="block cursor-pointer">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        quality={100}
                        unoptimized={true}
                        className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="mb-2">{post.content.slice(0, 100)}...</p>
                </div>
            </Link>

            <p className="text-sm text-gray-500 mb-2">Likes: {post.likes || 0}</p>

            {showComments && (
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Comments</h4>
                    <div className="space-y-2 mb-2">
                        {comments.length > 0 ? (
                            comments.map((c, i) => (
                                <p key={i} className="text-sm text-gray-800 bg-gray-100 p-2 rounded">
                                    {c}
                                </p>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No comments yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogCard;
