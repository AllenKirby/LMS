import React, { ReactNode } from "react";
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: string[];
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const cookies = new Cookies();
  const user_cookie = cookies.get('user');

  try {
    if (!user_cookie) {
      console.error('No user cookie found.');
      return <Navigate to="/" replace />;
    }

    const { role } = user_cookie.user;

    if (!role) {
      return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    console.error('Error parsing cookie data:', error);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
