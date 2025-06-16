"use client";
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Link from 'next/link';

type Post = {
    title: string;
    content: string;
}

function Page() {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchRecords = async () => {
        const response = await axios.get('http://127.0.0.1:8000/post');
        console.log("API Response:", response.data);
        setPosts(response.data.data.posts);
    }

    useEffect(() => {
        fetchRecords()
    }, [])

    return (
        <div>
            <div>
                <h1> Blog Post</h1>
                <Link href='/posts/crate'>Create New Post</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                    <th>Title</th>
                    <th>Content</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        posts.map((post, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>
                                <button></button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
    </div>
    );
};

export default Page;