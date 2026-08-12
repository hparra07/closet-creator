import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Without this, a route's code/assets only start fetching on click — the
    // first visit to any given page has to wait for that fetch mid-navigation,
    // which reads as a stutter/reload. "intent" starts fetching on hover/touch
    // so by the time the click lands, the page is already loaded.
    defaultPreload: "intent",
  });

  return router;
};
