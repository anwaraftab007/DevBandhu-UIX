import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code2, Github } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';
import { base } from '../constant'; // Import base URL for API requests
import { ConfirmDialog } from '../components/ConfirmDialog';

type AuthMode = 'login' | 'register';

interface AuthProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void; 
}
const Auth: React.FC<AuthProps> = ({ setIsLoggedIn, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationMail, setShowVerificationMail] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiURL = mode === 'login' ? `${base}/user/login` : `${base}/user/register`;
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: mode === 'login' ? 'include' : undefined, // Only include credentials for login
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        if (mode === 'login') {
          setIsLoggedIn(true);
          // Store token and navigate to dashboard
          window.localStorage.setItem('token', data.data.accessToken);
          navigate('/dashboard');
        } else {
          // Navigate to login page after registration
          setShowVerificationMail(true);
          setMode('login');
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error occurred during the operation.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="md:w-10/12 mx-auto justify-center items-center">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Code2 className="w-8 h-8 text-indigo-500" />
          <span className="text-2xl font-bold">DevBandhu</span>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-md p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <Input
                label="FullName"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.fullName}
                required
              />
            )}
            {mode === 'register' && (
              <Input
                label="Username"
                type="text"
                name="username"
                placeholder="Choose a username"
                onChange={handleChange}
                value={formData.username}
                required
              />
            )}
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              required
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-gray-500`}>
                  Or continue with
                </span>
              </div>
            </div>

            <Button type="button" variant="secondary" className="w-full flex items-center justify-center space-x-2">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </Button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-1 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
            {message && <p className="text-center text-sm text-red-500">{message}</p>}
          </form>
        </motion.div>
      </div>
            {/* Verification Mail Dialog */}
            <AnimatePresence>
        {showVerificationMail && (
          <ConfirmDialog
            title="Verify Your Email"
            message="Please check your inbox, and don’t forget to check the spam or junk folder if you don’t see it. Verification is required to proceed."
            onCancel={() => setShowVerificationMail(false)}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
export default Auth;