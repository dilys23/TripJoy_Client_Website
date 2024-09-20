

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./router"
import { DefaultLayout } from "./components/Layout"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import GlobalStyles from "./components/GlobalStyles";
function App() {

  return (
    <>
      <ToastContainer className="justify-center" />
      {/* <Navbar />
      <Hero />
      <Fetured />
      <Packages />
      <Extension />
      {/* <Discover/> */}
      {/* <Home></Home> */}
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
