import React from 'react';

type Experience = {
    title: string;
    institution: string;
    duration?: string;
    description?: string;
}

const Experiencecard:React.FC<Experience> = ({title, institution, duration, description}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="text-left">
                    <h3 className="text-white text-2xl md:text-4xl">{title}</h3>
                    <p className="text-grey text-lg md:text-18px">{institution}</p>
                    <p className="text-grey text-lg md:text-18px">{duration}</p>
                    <p className="text-grey text-lg md:text-18px">{description}</p>
                </div>
        </div>
    );
}

export default Experiencecard;