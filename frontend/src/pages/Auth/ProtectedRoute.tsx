// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  userRole: string | null;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  allowedRoles,
  userRole,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
