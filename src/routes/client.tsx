import type { RouteConfig } from "@/types/RouteConfig";
import Client from "@/pages/Client";
import Dashboard from "@/components/client/Dashboard";

export const routes: RouteConfig[] = [
  {
    path: "client",
    element: <Client/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },


      {
        path: "alerts",
        element: <div>Alerts Page</div>,
      },


      {
        path: "assets-tracking",
        element: <div>Assets Tracking Page</div>,
        children: [
          {
            path: "statistics",
            element: <div>Assets Tracking Statistics</div>,
          },
          {
            path: "localisation",
            element: <div>Assets Tracking Localisation </div>,
            children:[
              {
                path:"history",
                element: <div>Assets Tracking Localisation History</div>,
              }
            ]
          }
        ]
      },

      {
        path: "reports",
        element: <div>Reports Page</div>,
        children: [
          {
            path: "historique",
            element: <div>Historique des mesures</div>,
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
