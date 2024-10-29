import React from 'react';
import { Input } from './Input';
import { Button } from './Button';

export function SettingsSection() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
      <div className="max-w-2xl bg-gray-800 rounded-lg p-6">
        <form className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
            <Input
              label="Display Name"
              defaultValue="John Doe"
            />
            <Input
              label="Email"
              type="email"
              defaultValue="john@example.com"
            />
            <Input
              label="Bio"
              as="textarea"
              rows={3}
              defaultValue="Full-stack developer passionate about creating amazing web applications."
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Preferences</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}