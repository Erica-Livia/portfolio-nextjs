"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { CiTrash } from "react-icons/ci";
import Image from "next/image";

function Page() {
    const router = useRouter();
    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white roundedflex w-full flex-row align-items-center">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-grey rounded hover:bg-gray-300 cursor-pointer"
                >
                    ← Go Back
                </button>
                <div className="min-h-screen text-black flex flex-col items-center w-full justify-evenly">
                    <div className="flex flex-col bg-grey justify-center items-center rounded-full w-60 h-60 overflow-hidden">
                        <Image src={"/assets/erica.png"} alt={"erica"} width={50} height={50} unoptimized={true} className="w-full " />
                    </div>
                    <div className="flex flex-col w-full justify-center items-center">

                        <div className="border border-black w-full">
                            <h2 className="text-[16px]">Erica-Livia Ingabire</h2>
                        </div>
                        <div className="border border-black w-full">
                            <h2 className="text-[16px]">ingabireericalivia@gmail.com</h2>
                        </div>
                        <div className="border border-black w-full">
                            <h2 className="text-[16px]">Change Password</h2>
                        </div>
                        <div className="border border-black w-full">
                            <h2 className="text-[16px]">jj</h2>
                        </div>
                        <div className="border border-black w-full">
                            <h2 className="text-[16px]">hh</h2>
                        </div>
                    </div>

                    <div>
                        <ul>
                            <li className="flex items-center gap-2 text-red-500"><CiTrash/> Delete my account</li>
                        </ul>
                    </div>
                </div>
            </div>

        </>

    );
}

export default Page;