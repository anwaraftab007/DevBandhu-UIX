import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Users, 
  MessageSquare, 
  Settings, 
  Link as LinkIcon,
  LogOut,
  UserPlus,
} from 'lucide-react';
import { Button } from './Button';
import { ProjectChat } from './ProjectChat';
import { ConfirmDialog } from './ConfirmDialog';
import { JoinRequestDialog } from './JoinRequestDialog';

interface ProjectDetailsProps {
  project: {
    id: number;
    name: string;
    description: string;
    repoUrl: string;
    members: number;
    isOwner?: boolean;
    isMember?: boolean;
  };
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'details'>('details');
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);

  const handleLeaveProject = () => {
    // API call to leave project
    setShowLeaveDialog(false);
    onClose();
  };

  const handleJoinRequest = () => {
    // API call to send join request
    setShowJoinDialog(false);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">{project.name}</h2>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'details'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Details</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'chat'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat</span>
          </button>
        </nav>

        <div className="mt-auto pt-6">
          {project.isMember ? (
            <Button
              variant="ghost"
              className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
              onClick={() => setShowLeaveDialog(true)}
            >
              <div className="flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Leave Project</span>
              </div>
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setShowJoinDialog(true)}
            >
              <div className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Join Project</span>
              </div>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900">
        {activeTab === 'details' ? (
          <div className="p-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-gray-400" />
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    View Repository
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{project.members} members</span>
                </div>

                <div className="flex items-center space-x-3">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    {project.repoUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ProjectChat projectId={project.id} />
        )}
      </div>

      {/* Leave Project Dialog */}
      <AnimatePresence>
        {showLeaveDialog && (
          <ConfirmDialog
            title="Leave Project"
            message="Are you sure you want to leave this project? You'll need to request to join again."
            confirmLabel="Leave Project"
            confirmVariant="danger"
            onConfirm={handleLeaveProject}
            onCancel={() => setShowLeaveDialog(false)}
          />
        )}
      </AnimatePresence>

      {/* Join Request Dialog */}
      <AnimatePresence>
        {showJoinDialog && (
          <JoinRequestDialog
            projectName={project.name}
            onSubmit={handleJoinRequest}
            onCancel={() => setShowJoinDialog(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
