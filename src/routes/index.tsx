import type { RouteConfig } from "@/types/RouteConfig";
import { routes as admin  } from "@/routes/admin";
import { routes as client } from "@/routes/client";

export const routes: RouteConfig[]= [
    ...admin, 
    ...client 
];



import { Routes } from "react-router";
import { renderRoutes } from "@/utils/renderRoutes";

const AppRoutes = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;
