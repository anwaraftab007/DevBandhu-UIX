import React from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    message: 'Hey, hows the new feature coming along?',
    time: '2m ago',
    online: true
  },
  {
    id: 2,
    sender: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    message: 'Ive pushed the latest changes to the repo',
    time: '5m ago',
    online: false
  },
  // Add more mock messages as needed
];

export function MessageList() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={message.avatar}
                  alt={message.sender}
                  className="w-12 h-12 rounded-full"
                />
                {message.online && (
                  <Circle className="w-3 h-3 absolute bottom-0 right-0 text-green-500 fill-current" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{message.sender}</h3>
                  <span className="text-sm text-gray-400">{message.time}</span>
                </div>
                <p className="text-gray-400 text-sm">{message.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}