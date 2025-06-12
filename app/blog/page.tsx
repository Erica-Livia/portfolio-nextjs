import React from 'react';
import Navbar from "@/components/Navbar";
import Blogcard from "@/components/Blogcard";
import updatesData from "@/data/updates.json";
import Link from "next/link";


function Page() {
    return (
        <div>

            <Navbar/>
            <div>
                <div className="bg-gray flex flex-col justify-center items-center text-white min-h-96 gap-8 ">
                    <h2 className="text-48px text-center">Keep up with Erica's newest updates</h2>
                    <Link href={"/"}                    >
                        <button className="p-3 text-xl text-white cursor-pointer underline">Go Back to Home</button>
                    </Link>

                </div>
                <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-8">
                    {updatesData.map((update, index) =>
                        <Blogcard key={index} {... update}/>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Page;