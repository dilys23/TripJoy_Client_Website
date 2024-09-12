import Hero from "./components/Layout/Hero"
import Navbar from "./components/Header/Navbar"
import Fetured from "./components/Layout/Featured"
import Packages from "./components/Layout/Packages"
import Extension from "./components/Layout/Extension"
import Discover from "./components/Layout/Discover"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./router"
import { DefaultLayout } from "./components/Layout"
function App() {

  return (
    <>
      {/* <Navbar />
      <Hero />
      <Fetured />
      <Packages />
      <Extension /> */}
      {/* <Discover/> */}
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
