// import { Link, useNavigate } from "react-router-dom"
// import { Project } from "../model/project";



// interface ProjectCardProps {
//     project: Project;
//     isProcessing: boolean
// }




// const ProjectCard: React.FC<ProjectCardProps> = ({ project, isProcessing }) => {
//     const navigate = useNavigate();
//     const handleClick = () => {
//         if (!isProcessing) {
//             navigate(`/editor/${project.id}`);
//         }

//     }
//     return (

//         <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-md" onClick={handleClick}>
//             <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />

//             {isProcessing && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//             )}

//             <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white text-sm">
//                 {project.name}
//             </div>
//         </div>

//     );
// };

// export default ProjectCard;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Project } from "../model/project";

interface ProjectCardProps {
    project: Project;
    isProcessing: boolean;
    onDelete: (projectId: string) => void; // Add a callback for delete action
    onCancelTranscription: () => void; // Add a callback for cancel action
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isProcessing, onDelete, onCancelTranscription }) => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false); // For showing the dropdown menu

    const handleClick = () => {
        if (!isProcessing) {
            navigate(`/editor/${project.id}`);
        }
    };

    const handleMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation();  // Prevent the click event from bubbling up to the parent div
        setShowMenu(!showMenu);  // Toggle menu visibility
    };



    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        onDelete(project.id);
        setShowMenu(false); // Close the menu after action
    };

    const handleCancelTranscription = () => {
        onCancelTranscription();
        setShowMenu(false); // Close the menu after action
    };

    return (
        <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-md" onClick={handleClick}>
            <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />

            {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white text-sm truncate">
                {project.name}
            </div>

            {/* Menu Button */}
            <button
                className="absolute top-2 right-2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
                onClick={handleMenuClick}
            >
                &#x22EE; {/* Ellipsis icon */}
            </button>

            {/* Menu */}
            {showMenu && (
                <div className="absolute top-10 right-2 bg-white text-black shadow-lg rounded-md w-40 z-10">
                    {isProcessing ? (
                        <button
                            onClick={handleCancelTranscription}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                            Cancel Transcription
                        </button>
                    ) : (
                        <button
                            onClick={handleDelete}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                            Delete Project
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
