import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface ProjectChatProps {
  projectId: number;
}

export function ProjectChat({ projectId }: ProjectChatProps) {
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      content: 'Just pushed some updates to the authentication flow.',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      sender: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
      content: 'Great work! I\'ll review the changes shortly.',
      timestamp: '2:32 PM'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Add message to the chat (update as needed when implementing message handling)
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-4"
          >
            <img
              src={msg.avatar}
              alt={msg.sender}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <span className="font-medium text-white">{msg.sender}</span>
                <span className="text-xs text-gray-400">{msg.timestamp}</span>
              </div>
              <p className="text-gray-300 mt-1">{msg.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
