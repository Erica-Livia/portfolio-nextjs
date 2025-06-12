"use client"
import axios from "axios";
import React, {useEffect, useState} from 'react';
import Adminnav from "@/components/Adminnav";
import Link from "next/link";
import Adminblogcard from "@/components/Adminblogcard";

type Post = {
    title: string;
    content: string;
}
function Page() {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchRecords = async () => {
        const response = await axios.get('http://127.0.0.1:8000/post/');
        console.log("API Response:", response.data);
        setPosts(response.data.data.posts);
    }

    useEffect(() => {
        fetchRecords()
    }, [])
    // @ts-ignore
    return (
        <div className="flex w-full flex-row align-items-center bg-gray">
            <Adminnav/>
            <div className="bg-gray min-h-screen text-white flex flex-col items-center pt-28 gap-8 w-full">
                <div className="text-center">
                    <p className="text-48px">Blogs</p>
                    <Link href="/posts/create">Create a new Post</Link>
                    <p className="text-18px">Manage your blogs by editing, </p>
                </div>
                <div className="flex flex-col gap-8 w-full px-8">
                    {
                        posts.map((post, index) => (
                            <Adminblogcard key={index} {...post}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Page;