import { Fragment } from "react";
import { DefaultLayout } from "../components/Layout";
import Home from "../pages/Home";
import Network from "../pages/Dashboard/Network/Network";
import SharePost from "../pages/Dashboard/Network/SharePost";
import Plan from "../pages/Dashboard/Plan/Plan";
import PlanAI from "../pages/Dashboard/Plan/PlanAI";
import Profile from "../pages/Dashboard/Profile";
import GeneratePlan from "../pages/Dashboard/Plan/GeneratePlan";
import DetailsTrip from "../modules/trips/DetailsTrip";
const publicRoutes = [
  { path: "/", component: Home, layout: Fragment },
  { path: "/network", component: Network, layout: DefaultLayout },
  { path: "/sharepost", component: SharePost, layout: DefaultLayout },
  { path: "/plan", component: Plan, layout: DefaultLayout },
  { path: "/planAI", component: PlanAI, layout: DefaultLayout },
  { path: "/profile", component: Profile, layout: DefaultLayout },
  { path: "/generate-plan", component: GeneratePlan, layout: DefaultLayout },
  { path: "/detail-trip", component: DetailsTrip, layout: DefaultLayout },


];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
