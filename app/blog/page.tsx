import React from 'react';
import Navbar from "@/components/Navbar";
import Blogcard from "@/components/Blogcard";

const blogData = [
    {
        title: "Blog",
        description: "Lorem Ipsum",
        likes: 1,
    },
    {
        title: "Blog",
        description: "Lorem Ipsum",
        likes: 1,
    }
    ,
    {
        title: "Blog",
        description: "Lorem Ipsum",
        likes: 1,
    }
]

function Page() {
    return (
        <div>

            <Navbar/>
            <div>
                <div className="bg-gray flex flex-col justify-center items-center text-white min-h-96 gap-8 ">
                    <h2 className="text-24px text-center">Keep up with Erica's newest updates</h2>
                    <p className="text-18px underline cursor-pointer">View the newest</p>

                </div>
                <div className="flex flex-col md:flex-row justify-center items-center min-h-96 gap-8">
                    {blogData.map((blog, index) => (
                        <Blogcard  key={index} {... blog} />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Page;