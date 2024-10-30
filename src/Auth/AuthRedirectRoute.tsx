import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthRedirectRouteProps {
  children: React.ReactElement;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthRedirectRoute: React.FC<AuthRedirectRouteProps> = ({ children, isLoggedIn, setIsLoggedIn }) => {
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />; // Redirect to profile if logged in
  }
  const childWithProps = React.cloneElement(children, { setIsLoggedIn });

  return <>{childWithProps}</>;// Allow access to children (like Register/Login) if not logged in
};

export default AuthRedirectRoute;
