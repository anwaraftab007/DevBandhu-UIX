import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { title } from 'framer-motion/client';
import { base } from '../constant';

interface NewProjectProps {
  onClose: () => void;
}

export function NewProject({ onClose }: NewProjectProps) {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    repoURL: '',
    skills: '',
  });
  const [message, setMessage] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      
      const response = await fetch(`${base}/project/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
        credentials: 'include',
      });
  
      const data = await response.json();
      setMessage(data.message);
  
      if (data.success) {
       
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error occurred during the operation.');
      console.error(error);
    }
  };
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {message ? message : "Create New Project"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
  
      {!message && (
        <div className="max-w-2xl bg-gray-800 rounded-lg p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Project Name"
              placeholder="Enter project name"
              name="title"
              onChange={handleChange}
              value={projectData.title}
              required
            />
            <Input
              label="Description"
              as="textarea"
              rows={3}
              name="description"
              placeholder="Describe your project"
              onChange={handleChange}
              value={projectData.description}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Repository URL"
                name="repoURL"
                placeholder="https://github.com/username/repo"
                onChange={handleChange}
                value={projectData.repoURL}
              />
              <Input
                label="Programming Language"
                name="skills"
                placeholder="e.g., TypeScript"
                onChange={handleChange}
                value={projectData.skills}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
  
}