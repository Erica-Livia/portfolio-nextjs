import React from 'react';
import Adminnav from "@/components/Adminnav";
import Adminblogcard from "@/components/Adminblogcard";


function Page() {
    return (
        <>
            <div className="flex w-full flex-row align-items-center bg-gray">
                <Adminnav/>
                <div className="bg-gray min-h-screen text-white flex flex-col items-center pt-28 gap-8 w-full">
                    <div className="text-center">
                        <p className="text-48px">Blogs</p>
                        <p className="text-18px">Manage your blogs by editing,  </p>
                    </div>
                    <div className="flex flex-col gap-8 w-full px-8">
                        <Adminblogcard/>
                        <Adminblogcard/>
                    </div>
                </div>
            </div>

        </>

    );
}

export default Page;