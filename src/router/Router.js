import { DefaultLayout } from "../components/Layout"
import Network from "../pages/Network/Network"
import Plan from "../pages/Plan/Plan"
const publicRoutes = [
    { path: '/', component: Network, layout: DefaultLayout },
    { path: '/plan', component: Plan, layout: DefaultLayout }

]
const privateRoutes = [

]
export { publicRoutes, privateRoutes } 