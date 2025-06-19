"use client"
import React, {useState, useRef} from 'react';
import { RxDashboard } from "react-icons/rx";
import { MdSettings } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";


function Adminnav() {
    const [isExpanded, setIsExpanded] = useState(true); // State for sidebar expansion
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Toggle dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Toggle sidebar expansion
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <div
            className={`font-poppins h-screen space-y-8 pl-6 pr-8 py-8 bg-black text-white transition-all duration-200 ${isExpanded ? "w-80" : "w-24"
            }`}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute bottom-4 p-2 bg-guidebg rounded-full hover:bg-guidebg-dark transition-colors text-whiteText"
            >
                {isExpanded ? <FaTimes className="text-24px"/> : <FaBars className="text-24px"/>}
            </button>

            {/* Logo */}
            <div className="text-24px font-bold pb-4">
                <a href="/" className="whitespace-nowrap">
                    {isExpanded ? "Management" : "MD"}
                </a>
            </div>

            {/* Navigation as */}
            <div className="text-18px">
                <ul className="space-y-8" >
                    {/* Dashboard */}
                    <li>
                        <a href="/admin/dashboard" className="flex items-center">
                            <RxDashboard className="text-24px mr-2"/> {isExpanded && "Dashboard"}
                        </a>
                    </li>

                    {/* Blogs */}
                    <li>
                        <a href="/admin/posts" className="flex items-center">
                            <GrArticle className="text-24px mr-2"/> {isExpanded && "Blogs"}
                        </a>
                    </li>

                    {/* Profile Dropdown */}
                    <li ref={dropdownRef} className="relative">
                        <a
                            href="/admin/profile" className="flex items-center"

                        >
                            <MdSettings className="text-24px mr-2"/> {isExpanded && "Profile"}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Adminnav;