import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import { base } from '../constant';

interface JoinRequest {
  user: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Project {
  _id: string; // Ensure this matches your API response
  title: string;
  description: string;
  leader: string; // Add this to check against the user's ID
  joinRequests: JoinRequest[];
}

interface UserDetails {
  username: string;
  message: string; // Assuming message is needed
}

export function ProjectJoinRequest() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [message, setMessage] = useState('');
  const [userDetails, setUserDetails] = useState<{ [key: string]: UserDetails }>({});
  const [onAction, setOnAction] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const user = window.localStorage.getItem('user');
      const userId = JSON.parse(user)?._id;

      try {
        const response = await fetch(`${base}/project`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();

        // Filter projects: user is the leader and has join requests
        const filteredProjects = data.data.filter((project: Project) =>
          project.leader === userId && project.joinRequests.length > 0
        );

        setProjects(filteredProjects);

        // Collect unique user IDs from join requests for user details
        const requests = filteredProjects.flatMap((project: Project) => project.joinRequests);
        const uniqueUserIds = [...new Set(requests.map((req: { user: any; }) => req.user))];

        const userDetailsMap = await Promise.all(uniqueUserIds.map(async (userId) => {
          const userInfo = await getUserDetails(userId);
          return { userId, ...userInfo };
        }));

        const userDetailsObj = userDetailsMap.reduce((acc, { userId, username, message }) => {
          acc[userId] = { username, message };
          return acc;
        }, {} as { [key: string]: UserDetails });

        setUserDetails(userDetailsObj);
      } catch (error) {
        if (error instanceof Error) {
          setMessage(`Error: ${error.message}`);
        }
      }
    };

    fetchProjects();
  }, [onAction]);

  const getUserDetails = async (id: string): Promise<UserDetails> => {
    try {
      const res = await fetch(`${base}/user/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return { username: data.data.username, message: data.data.message || '' };
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { username: 'Unknown', message: '' };
    }
  };

  const handleRequestResponse = async (projectId: string, userId: string, response: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`${base}/project/${projectId}/approveRequest/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: response }),
      });
      if (!res.ok) {
        throw new Error('Failed to update request status');
      }
      // Optionally refresh project data or update local state here
      // fetchProjects();
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      }
    }
    setOnAction(!onAction);
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Join Requests</h2>
      {message && <div className="text-red-500 mb-4">{message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) =>
          project.joinRequests.length > 0 ? (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-4 md:p-6"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-1 text-gray-400 text-sm md:text-base">{project.description}</p>
              <div className="mt-4 space-y-2">
                {project.joinRequests.map((request) => (
                  <div key={request.user} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-indigo-500" />
                      <span className="text-white">{userDetails[request.user]?.username || 'Unknown User'}</span>
                    </div>
                    <span className="text-gray-300 text-sm">{request.message}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-green-500 hover:text-green-400"
                        onClick={() => handleRequestResponse(project._id, request.user, 'approved')}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-400"
                        onClick={() => handleRequestResponse(project._id, request.user, 'rejected')}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
}
