import React from 'react';
import {CiEdit} from "react-icons/ci";
import {MdDeleteOutline} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

type Post = {
    title : string;
    content: string;
}

const Adminblogcard:React.FC<Post> = ({title, content}) => {
    return (
        <div className="flex border-2 p-8 rounded-3xl justify-between items-center w-full">
            <div className="flex flex-col justify-center items-start w-3/4">
                <h2 className="text-24px">{title}</h2>
                <p className="text-18px font-bold">{content}</p>
            </div>
            <div className="flex justify-between items-end text-4xl gap-6">
                <CiEdit className="hover:scale-109 cursor-pointer"/>
                <MdDeleteOutline className="text-red-500 hover:scale-109 cursor-pointer"/>
            </div>
        </div>
    );
}

export default Adminblogcard;