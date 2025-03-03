
import React from 'react';
import { ProjectCard } from './project_card';

import { useProjectList } from '../controller/project_setup';


export const ProjectList: React.FC = () => {

  const { projects } = useProjectList();

  console.log(projects);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-medium text-gray-800">My Projects</h2>
      </div>

      <div className="divide-y divide-gray-200 ">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
