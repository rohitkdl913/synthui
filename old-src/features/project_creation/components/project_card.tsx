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
        <div className="flex flex-col w-64 rounded-lg shadow-md p-2 bg-(--card-color) hover:border-(--hover) cursor-pointer border-transparent border-2" onClick={handleClick}>
            {isProcessing ? <div className="inset-0 h-40 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div> : <img src={project.thumbnail} alt={project.name} className="w-full h-40 object-cover" />}
            <div className="flex mt-1 items-center justify-between">
                <span>{project.name}</span>
                <button
                    className="p-2  rounded-full hover:bg-gray-700 relative"
                    onClick={handleMenuClick}
                >
                    &#x22EE;
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
                </button>


            </div>



        </div>
    );
};

export default ProjectCard;
