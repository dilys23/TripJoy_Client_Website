import { Fragment } from "react";
import { DefaultLayout } from "../components/Layout";
import Home from "../pages/Home";
import Network from "../pages/Dashboard/Network/Network";
import SharePost from "../pages/Dashboard/Network/SharePost";
import Plan from "../pages/Dashboard/Plan/Plan";
const publicRoutes = [
  { path: "/", component: Home, layout: Fragment },
  { path: "/network", component: Network, layout: DefaultLayout },
  { path: "/sharepost", component: SharePost, layout: DefaultLayout },
  { path: "/plan", component: Plan, layout: DefaultLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
