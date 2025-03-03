
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
        {projects.length == 0 ? <div  className='flex justify-center items-center flex-col p-4 gap-4'> <img src="/src/assets/images/empty.png" className='w-50 h-50 object-cover' /><span className='text-gray-500 text-lg'>No projects found</span> </div> :
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        }

      </div>
    </div>
  );
};
