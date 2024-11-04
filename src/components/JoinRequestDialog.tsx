import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface JoinRequestDialogProps {
  projectName: string;
  onSubmit: (message: string) => void;
  onCancel: () => void;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export function JoinRequestDialog({
  projectName,
  onSubmit,
  onCancel
}: JoinRequestDialogProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Join Project</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-300 mb-4">
          Request to join <span className="font-semibold">{projectName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Message to Project Owner"
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly explain why you'd like to join this project..."
            required
          />

          <div className="flex justify-end space-x-4">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Send Request
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}