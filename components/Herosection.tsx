import React from 'react';
import Image from "next/image";


function Herosection() {
    return (
        <div
            className="flex flex-col-reverse md:flex-row items-center -mt-2 pb-12 border-b border-grey border-t-none w-full">
            {/* Introduction */}
            <div
                className="flex-row w-full lg:w-full justify-center md:justify-between text-center md:text-start space-y-8">
                <h2 className="text-white text-4xl lg:text-88px md:text-48px mb-4 ">Nice to meet you!
                    I'm <span className="border-b-4 border-green">Erica-Livia.</span>
                </h2>
                <p className="text-grey text-lg md:text-18px w-full md:w-4/6">Based in Kigali, I’m a
                    front-end developer
                    passionate about building accessible web apps that users love.</p>

                <button className="text-white border-b border-b-green pb-2 hover:text-green mt-4 md:mt-0 ">
                    <a href="#contact">CONTACT
                        ME</a>
                </button>
            </div>
            {/* Picture */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-items-end lg:justify-center">
                <Image src={'/assets/erica.png'} alt="erica" width={100} height={100}
                     className="w-52 h-fit bg-darkGrey lg:w-96 md:w-96 mb-8 lg:pb-0"/>
            </div>
        </div>
    );
}

export default Herosection;