import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProjectList } from '../components/ProjectList';
import { MessageList } from '../components/MessageList';
import { TeamSection } from '../components/TeamSection';
import { SettingsSection } from '../components/SettingsSection';
import { NewProject } from '../components/NewProject';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectList />;
      case 'messages':
        return <MessageList />;
      case 'team':
        return <TeamSection />;
      case 'settings':
        return <SettingsSection />;
      case 'new-project':
        return <NewProject onClose={() => setActiveSection('projects')} />;
      default:
        return <ProjectList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}