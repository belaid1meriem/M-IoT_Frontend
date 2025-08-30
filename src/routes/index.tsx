import type { RouteConfig } from "@/types/RouteConfig";
import { routes as adminRoutes } from "@/routes/admin";
import { routes as clientRoutes } from "@/routes/client";
import { routes as authRoutes } from "@/routes/auth";
import { Navigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { applyRouteProtection } from "@/utils/routeProtection";

const HomePage = () => {
  const { accessToken } = useAuth();
  const userRole = localStorage.getItem('role');
  
  // Redirect authenticated users to their dashboard
  if (accessToken && userRole) {
    if (userRole === 'Admin') {
      return <Navigate to="/admin/clients" replace />;
    } else if (userRole === 'Client') {
      const siteId = localStorage.getItem('siteId') || '1';
      return <Navigate to={`/client/${siteId}`} replace />;
    }
  }
  
  // Redirect unauthenticated users to login
  return <Navigate to="/auth/login" replace />;
};

// Define all routes with their protection settings
const allRoutes: RouteConfig[] = [
  ...adminRoutes,
  ...clientRoutes, 
  ...authRoutes,
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  }
];

// Apply protection to all routes
export const routes = applyRouteProtection(allRoutes);

import { Routes } from "react-router";
import { renderRoutes } from "@/utils/renderRoutes";

const AppRoutes = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;