import React from 'react'; 

function Page() {
    return (
        <div className="bg-gray min-h-screen flex flex-col lg:flex-row text-white items-center justify-evenly lg:justify-between text-24px px-20">
            <p className="text-48px text-center w-1/2">Hello there! Welcome to the Admin Management System</p>
            <div className=" w-1/2">
                <div className="flex items-center justify-center">
                    <button
                        className="bg-white w-44 text-black px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-gray hover:text-white hover:border  cursor-pointer transition-colors duration-700">
                        Login
                    </button>
                    <button
                        className="bg-gray w-44 text-white border border-white px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-white hover:text-black cursor-pointer transition-colors duration-700">
                        Register
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <form className="items-center">
                        <label htmlFor="fname" className="text-[16px] text-grey">First name</label><br/>
                        <input type="text" id="fname" name="fname"
                               className="bg-grey text-black text-[18px] w-90"/><br/>

                        <label htmlFor="lname" className="text-[16px] text-grey">Last name</label><br/>
                        <input type="text" id="lname" name="lname"
                               className="bg-grey text-black  text-[18px] w-90"/><br/>

                        <label htmlFor="lname" className="text-[16px] text-grey">Email</label><br/>
                        <input type="email" id="lname" name="lname"
                               className="bg-grey text-black  text-[18px] w-90"/><br/>

                        <label htmlFor="lname" className="text-[16px] text-grey">Password</label><br/>
                        <input type="text" id="lname" name="lname"
                               className="bg-grey text-black  text-[18px] w-90"/><br/>

                        <label htmlFor="lname" className="text-[16px] text-grey">Confirm Password</label><br/>
                        <input type="text" id="lname" name="lname"
                               className="bg-grey text-black  text-[18px] w-90"/><br/>

                        <input type="checkbox" id="true" name="conditions" value="Yes"/>
                        <label htmlFor="conditions" className="text-[14px] items-center w-inherit">By ticking this box, I certify that I have read and understood the terms & conditions of this platfom.</label>

                        <button className="bg-gray w-full my-8 text-white border border-white px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-green hover:text-black hover:border-green cursor-pointer transition-colors duration-300">
                            <input type="submit" value="Register" />
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Page;