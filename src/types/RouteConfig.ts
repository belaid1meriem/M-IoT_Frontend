// types/RouteConfig.ts
import type { ReactElement } from "react";

export interface RouteConfig {
  path?: string;
  index?: boolean;
  element: ReactElement;
  children?: RouteConfig[];
}
