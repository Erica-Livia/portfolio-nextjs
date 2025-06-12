import React from 'react';
import Link from "next/link";

function Login() {
    return (
        <div className="flex flex-col items-center justify-center">
            <form className="items-center">

                <label htmlFor="lname" className="text-[16px] text-grey">Email</label><br/>
                <input type="email" id="lname" name="lname"
                       className="bg-grey text-black  text-[18px] w-90"/><br/>

                <label htmlFor="lname" className="text-[16px] text-grey">Password</label><br/>
                <input type="text" id="lname" name="lname"
                       className="bg-grey text-black  text-[18px] w-90"/><br/>

                <Link href="/admin/dashboard">
                    <button
                        className="bg-gray w-full my-8 text-white border border-white px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-green hover:text-black hover:border-green cursor-pointer transition-colors duration-300">
                        <input type="submit" value="Login"/>
                    </button>
                </Link>


            </form>
        </div>
    );
}

export default Login;