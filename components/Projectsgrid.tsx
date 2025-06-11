import React from 'react';
import Projectcard from "@/components/Projectcard";
import projectData from "@/data/projects.json";

function Projectsgrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-8">
            {projectData.map((project: any, index: any) => (
                <Projectcard
                    key={index}
                    {... project}
                />
            ))}
        </div>
    );
}

export default Projectsgrid;