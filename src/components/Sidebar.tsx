import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  MessageSquare,
  FolderGit2,
  Contact,
  Contact2,
  UserPlus
} from 'lucide-react';
import { Button } from './Button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: FolderGit2, label: 'Projects', id: 'projects' },
    { icon: MessageSquare, label: 'Messages', id: 'messages' },
    { icon: UserPlus, label: 'Join Requests', id: 'join-requests' },
    { icon: Users, label: 'Team', id: 'team' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">DevBandhu</h1>
      </div>

      <Button
        variant="primary"
        className="mb-6 w-full"
        onClick={() => onSectionChange('new-project')}
      >
        <div className="flex items-center justify-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </div>
      </Button>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}