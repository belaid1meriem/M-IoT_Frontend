import type { RouteConfig } from "@/types/RouteConfig";
import Admin from "@/pages/Admin";
import Clients from "@/components/admin/Clients";
import { Outlet } from "react-router";
import ClientDetails from "@/components/admin/ClientDetails";
import AddClient from "@/components/admin/AddClient/AddClient";
import AddSite from "@/components/admin/AddSite/AddSite";
import { MultiStepsFormProvider } from "@/contexts/MultiStepsFormContext";
import SiteDetails from "@/components/admin/SiteDetails";

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
            element: <Outlet/>,
            children: [
              {
                index: true,
                element: <ClientDetails/>
              },
              {
                path: "site",
                element: <Outlet/>,
                children: [
                {
                  path:"new",
                  element: <MultiStepsFormProvider totalSteps={6}><AddSite/></MultiStepsFormProvider>
                },
                {
                  path: ":siteId",
                  element: <SiteDetails/>
                },
                ]
              }
            ]
          },
          {
            path:"new",
            element: <MultiStepsFormProvider totalSteps={2}><AddClient/></MultiStepsFormProvider>
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