import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code2, Users, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="md:w-10/12 mx-auto justify-center items-center">
       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code2 className="w-8 h-8 text-indigo-500" />
          <span className="text-2xl font-bold">DevBandhu</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6">
            Where Developers Unite and Code Thrives
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Join a community of passionate developers. Collaborate, chat, and create amazing projects together.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <Users className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Connect with developers, share ideas, and build projects together in real-time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <Code2 className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Organize your projects with dedicated channels, file sharing, and real-time updates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <Sparkles className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Growth</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Learn from others, share your knowledge, and grow together as developers.
            </p>
          </motion.div>
        </div>
      </main> 
      </div>
      
    </div>
  );
}

export default LandingPage;