import ChangePassword from "@/pages/auth/ChangePassword";
import Login from "@/pages/auth/Login";
import ResetPassword from "@/pages/auth/ResetPassword";
import type { RouteConfig } from "@/types/RouteConfig";
import { Outlet } from "react-router";

export const routes: RouteConfig[] = [
  {
    path: "auth",
    element: <Outlet />,
    children: [
      {
        path: "login",
        element: <Login />,
        protection: {
          guestOnly: true
        }
      },
      {
        path: "change-password",
        element: <ChangePassword/>,
        protection: {
          requireAuth: true
        }
      },
      {
        path: "reset-password",
        element: <ResetPassword/>,
        protection: {
          guestOnly: true
        }
      },
    ]  
  }
];
