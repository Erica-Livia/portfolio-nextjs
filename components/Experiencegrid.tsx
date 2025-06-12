"use client"
import React, {useState} from 'react';
import experienceData from "@/data/experience.json";
import languageData from "@/data/languages.json";
import educationData from "@/data/education.json";
import activityData from "@/data/activities.json";
import Experiencecard from "@/components/Experiencecard";
import Languagecard from "@/components/Languagecard";

function Experiencegrid() {
    const [activeSection, setActiveSection] = useState("experience");    return (
        <div className="py-16 pb-24 mx-auto">
            {/*    Navigation between the different section in experience */}
            <div className="flex justify-center mb-8">
                <div className="block md:hidden relative">
                    <select onChange={(e) => setActiveSection(e.target.value)}
                            className="text-lg md:text-18px bg-black text-white border border-gray-600 rounded px-4 py-2">
                        <option value="experience" className="text-grey">Experience</option>
                        <option value="education" className="text-grey">Education</option>
                        <option value="extracurricular" className="text-grey">Extracurricular</option>
                        <option value="languages" className="text-grey">Languages Spoken</option>

                    </select>
                </div>
                <nav className="hidden md:flex space-x-8 text-lg md:text-18px">
                    <button onClick={() => setActiveSection("experience")}
                            className={`text-white ${activeSection === "experience" && "border-b-2 border-green"}`}>Experience
                    </button>
                    <button onClick={() => setActiveSection("education")}
                            className={`text-white ${activeSection === "education" && "border-b-2 border-green"}`}>Education
                    </button>
                    <button onClick={() => setActiveSection("extracurricular")}
                            className={`text-white ${activeSection === "extracurricular" && "border-b-2 border-green"}`}>Extracurricular
                    </button>
                    <button onClick={() => setActiveSection("languages")}
                            className={`text-white ${activeSection === "languages" && "border-b-2 border-green"}`}>Languages
                        Spoken
                    </button>
                </nav>
            </div>


            {/* Display of the experiences and other info  */}

            <div className="py-8">
                {activeSection === "experience" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        {experienceData.map((experience, index) => (
                            <Experiencecard
                                key={index}
                                {... experience}
                            />
                        ))}
                    </div>
                )}
                {activeSection === "languages" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        {languageData.map((language: any, index) => (
                            <Languagecard
                                key={index}
                                {...language}
                            />
                        ))}
                    </div>
                )}
                {activeSection === "education" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        {educationData.map((experience, index) => (
                            <Experiencecard
                                key={index}
                                {... experience}
                            />
                        ))}
                    </div>
                )}
                {activeSection === "extracurricular" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        {activityData.map((experience, index) => (
                            <Experiencecard
                                key={index}
                                {... experience}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default Experiencegrid;