import { useRef, useState } from "react";
import APIRoute from "../../../api_route";
import { useDialog } from "../../provider/dialog_provider";
import { useProject } from "../../provider/project_provider";

interface ProjectCreationInput {
  file: File | null;
}

export function useProjectCreation({ file }: ProjectCreationInput) {
  const projectNameInputRef = useRef<HTMLInputElement>(null);
  const projectTypeInputRef = useRef<HTMLSelectElement>(null);

  const { closeDialog } = useDialog();

  const { addProject } = useProject();


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
      const response = await fetch(APIRoute.createProject, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}, ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log("Project created:", data)
      const updatedProjects = {
        ...data.data,
        thumbnail: `${APIRoute.streamThumbnail}/${data.data.id}`,
      };
      addProject(updatedProjects);
      closeDialog();
    } catch (e: any) {
      console.error("Error creating project:", e);
      setErrorMessage(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projectNameInputRef,
    projectTypeInputRef,
    errorMessage,
    isLoading,
    createProject
  };
}