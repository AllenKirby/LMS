import { Navigate, Outlet } from "react-router-dom";
import Cookie from "universal-cookie";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const cookies = new Cookie();
  const user = cookies.get("user");

  const userRole = user?.user?.role;

  if (!user) {
    return <Navigate to="/" replace />; // Not logged in
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />; // Unauthorized
  }

  return <Outlet />; // Render child routes
};
