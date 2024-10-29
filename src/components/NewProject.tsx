import React from 'react';
import { X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

interface NewProjectProps {
  onClose: () => void;
}

export function NewProject({ onClose }: NewProjectProps) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Create New Project</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-2xl bg-gray-800 rounded-lg p-6">
        <form className="space-y-6">
          <Input
            label="Project Name"
            placeholder="Enter project name"
            required
          />
          <Input
            label="Description"
            as="textarea"
            rows={3}
            placeholder="Describe your project"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Repository URL"
              placeholder="https://github.com/username/repo"
            />
            <Input
              label="Programming Language"
              placeholder="e.g., TypeScript"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}