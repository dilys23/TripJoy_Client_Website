import { DefaultLayout } from "../components/Layout"
import Network from "../pages/Network/Network"
import Plan from "../pages/Plan/Plan"
import Home from "../pages/Home"
import { Fragment } from "react"
const publicRoutes = [
    { path: '/', component: Home, layout: Fragment },
    { path: '/network', component: Network, layout: DefaultLayout },
    { path: '/plan', component: Plan, layout: DefaultLayout }

]
const privateRoutes = [

]
export { publicRoutes, privateRoutes } 