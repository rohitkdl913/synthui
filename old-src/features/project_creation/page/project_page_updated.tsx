import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import ProjectSection from "../components/project_section";
import SidePanel from "../components/sidepanel";


const ProjectPageUpdated = () => {
    return (
        <div className="flex flex-col h-[100vh] w-full bg-(--main) text-(--text-color)">
            <Header></Header>
            <div className="flex flex-2 overflow-hidden"> {/* Ensure no overflow here */}
                <SidePanel />
                <div className="flex flex-6 foverflow-y-scroll"> {/* Only this part is scrollable */}
                    <ProjectSection />
                </div>
            </div>
        </div>
    );
}

export default ProjectPageUpdated;
