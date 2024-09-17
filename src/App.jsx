

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./router"
import { DefaultLayout } from "./components/Layout"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
function App() {

  return (
    <>
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
