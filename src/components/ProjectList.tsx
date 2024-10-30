import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Star, Users } from 'lucide-react';
import { ProjectDetails } from './ProjectDetails';
import {base} from '../constant'
// const projects = [
//   {
//     id: 1,
//     name: 'E-Commerce Platform',
//     description: 'A modern e-commerce platform built with React and Node.js',
//     members: 5,
//     stars: 12,
//     language: 'TypeScript',
//     repoUrl: 'https://github.com/example/ecommerce',
//     isOwner: false,
//     isMember: true,
//   },
//   {
//     id: 2,
//     name: 'Task Management App',
//     description: 'Collaborative task management application with real-time updates',
//     members: 3,
//     stars: 8,
//     language: 'JavaScript',
//     repoUrl: 'https://github.com/example/task-manager',
//     isOwner: true,
//     isMember: true,
//   },
// ];

export function ProjectList() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [projects, setProjects] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await fetch(`${base}/project`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            
            setProjects(data.data);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    fetchProjects();
}, []);
  return (
    <div className="p-8">
      {selectedProject ? (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-white mb-6">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects && projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <FolderGit2 className="w-6 h-6 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  </div>
                </div>
                <p className="mt-2 text-gray-400 text-sm">{project.description}</p>
                <div className="mt-4 flex items-center justify-between text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{project.members}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                  </div>
                  <span className="text-sm px-2 py-1 rounded-full bg-gray-700">
                    {project.language}
                  </span>
                </div>
                {project.isOwner && (
                  <div className="mt-2">
                    <span className="text-xs text-indigo-400 bg-indigo-900/30 px-2 py-1 rounded-full">
                      Owner
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
