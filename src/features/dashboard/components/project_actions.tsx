import React from 'react';
import { useNavigate } from 'react-router-dom';
import APIRoute from '../../../api_route';
import { Trash2 } from 'lucide-react';
import { useProject } from '../../provider/project_provider';
import { useDialog } from '../../provider/dialog_provider';
import DeleteProjectDialog from './delete_project';

interface ProjectActionsProps {
  projectId: string
  projectName: string
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({ projectName, projectId }) => {
  const navigate = useNavigate();
  const { setProjects, projects } = useProject();
  const { openDialog, closeDialog } = useDialog();


  const handleEdit = () => {
    navigate(`/editor/${projectId}`);
  }
  const handleDownloadSrt = async () => {

    try {
      const response = await fetch(`${APIRoute.exportSubtitle}/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export subtitles');
      }


      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${projectName}.srt`; // Name the file with project name
      link.click();

    } catch (error) {
      console.error('Export failed:', error);
    }
  }



  const handleDeleteProject = async (event: React.MouseEvent) => {
    event.stopPropagation();


    const onDelete = async () => {
      try {
        const response = await fetch(`${APIRoute.deleteProject}/${projectId}`, {
          method: "DELETE",
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Failed to delete project");
        }

        const result = await response.json();
        const updateProjectsList = projects.filter(p => p.id !== projectId);
        setProjects(updateProjectsList);
        console.log(`Project with id ${projectId} deleted`);

        return result;
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
    openDialog(<DeleteProjectDialog onClose={closeDialog} onConfirm={onDelete} projectName={projectName} />)

  };

  return (
    <div className="flex items-center gap-3">
      <button className="px-3 py-1 bg-[#80419c] hover:bg-[#6a3483] text-white text-sm rounded" onClick={handleEdit}>
        Edit Subtitles
      </button>


      <button className="px-3 py-1 border border-[#80419c] text-[#80419c] hover:bg-[#f3ebf6] text-sm rounded" onClick={handleDownloadSrt}>
        Download SRT
      </button>


      <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded">
        Completed
      </span>

      <div className='flex-1'></div>

      <Trash2 onClick={handleDeleteProject} color='red' className='cursor-pointer' />

    </div>
  );
};