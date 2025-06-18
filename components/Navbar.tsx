"use client";
import React, { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div className="navbar bg-black text-white px-8 xl:px-32 sm:px-4 py-6">
            <div className="md:flex text-center md:justify-between text-2xl md:text-18px  border-none space-y-2">
                <div className="text-24px sm:text-center">
                    <a href="/">ericalivia</a>
                </div>
                <div className="flex justify-between items-center gap-8">
                    <ul className="list-none text-24px flex space-x-8 mt-0 sm:mt-0 justify-center">
                        <li>
                            <a
                                href="https://github.com/Erica-Livia/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SiGithub />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/erica-livia/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://x.com/BurundianLivia"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter />
                            </a>
                        </li>
                    </ul>

                    {!isLoggedIn ? (
                        <a href="/login">
                            <button className="w-44 px-6 py-1 rounded-xl text-[18px] font-bold transition-colors duration-700 bg-gray text-white border border-white hover:bg-white hover:text-black cursor-pointer">
                                Sign In
                            </button>
                        </a>
                    ) : (
                        <div className="flex items-center justify-between">
                            <a href="/profile"><CgProfile/></a>
                            <button
                                onClick={handleLogout}
                                className="w-fit px-6 py-1 rounded-xl text-[16px] font-bold transition-colors duration-700 text-red-500 hover:text-white cursor-pointer"

                            >
                                {/*<IoIosLogOut/>*/}
                                Log Out
                            </button>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
