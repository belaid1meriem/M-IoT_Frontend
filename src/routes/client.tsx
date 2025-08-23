import type { RouteConfig } from "@/types/RouteConfig";
import Client from "@/pages/Client";
import Dashboard from "@/components/client/Dashboard";
import Machine from "@/components/client/Machine";
import RapportsHirtory from "@/components/client/RapportsHirtory";
import { Outlet } from "react-router";
import Localisation from "@/components/admin/AssetsTracking/Localisation";
import History from "@/components/admin/AssetsTracking/History";
import Plan from "@/components/admin/AssetsTracking/Plan";

export const routes: RouteConfig[] = [
  {
    path: "client/:siteId",
    element: <Client/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },

      {
        path: "machine/:machineId",
        element: <Machine/>,
      },
      
      {
        path: "alerts",
        element: <div>Alerts Page</div>,
      },


      {
        path: "assets-tracking",
        element: <Outlet/>,
        children: [
          {
            path: "statistics",
            element: <div>Assets Tracking Statistics</div>,
          },
          {
            path: "localisation",
            element: <Outlet/>,
            children:[
              {
                index: true,
                element: <Localisation/>,
              },
              {
                path:"history/:trajetId",
                element: <History/>,
              },
              {
                path:"plan",
                element: <Plan/>,
              }
            ]
          }
        ]
      },

      {
        path: "reports",
        element: <Outlet/>,
        children: [
          {
            path: "historique",
            element: <RapportsHirtory/>,
          },
          {
            path: "analyse-graphique",
            element: <div>Analyse graphique</div>,
          },
          {
            path: "analyse-seuil",
            element: <div>Analyse par seuil</div>,
          },
          {
            path: "resume-journalier",
            element: <div>Résumé journalier</div>,
          },
          {
            path: "planification",
            element: <div>Planification</div>,
          },
        ]
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
