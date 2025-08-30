import type { RouteConfig } from "@/types/RouteConfig";
import ProtectedRoute from "@/guards/ProtectedRoute";
import GuestGuard from "@/guards/GuestGuard";
import type { ReactElement } from "react";

/**
 * Wraps a route element with protection based on roles and auth requirements
 */
export const protectRoute = (
  element: ReactElement,
  options: {
    allowedRoles?: string[];
    requireAuth?: boolean;
    guestOnly?: boolean;
  } = {}
): ReactElement => {
  const { allowedRoles, requireAuth = true, guestOnly = false } = options;

  if (guestOnly) {
    return <GuestGuard>{element}</GuestGuard>;
  }

  return (
    <ProtectedRoute allowedRoles={allowedRoles} requireAuth={requireAuth}>
      {element}
    </ProtectedRoute>
  );
};

/**
 * Recursively applies protection to routes and their children
 */
export const applyRouteProtection = (
  routes: RouteConfig[],
  defaultProtection?: {
    allowedRoles?: string[];
    requireAuth?: boolean;
    guestOnly?: boolean;
  }
): RouteConfig[] => {
  return routes.map(route => {
    const routeProtection = route.protection || defaultProtection;
    
    return {
      ...route,
      element: route.element && routeProtection 
        ? protectRoute(route.element, routeProtection)
        : route.element,
      children: route.children 
        ? applyRouteProtection(route.children, routeProtection)
        : undefined
    };
  });
};
