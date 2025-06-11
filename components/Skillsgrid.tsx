import React from 'react';
import Skillcard from "@/components/Skillcard";
import skillData from "@/data/skills.json";

function Skillsgrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 pb-16 border-b">
            {skillData.map((skill: any, index: any) => (
                <Skillcard key={index} {...skill} />
            ))}
        </div>
    );
}

export default Skillsgrid;