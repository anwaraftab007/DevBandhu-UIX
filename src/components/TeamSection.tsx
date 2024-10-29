import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    social: {
      github: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    social: {
      github: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  // Add more team members as needed
];

export function TeamSection() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 text-center"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{member.role}</p>
            <div className="flex justify-center space-x-4">
              <a href={member.social.github} className="text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href={member.social.twitter} className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={member.social.linkedin} className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}