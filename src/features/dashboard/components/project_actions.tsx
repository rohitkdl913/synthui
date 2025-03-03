import React from 'react';
import { useNavigate } from 'react-router-dom';
import APIRoute from '../../../api_route';

interface ProjectActionsProps {
  projectId: string
  projectName: string
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({ projectName, projectId }) => {
  const navigate = useNavigate();
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

    </div>
  );
};