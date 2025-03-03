import { useState, useEffect } from "react";
import APIRoute from "../../../api_route";
import { Project } from "../..//model/project";
import { useProject } from "../../provider/project_provider";

export const useProjectList = () => {
    const { projects, setProjects, recentProjects, setRecentProjects } = useProject();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(APIRoute.project)
            .then((response) => response.json())
            .then((data) => {
                const updatedProjects = data.data.map((p: any) => ({
                    ...p,
                    thumbnail: `${APIRoute.streamThumbnail}/${p.id}`,
                }));
                setProjects(updatedProjects);
                setLoading(false);

                updatedProjects.forEach((project: Project) => {
                    if (!project.status) startSSE(project.id);
                });
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (projects.length) {
            projects.forEach((project: Project) => {
                if (!project.status) {
                    startSSE(project.id);
                }
            });
        }
    }, [projects]);


    const startSSE = (projectId: string) => {
        const eventSource = new EventSource(`${APIRoute.projectStream}/${projectId}`);

        eventSource.addEventListener('done', () => {
            console.log(`Previous state: ${projects}`);
            const newProjectState = projects.map((p) =>
                p.id === projectId ? { ...p, status: true } : p
            );
            console.log(`Updated state: ${projects}`);

            setProjects(newProjectState);
            eventSource.close();
        });

        eventSource.onerror = () => {
            console.error(`Error in SSE for project ${projectId}, retrying...`);
            eventSource.close();
            setTimeout(() => startSSE(projectId), 5000);
        };
    };

    const handleDeleteProject = async (projectId: string) => {
        try {
            const response = await fetch(`${APIRoute.deleteProject}/${projectId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete project");
            const newProjectState = projects.filter((p) => p.id !== projectId);
            setProjects(newProjectState);

        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };


    return {
        projects,
        loading,
        handleDeleteProject,
        recentProjects,
        setRecentProjects,
    };
};
