"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";

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

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const [likeCount, setLikeCount] = useState<number>(0);
    const [commentCount, setCommentsCount] = useState<string[]>([]);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/post/${post.id}/likes`);
                setLikeCount(res.data.data.count);
            } catch (error) {
                console.error("Failed to fetch like count", error);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/post/${post.id}/comments`);
                const commentContents = res.data.data.comments.map((c: any) => c.content);
                setCommentsCount(res.data.data.count);
            } catch (error) {
                console.error("Failed to fetch comments", error);
            }
        };

        fetchLikes();
        fetchComments();
    }, [post.id]);

    return (
        <div className="border border-gray-300 p-4 rounded shadow">
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

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Likes: {likeCount}</p>

            </div>

        </div>
    );
};

export default BlogCard;
