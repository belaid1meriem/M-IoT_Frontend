import type { ReactElement } from "react";

export interface RouteConfig {
  path?: string;
  index?: boolean;
  element?: ReactElement;
  children?: RouteConfig[];
  protection?: {
    allowedRoles?: string[];
    requireAuth?: boolean;
    guestOnly?: boolean;
  };
}