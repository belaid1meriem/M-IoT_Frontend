import type { RouteConfig } from "@/types/RouteConfig";
import App from "@/App";

export const routes: RouteConfig[] = [
  {
    path: "admin",
    element: <App/>,
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