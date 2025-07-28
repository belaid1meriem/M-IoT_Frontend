import { Route } from "react-router";
import type { RouteConfig } from "@/types/RouteConfig";

export const renderRoutes = (routes: RouteConfig[]) =>
  routes.map((route, i) => {
    const { path, index, element, children } = route;

    if (index) {
      // Index routes can't have path or children
      return <Route key={i} index element={element} />;
    }

    return (
      <Route key={i} path={path} element={element}>
        {children ? renderRoutes(children) : null}
      </Route>
    );
  });
