import React from 'react';
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import Link from 'next/link';


type Blog = {
    image: string;
    title?: string;
    caption?: string;
    likes?: number;
    link?: string;

}


const Blogcard:React.FC<Blog> = ({image, title, caption , likes, link}) => {
    return (
        <div className="w-fit flex-col space-y-6 container items-center border rounded-xl">
            <Image src={image} alt={"Erica"} width="0"
                   height="0"
                   sizes="100vw" className="bg-grey w-full h-96 object-cover mb-4 rounded"/>
            <div className="p-5">
                <div>
                    <h2 className="text-2xl pb-4">{title || "Title"}</h2>
                    <p className="text-xl">{caption || "Lorem Ipsum"}</p>
                </div>

                <div className="flex justify-end gap-x-2 text-2xl items-center py-8">
                <GoHeart className="cursor-pointer"/> <p className="text-lg">{likes || 2}</p>
                    <IoIosShareAlt className="cursor-pointer"/>
                </div>

                <div className="flex justify-end">
                    <Link href={link || "/blog"} target="_blank"
                         >
                        <button className="p-3 border bg-black text-white cursor-pointer rounded-2xl">View More</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Blogcard;