import React from 'react';
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import Link from 'next/link';


type Blog = {
    title?: string;
    description1?: string;
    likes?: number;
}


const Blogcard:React.FC<Blog> = ({ title, description1 , likes}) => {
    return (
        <div className="w-fit flex-col space-y-6 container items-center border-b rounded-xl p-2">
            <Image src={""} alt={"Erica"} width={250} height={200} className="bg-grey"/>
            <h2 className="text-2xl">{title || "Title"}</h2>
            <p className="text-xl">{description1 || "Lorem Ipsum"}</p>

            <div className="flex justify-end gap-x-2 text-2xl items-center">
                <GoHeart className="cursor-pointer"/> <p className="text-lg">{likes || 2 }</p>
                <GoComment className="cursor-pointer"/>
                <IoIosShareAlt className="cursor-pointer"/>
            </div>

            <div className="flex justify-end">
                <Link href={"details"}></Link><button className="p-3 border bg-black text-white cursor-pointer rounded-2xl">View More</button>
            </div>
        </div>
    )
}

export default Blogcard;