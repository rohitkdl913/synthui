import React from 'react';
import { Clock } from 'lucide-react';
import { ProcessingStatus } from './processing_status';
import { ProjectActions } from './project_actions';
import { Project } from '../../model/project';
import { formatTime } from '../../utils';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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
                    <div className="flex items-center mt-2 sm:mt-0">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{project.duration}</span>
                    </div>
                </div>

                <div className="flex items-center mb-3">
                    <span className="text-sm text-gray-500">Created: {formatTime(project.createdAt)}</span>
                </div>

                {project.status != true ? (
                    <ProcessingStatus progress={0} />
                ) : (
                    <ProjectActions projectId={project.id} projectName={project.name} />
                )}
            </div>
        </div>
    );
};
