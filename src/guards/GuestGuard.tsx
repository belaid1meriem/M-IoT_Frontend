import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const userRole = localStorage.getItem('role');
  
  if (userRole) {
    // Redirect authenticated users to their appropriate dashboard
    if (userRole === 'Admin') {
      return <Navigate to="/admin/clients" replace />;
    } else if (userRole === 'Client') {
      const siteId = localStorage.getItem('siteId') || '1';
      return <Navigate to={`/client/${siteId}`} replace />;
    }
  }
  
  return <>{children}</>;
};

export default GuestGuard;