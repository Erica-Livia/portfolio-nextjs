import React from 'react';

function Signup() {
    return (
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

                <div className="flex w-[300px] gap-2 pt-8">
                    <input type="checkbox" id="true" name="conditions" value="Yes"/>
                    <label htmlFor="conditions" className="text-[14px] leading-none items-center">By ticking this box, I
                        certify that I have read and understood the terms & conditions of this platfom.
                    </label>

                </div>

                <button
                    className="bg-gray w-full my-8 text-white border border-white px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-green hover:text-black hover:border-green cursor-pointer transition-colors duration-300">
                    <input type="submit" value="Register"/>
                </button>

            </form>
        </div>
    );
}

export default Signup;