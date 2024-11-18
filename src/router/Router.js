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
import DetailPlanAI from "../modules/planAI/DetailPlanAI";
import MyProfile from "../pages/Dashboard/Profile/MyProfile";
const publicRoutes = [
  { path: "/", component: Home, layout: Fragment },
  { path: "/network", component: Network, layout: DefaultLayout },
  { path: "/sharepost", component: SharePost, layout: DefaultLayout },
  { path: "/plan", component: Plan, layout: DefaultLayout },
  { path: "/planAI", component: PlanAI, layout: DefaultLayout },
  { path: "/profile/:id", component: MyProfile, layout: DefaultLayout },
  { path: "/generate-plan", component: GeneratePlan, layout: DefaultLayout },
  { path: "/detail-trip", component: DetailsTrip, layout: DefaultLayout },
  { path: "/detail-plan-ai", component: DetailPlanAI, layout: DefaultLayout },


];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
