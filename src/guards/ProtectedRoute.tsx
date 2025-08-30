import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const userRole = localStorage.getItem('role');
  const isAuthenticated = !!userRole;
  
  // Check if user is authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  // Check if user has required role
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on user's actual role
    if (userRole === 'Admin') {
      return <Navigate to="/admin/clients" replace />;
    } else if (userRole === 'Client') {
      const siteId = localStorage.getItem('siteId') || '1';
      return <Navigate to={`/client/${siteId}`} replace />;
    }
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;