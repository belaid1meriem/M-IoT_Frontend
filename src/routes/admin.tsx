import type { RouteConfig } from "@/types/RouteConfig";
import Admin from "@/pages/Admin";

export const routes: RouteConfig[] = [
  {
    path: "admin",
    element: <Admin/>,
    children: [
      {
        path: "clients",
        element: <div>Clients Page</div>,
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