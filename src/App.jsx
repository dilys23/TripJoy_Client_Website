

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./router"
import { DefaultLayout } from "./components/Layout"
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import Register from "./components/Layout/Register"
import GlobalStyles from "./components/GlobalStyles";
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
function App() {

  return (
    <>

      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page></Page>
                    </Layout>}>
                </Route>)
            })}
          </Routes>
        </div>
      </Router>
    </>

  )
}

export default App
