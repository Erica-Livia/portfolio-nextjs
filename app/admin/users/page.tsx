import React from 'react';
import Navbar from "@/components/Navbar";
import Adminnav from "@/components/Adminnav";

function Page() {
    return (
        <>
            <div className="flex w-full flex-row align-items-center bg-gray">
                <Adminnav/>
                <div className="bg-gray min-h-screen text-white flex flex-col items-center pt-28 gap-8 w-full">
                    <div className="text-center">
                        <h2 className="text-48px">Welcome Back <span className="text-green">Erica!</span></h2>
                        <p className="text-18px">How are we changing the world today?</p>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col justify-center items-center border-2 p-8 rounded-3xl">
                            <h2 className="text-24px">Users</h2>
                            <p className="text-18px font-bold">12</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 p-8 rounded-3xl">
                            <h2 className="text-24px">Blogs</h2>
                            <p className="text-18px font-bold">2</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 p-8 rounded-3xl">
                            <h2 className="text-24px">Activity</h2>
                            <p className="text-18px font-bold">0.5%</p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

export default Page;