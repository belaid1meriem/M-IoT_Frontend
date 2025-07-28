import type { RouteConfig } from "@/types/RouteConfig";
import Admin from "@/pages/Admin";

export const routes: RouteConfig[] = [
  {
    path: "admin",
    element: <Admin/>,
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