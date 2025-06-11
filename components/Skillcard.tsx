import React from 'react';
import { iconMap } from "@/utils/iconMap";

type Skill = {
    name: string;
    icon: string;
    years: string;
    level: string;
};


const Skillcard: React.FC<Skill> = ({name, icon, years, level}) => {
    const IconComponent = iconMap[icon];
    return (
        <div className="text-center">
            <IconComponent className="text-white text-5xl md:text-88px mb-4 mx-auto"/>
            <h2 className="text-white text-2xl md:text-24px">{name}</h2>
            <p className="text-grey text-lg md:text-18px">{years} of Experience</p>
            <p className="text-grey text-lg md:text-18px">{level}</p>
        </div>
    );
}

export default Skillcard;