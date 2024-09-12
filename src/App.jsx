import Hero from "./components/Layout/Hero"
import Navbar from "./components/Header/Navbar"
import Fetured from "./components/Layout/Featured"
import Login from "./components/Layout/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./router"
import { DefaultLayout } from "./components/Layout"
function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Fetured />
      {/* <Router>
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
      </Router> */}
    </>
  )
}

export default App
