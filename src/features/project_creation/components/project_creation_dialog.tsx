import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import APIRoute from "../../../api_route";


interface ProjectCreationDialogProp {
    onClose: () => void;
    fileName: string;
    file: File | null;
    fileSize: number | undefined;
}

const ProjectCreationDialog: React.FC<ProjectCreationDialogProp> = ({ onClose, fileName, file, fileSize }) => {
    const projectNameInputRef = useRef<HTMLInputElement>(null);
    const projectTypeInputRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validate = () => {
        if (!projectNameInputRef.current?.value) {
            setErrorMessage("Provide the project name");
            return false;
        }
        if (!file) {
            setErrorMessage("Provide the file");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const createProject = async () => {
        if (!validate()) return;
        const projectName = projectNameInputRef.current?.value;
        const translationType = projectTypeInputRef.current?.value;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("project_setting", JSON.stringify({ projectName, translationType }));
        if (file) formData.append("in_file", file);

        try {
            const response = await fetch(APIRoute.CreateaProject, {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                throw new Error(`HTTP error! Status: ${response.status}, ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log("Project created:", data);


            // Navigate to editor page
            navigate(`/editor/${data.data.id}`);
        } catch (e: any) {
            console.error("Error creating project:", e);
            setErrorMessage(e.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white fixed p-8 rounded-lg shadow-lg w-[90%] md:w-[60%] h-auto flex flex-col justify-center">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl cursor-pointer">
                    &times;
                </button>
                <h2 className="text-xl font-semibold text-left pb-5">Create the Project</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-[2] flex-col">
                        {file ? (
                            <video src={URL.createObjectURL(file)} className="w-full h-auto object-cover" controls={false} />
                        ) : (
                            <p className="text-sm text-gray-600">No preview</p>
                        )}
                        <p className="text-gray-700 text-sm mt-2">
                            {fileName} ({(fileSize ?? 0 / 1024 / 1024).toFixed(2)} MB)
                        </p>
                    </div>
                    <div className="flex flex-[3] flex-col gap-4">
                        <input type="text" placeholder="Enter the project name" ref={projectNameInputRef} className="border p-2 rounded w-full mt-2" />
                        <select className="border p-2 rounded w-full mt-2" ref={projectTypeInputRef}>
                            <option value={"BULK"}>Bulk translation</option>
                            {/* <option value={"REALTIME"}>Real-time Translation</option> */}
                        </select>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={createProject}>
                            {isLoading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </div>
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default ProjectCreationDialog;
