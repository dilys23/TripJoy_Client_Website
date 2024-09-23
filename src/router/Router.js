import { Fragment } from "react"
import { DefaultLayout } from "../components/Layout"
import Home from "../pages/Home"
import Network from "../pages/Network/Network"
import Plan from "../pages/Plan/Plan"
const publicRoutes = [
    { path: '/', component: Home, layout: Fragment },
    { path: '/network', component: Network, layout: DefaultLayout },
    { path: '/plan', component: Plan, layout: DefaultLayout }

]
const privateRoutes = [

]
export { publicRoutes, privateRoutes } 