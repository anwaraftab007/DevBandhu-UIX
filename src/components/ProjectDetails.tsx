import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Users,
  MessageSquare,
  Settings,
  Link as LinkIcon,
  LogOut,
  UserPlus,
} from "lucide-react";
import { Button } from "./Button";
import { ProjectChat } from "./ProjectChat";
import { Dialog } from "./ConfirmDialog";
import { JoinRequestDialog } from "./JoinRequestDialog";
import { useNavigate } from "react-router-dom";
import { base } from "../constant";
interface JoinRequest {
  user: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}
interface ProjectDetailsProps {
  project: {
    _id: number;
    title: string;
    description: string;
    leader: String,
    repoUrl: string;
    members: Array<{}>;
    joinRequests: JoinRequest[];
    isOwner?: boolean;
    isMember?: boolean;
  };
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "details">("details");
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState("");
  const [isLeader, setIsLeader] = useState(false)
  // const [error, setError] = useState("");
  // const [req, setReq] = useState(false)
  // const [joinDialogReq, setJoinDialogReq] = useState(false);
  const navigate = useNavigate();
  const handleLeaveProject = async () => {
    // API call to leave project
    const projectId = project?._id;
    try {
      const response = await fetch(`${base}/project/exit?projectId=${projectId}`,{
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if(response.ok){
        setShowLeaveDialog(false);
        setIsJoined(false);
        navigate("/")
        }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error?.message);
      }
    }
    onClose();
  };

  const handleJoinRequest = async (message: any) => {
    // API call to send join request
    const projectId = project?._id;
    try {
      const response = await fetch(`${base}/project/join/${projectId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({message})
      });
      // setJoinDialogReq(true);
      if (response.ok) {
        setMessage("Join Request Send Successfully..");
    setIsPending(true);
      } else {
        if (response.status === 402) {
          setMessage("User is already  Part of this project..");
        }
      }
    } catch (error) {
      if(error instanceof Error){
      console.error(error);}
    }
    setShowJoinDialog(false);
  };
  const handleWithdrawRequest = async () => {
    const projectId = project?._id;
    
    try {
        const response = await fetch(`${base}/project/join/${projectId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            setMessage("Join request withdrawn successfully.");
            setIsPending(false);
        } else {
            setMessage("Failed to withdraw join request.");
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error withdrawing join request:", error);
        }
    }
};

  useEffect(() => {
    const fetchProjectDetails = async () => {
        const projectId = project?._id;
        const user = window.localStorage.getItem('user');
        try {
            const response = await fetch(`${base}/project/${projectId}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            setProjectDetails(result.data);
            // if (user !== null) {
            //     const parsedUser = JSON.parse(user);
            //     console.log(parsedUser._id);

            //     // Explicitly define the type of member
            //     const joined = result.data.members.some((member: { _id: string }) => member._id === parsedUser._id);
            //     setIsJoined(joined);
            // }
            if(user !== null){
              const parsedUser = JSON.parse(user);
              
            const isUserALeader = project.leader === parsedUser?._id
            setIsLeader(isUserALeader);
            console.log(isUserALeader);
            const isMember = project.members.includes(parsedUser?._id);
            setIsJoined(isMember);
            const reqStatus = project.joinRequests[0].status
            console.log(reqStatus);
            setIsPending(reqStatus === 'pending');
            setIsJoined(reqStatus === 'pending' ? false : true);
            }
        } catch (err) {
            if (err instanceof Error) {
                setMessage(`Error: ${err.message}`);
            } else {
                setMessage('An unknown error occurred.');
            }
        }
    };

    fetchProjectDetails();
}, [project]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("details")}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "details"
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Details</span>
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "chat"
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat</span>
          </button>
        </nav>

        <div className="mt-auto pt-6">
        {/* {isJoined ? (
  // Show "Leave Project" button if user is already a member
  <Button
    variant="ghost"
    className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
    onClick={() => setShowLeaveDialog(true)}
  >
    <div className="flex items-center space-x-2">
      <LogOut className="w-4 h-4" />
      <span>Leave Project</span>
    </div>
  </Button>
) : isPending ? (
  // Show status if a join request is pending
  <div className="w-full text-center py-2">
    <span className="text-yellow-500 bg-yellow-900/20 rounded px-3 py-1">
      Pending Approval
    </span>
  </div>
) : (
  // Show "Join Project" button if user is not a member and no pending request
  <Button
    variant="primary"
    className="w-full"
    onClick={() => setShowJoinDialog(true)}
  >
    <div className="flex items-center space-x-2">
      <UserPlus className="w-4 h-4" />
      <span>Join Project</span>
    </div>
  </Button>
)} */}
{!isJoined && !isPending && (
            <Button
            variant="primary"
            className="w-full"
            onClick={() => setShowJoinDialog(true)}
          >
            <div className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Join Project</span>
            </div>
          </Button>
          )}

          {isPending && (
            <div className="w-full text-center py-2">
            <span className="text-yellow-500 bg-yellow-900/20 rounded px-3 py-1">
              Pending Approval
            </span>
            <Button
            variant="ghost"
            className="w-full mt-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={handleWithdrawRequest}
        >
            Withdraw Request
        </Button>
          </div>
          )}

          {isJoined && (
            <div>
            <span className="text-green-500">{isLeader? "You are a leader":"You are a member"}</span>
            <Button
    variant="ghost"
    className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
    onClick={() => setShowLeaveDialog(true)}
  >
    <div className="flex items-center space-x-2">
      <LogOut className="w-4 h-4" />
      <span>Leave Project</span>
    </div>
  </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900">
        {activeTab === "details" ? (
          <div className="p-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Project Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-gray-400" />
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    View Repository
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">
                    {JSON.stringify(project.members[0])}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    {project.repoUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ProjectChat projectId={project._id} />
        )}
      </div>

      {/* Leave Project Dialog */}
      <AnimatePresence>
        {showLeaveDialog && (
          <Dialog
            title="Leave Project"
            message= {!isLeader ? "Are you sure you want to leave this project? You'll need to request to join again.": "Are you sure you want to leave this project? THis project will be delete cuz you created this project and the all team members will have been disbanded."}
            confirmLabel="Leave Project"
            confirmVariant="danger"
            onConfirm={handleLeaveProject}
            onCancel={() => setShowLeaveDialog(false)}
          />
        )}
      </AnimatePresence>

      {/* Join Request Dialog */}
      <AnimatePresence>
        {showJoinDialog && (
          <JoinRequestDialog
            projectName={project.title}
            onSubmit={handleJoinRequest}
            onCancel={() => setShowJoinDialog(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
