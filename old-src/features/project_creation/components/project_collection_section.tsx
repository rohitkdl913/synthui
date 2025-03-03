import { ReactNode } from "react";

const ProjectCollectionSections = ({ children }: { children: ReactNode }) => {
    return <div className="flex flex-col flex-6">
        <span className="font-bold text-xl">PROJECT COLLECTIONS</span>
        <div className="pl-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {children}
        </div>
    </div>
}


export default ProjectCollectionSections;