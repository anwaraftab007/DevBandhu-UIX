import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthRedirectRouteProps {
  children: ReactNode;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthRedirectRoute2: React.FC<AuthRedirectRouteProps> = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/auth" />; // Redirect to login if not logged in
  }
  return <>{children}</>; // Allow access to children if logged in
};

export default AuthRedirectRoute2;
