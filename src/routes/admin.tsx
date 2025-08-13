import type { RouteConfig } from "@/types/RouteConfig";
import Admin from "@/pages/Admin";
import Clients from "@/components/admin/Clients";
import { Outlet } from "react-router";

export const routes: RouteConfig[] = [
  {
    path: "admin",
    element: <Admin/>,
    children: [
      {
        path: "clients",
        element: <Outlet/>,
        children:[
          {
            index: true,
            element: <Clients/>
          },
          {
            path: ":id",
            element: <div>CLient page</div>
          }
        ]
      },
      {
        path: "admins",
        element: <div>Admins page</div>
      },
      {
        path: "tickets",
        element: <div>Tickets Page</div>,
      },
      
      {
        path: "maintainance",
        element: <div>Maintainance Page</div>,
        children: [
          {
            path: "overview",
            element: <div>Maintainance Overview</div>,
          },
          {
            path: "alerts",
            element: <div>Maintainance History</div>,
          }
        ]
      }
    ],
  },
];