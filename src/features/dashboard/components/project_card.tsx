import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { ProcessingStatus } from './processing_status';
import { ProjectActions } from './project_actions';
import { Project } from '../../model/project';
import { formatTime } from '../../utils';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [loading, setLoading] = useState(!project.status);

    // Add duration formatting function
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (project.status && loading) {
          const timeout = setTimeout(() => {
            setLoading(false);
          }, 3000); // Changed from 2000 to 3000
          return () => clearTimeout(timeout);
        }
      }, [project.status, loading]);

    return (
        <div className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
                <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full sm:w-40 h-24 object-cover rounded-md"
                />
            </div>
            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800">{project.name}</h3>
                    {/* Removed duration from here */}
                </div>

                {/* Modified created date section */}
                <div className="flex flex-col mb-3 gap-1">
                    <span className="text-sm text-gray-500">Created: {formatTime(project.createdAt)}</span>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">
                            Duration: {formatDuration(parseInt(project.duration))}
                        </span>
                    </div>
                </div>

                {loading ? (
                    <ProcessingStatus isFinished={!!project.status} />
                ) : (
                    <ProjectActions projectId={project.id} projectName={project.name} />
                )}
            </div>
        </div>
    );
};