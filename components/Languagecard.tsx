import React from 'react';

type Language_ = {
    language: string;
    level: string;
}

const Languagecard: React.FC<Language_> = ({language, level}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="text-center">
                    <h2 className="text-white text-2xl md:text-48px">{language}</h2>
                    <p className="text-grey text-lg md:text-18px">{level}</p>
                </div>
        </div>
    );
}

export default Languagecard;