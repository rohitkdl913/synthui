// // import React, { useEffect, useRef, useState } from "react";
// // import APIRoute from "../../../api_route";
// // import ProjectCreationDialog from "../components/project_creation_dialog";
// // import { Project } from "../model/project";
// // import ProjectCard from "../components/project_card";



// // const ProjectList: React.FC = () => {
// //     const [projects, setProjects] = useState<Project[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const fileInputRef = useRef<HTMLInputElement | null>(null);
// //     const [file, setFile] = useState<File | null>(null);
// //     const [showModal, setShowModal] = useState(false);

// //     useEffect(() => {
// //         fetch(APIRoute.project)
// //             .then((response) => response.json())
// //             .then((data) => {
// //                 setProjects(data.data.map((p: any) => ({ ...p, thumbnail: `${APIRoute.ThumbnailStream}/${p.id}` })));
// //                 setLoading(false);
// //             })
// //             .catch((error) => {
// //                 console.error("Error fetching projects:", error);
// //                 setLoading(false);
// //             });
// //     }, []);


// //     if (loading) {
// //         return <div className="p-6 text-center text-lg">Loading projects...</div>;
// //     }

// //     const handleAddProject = () => {
// //         fileInputRef.current?.click();
// //     };


// //     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         const uploadedFile = event.target.files?.[0];
// //         if (uploadedFile) {
// //             setFile(uploadedFile);
// //             setShowModal(true);
// //         }
// //     };

// //     return (
// //         <div className="p-6">
// //             <h1 className="text-2xl font-bold mb-4">Your Projects</h1>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //                 {projects.map((project) => (
// //                     <ProjectCard key={project.id} project={project} />
// //                 ))}

// //                 <div
// //                     className="relative flex items-center justify-center w-64 h-40 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-200 transition"
// //                     onClick={handleAddProject}
// //                 >
// //                     <input
// //                         type="file"
// //                         ref={fileInputRef}
// //                         className="hidden"
// //                         accept="video/*"
// //                         onChange={handleFileChange}
// //                     />

// //                     <span className="text-gray-600 text-4xl font-bold">+</span>
// //                 </div>
// //             </div>
// //             {/* Modal for Project Creation */}
// //             {showModal && (
// //                 <ProjectCreationDialog onClose={() => setShowModal(false)} fileName={file?.name ?? ""} file={file} fileSize={file?.size}></ProjectCreationDialog>
// //             )}
// //         </div>
// //     );
// // };


// // export default ProjectList;


// import React, { useEffect, useRef, useState } from "react";
// import APIRoute from "../../../api_route";
// import ProjectCreationDialog from "../components/project_creation_dialog";
// import { Project } from "../model/project";
// import ProjectCard from "../components/project_card";

// const ProjectList: React.FC = () => {
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [loading, setLoading] = useState(true);
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
//     const [file, setFile] = useState<File | null>(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         // Fetch project list
//         fetch(APIRoute.project)
//             .then((response) => response.json())
//             .then((data) => {
//                 const updatedProjects = data.data.map((p: any) => ({
//                     ...p,
//                     thumbnail: `${APIRoute.ThumbnailStream}/${p.id}`,
//                 }));
//                 setProjects(updatedProjects);
//                 setLoading(false);

//                 // Start SSE for status updates
//                 updatedProjects.forEach((project: Project) => {
//                     if (!project.status) {
//                         startSSE(project.id);
//                     }
//                 });
//             })
//             .catch((error) => {
//                 console.error("Error fetching projects:", error);
//                 setLoading(false);
//             });
//     }, []);

//     const startSSE = (projectId: string) => {
//         const eventSource = new EventSource(`${APIRoute.projectStream}/${projectId}`);

//         eventSource.addEventListener('done', (event: MessageEvent) => {
//             setProjects((prevProjects) =>
//                 prevProjects.map((p) =>
//                     p.id === projectId ? { ...p, status: true } : p
//                 )
//             );
//         });

//         eventSource.onerror = () => {
//             console.error(`Error in SSE for project ${projectId}, retrying in 5s...`);
//             eventSource.close();
//             setTimeout(() => startSSE(projectId), 5000); // Reconnect after 5s
//         };
//     };

//     const handleAddProject = () => {
//         fileInputRef.current?.click();
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const uploadedFile = event.target.files?.[0];
//         if (uploadedFile) {
//             setFile(uploadedFile);
//             setShowModal(true);
//         }
//     };

//     if (loading) {
//         return <div className="p-6 text-center text-lg">Loading projects...</div>;
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Your Projects</h1>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {projects.map((project) => (
//                     <ProjectCard key={project.id} project={project} isProcessing={!project.status} />
//                 ))}

//                 <div
//                     className="relative flex items-center justify-center w-64 h-40 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-200 transition"
//                     onClick={handleAddProject}
//                 >
//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         className="hidden"
//                         accept="video/*"
//                         onChange={handleFileChange}
//                     />
//                     <span className="text-gray-600 text-4xl font-bold">+</span>
//                 </div>
//             </div>

//             {showModal && (
//                 <ProjectCreationDialog onClose={() => setShowModal(false)} fileName={file?.name ?? ""} file={file} fileSize={file?.size} />
//             )}
//         </div>
//     );
// };

// export default ProjectList;






import React, { useEffect, useRef, useState } from "react";
import APIRoute from "../../../api_route";
import ProjectCreationDialog from "../components/project_creation_dialog";
import { Project } from "../model/project";
import ProjectCard from "../components/project_card";

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleAddProject = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setShowModal(true);
        }
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

    if (loading) {
        return <div className="p-6 text-center text-lg">Loading projects...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Projects</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        isProcessing={!project.status}
                        onDelete={handleDeleteProject}  // Passing delete function
                        onCancelTranscription={handleCancelTranscription} // Passing cancel function
                    />
                ))}

                <div
                    className="relative flex items-center justify-center w-64 h-40 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-200 transition"
                    onClick={handleAddProject}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                    <span className="text-gray-600 text-4xl font-bold">+</span>
                </div>
            </div>

            {showModal && (
                <ProjectCreationDialog
                    onClose={() => setShowModal(false)}
                    fileName={file?.name ?? ""}
                    file={file}
                    fileSize={file?.size}
                />
            )}
        </div>
    );
};

export default ProjectList;
