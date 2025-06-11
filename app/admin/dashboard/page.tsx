import React from 'react';

function Page() {
    return (
        <div className="bg-gray min-h-screen text-white flex items-center justify-center">
            <div className="flex gap-8">
                Admin Dashboard
                <div className="flex flex-col justify-center items-center border-2 p-8 rounded-3xl">
                    <h2 className="text-24px">Users</h2>
                    <p className="text-18px font-bold">12</p>
                </div>
                <div className="flex flex-col justify-center items-center border-2 p-8 rounded-3xl">
                    <h2 className="text-24px">Users</h2>
                    <p className="text-18px font-bold">12</p>
                </div>
                <div className="flex flex-col justify-center items-center border-2 p-8 rounded-3xl">
                    <h2 className="text-24px">Users</h2>
                    <p className="text-18px font-bold">12</p>
                </div>
            </div>
        </div>
    );
}

export default Page;