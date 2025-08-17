import type { RouteConfig } from "@/types/RouteConfig";
import Admin from "@/pages/Admin";
import Clients from "@/components/admin/Clients";
import { Outlet } from "react-router";
import ClientDetails from "@/components/admin/ClientDetails";
import AddClient from "@/components/admin/AddClient/AddClient";
import AddSite from "@/components/admin/AddSite/AddSite";
import { MultiStepsFormProvider } from "@/contexts/MultiStepsFormContext";

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
            element: <ClientDetails/>
          },
          {
            path:"new",
            element: <MultiStepsFormProvider totalSteps={2}><AddClient/></MultiStepsFormProvider>
          },
          {
            path:"site/new",
            element: <MultiStepsFormProvider totalSteps={5}><AddSite/></MultiStepsFormProvider>
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