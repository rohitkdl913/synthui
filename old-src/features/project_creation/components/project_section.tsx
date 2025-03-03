import { useEffect, useState } from "react";
import { Project } from "../model/project";
import ProjectCard from "./project_card";
import ProjectCollectionSections from "./project_collection_section";
import RecentSection from "./recent_section";
import APIRoute from "../../../api_route";

interface ProjectSectionProps {

    // recentProjects: Project[]
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ }) => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        // Fetch project list
        fetch(APIRoute.project)
            .then((response) => response.json())
            .then((data) => {
                const updatedProjects = data.data.map((p: any) => ({
                    ...p,
                    thumbnail: `${APIRoute.ThumbnailStream}/${p.id}`,
                }));
                setProjects(updatedProjects);
                setLoading(false);

                // Start SSE for status updates
                updatedProjects.forEach((project: Project) => {
                    if (!project.status) {
                        startSSE(project.id);
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setLoading(false);
            });
    }, []);

    const startSSE = (projectId: string) => {
        const eventSource = new EventSource(`${APIRoute.projectStream}/${projectId}`);

        eventSource.addEventListener('done', (event: MessageEvent) => {
            setProjects((prevProjects) =>
                prevProjects.map((p) =>
                    p.id === projectId ? { ...p, status: true } : p
                )
            );
            eventSource.close();
        });

        eventSource.onerror = () => {
            console.error(`Error in SSE for project ${projectId}, retrying in 5s...`);
            eventSource.close();
            setTimeout(() => startSSE(projectId), 5000); // Reconnect after 5s
        };
    };

    // Function to handle project deletion
    const handleDeleteProject = async (projectId: string) => {
        // Your delete logic here, e.g., making an API request to delete the project

        try {
            const response = await fetch(`${APIRoute.deleteProject}/${projectId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete project");
            }

            const result = await response.json();
            setProjects(prev => prev.filter(p => p.id !== projectId));
            return result;
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
        console.log(`Project with id ${projectId} deleted`);
    };

    // Function to handle cancel transcription
    const handleCancelTranscription = () => {
        // Your cancel transcription logic here
        console.log("Transcription canceled");
    };
    console.log(projects);


    if (loading) {
        return <div className="p-6 text-center text-lg">Loading projects...</div>;
    }

    return <div className="flex flex-auto flex-col bg-(--secondary) p-5 pt-5 rounded mt-5 overflow-y-scroll gap-5">
        <RecentSection>
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    isProcessing={!project.status}
                    onDelete={handleDeleteProject}  // Passing delete function
                    onCancelTranscription={handleCancelTranscription} // Passing cancel function
                />
            ))}
        </RecentSection>
        
        <ProjectCollectionSections>
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    isProcessing={!project.status}
                    onDelete={handleDeleteProject}  // Passing delete function
                    onCancelTranscription={handleCancelTranscription} // Passing cancel function
                />
            ))}
        </ProjectCollectionSections>
    </div>
}



export default ProjectSection;