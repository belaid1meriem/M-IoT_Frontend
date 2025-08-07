import Login from "@/pages/auth/Login";
import type { RouteConfig } from "@/types/RouteConfig";
import  { Outlet } from "react-router";

export const routes: RouteConfig[] = [
  {
    path: "auth",
    element: <Outlet />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "reset-password",
        element: <div>Reset Password Page</div>,
      }
    ]  
  }
]