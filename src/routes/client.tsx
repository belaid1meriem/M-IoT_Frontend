import type { RouteConfig } from "@/types/RouteConfig";
import Client from "@/pages/Client";

export const routes: RouteConfig[] = [
  {
    path: "client",
    element: <Client/>,
    // children: [
    //   {
    //     index: true,
    //     element: <Home />,
    //   },
    //   {
    //     path: "settings",
    //     element: <Settings />,
    //   },
    // ],
  },
];
