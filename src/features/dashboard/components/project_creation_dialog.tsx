import React from "react";
import { useProjectCreation } from "../controller/project_creation";

interface ProjectCreationDialogProps {
  onClose: () => void;
  fileName: string;
  file: File | null;
  fileSize: number | undefined;
}

const ProjectCreationDialog: React.FC<ProjectCreationDialogProps> = ({
  onClose,
  fileName,
  file,
  fileSize
}) => {
  const {
    projectNameInputRef,
    projectTypeInputRef,
    errorMessage,
    isLoading,
    createProject
  } = useProjectCreation({ file });

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white fixed p-8 rounded-lg shadow-lg w-[90%] md:w-[60%] h-auto flex flex-col justify-center">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl cursor-pointer"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-semibold text-left pb-5">Create the Project</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Preview Section */}
          <div className="flex flex-[2] flex-col">
            {file ? (
              <video 
                src={URL.createObjectURL(file)} 
                className="w-full h-auto object-cover" 
                controls={false} 
              />
            ) : (
              <p className="text-sm text-gray-600">No preview</p>
            )}
            <p className="text-gray-700 text-sm mt-2">
              {fileName} ({((fileSize ?? 0) / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
          
          {/* Form Section */}
          <div className="flex flex-[3] flex-col gap-4">
            <input 
              type="text" 
              placeholder="Enter the project name" 
              ref={projectNameInputRef} 
              className="border p-2 rounded w-full mt-2 focus:border-[#80419c] focus:outline-none focus:ring-1 focus:ring-[#80419c]" 
            />
            
            <select 
              className="border p-2 rounded w-full mt-2 focus:border-[#80419c] focus:outline-none focus:ring-1 focus:ring-[#80419c]" 
              ref={projectTypeInputRef}
            >
              <option value={"BULK"}>Bulk translation</option>
              {/* <option value={"REALTIME"}>Real-time Translation</option> */}
            </select>
            
            <button 
              className="bg-[#80419c] hover:bg-[#6a3483] text-white px-4 py-2 rounded w-full transition-colors duration-200" 
              onClick={createProject} disabled={isLoading} 
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
        
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectCreationDialog;