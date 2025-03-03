import { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "../model/project";



interface ProjectContextType {
    projects: Project[];
    recentProjects: Project[];
    setProjects: (projects: Project[]) => void;
    setRecentProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);

    const addProject = (project: Project) => {
        setProjects([...projects, project])
    }
    return (
        <ProjectContext.Provider value={{ projects, recentProjects, setProjects, setRecentProjects, addProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
