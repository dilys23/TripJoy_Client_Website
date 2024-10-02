

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./router"
import { DefaultLayout } from "./components/Layout"
import GlobalStyles from "./components/GlobalStyles";
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
import Mapbox from "./components/MapCard/mapbox";
function App() {
  return (
    <>

      <Router>
        <div className="App">
          {/* <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page></Page>
                    </Layout>
                  }
                ></Route>
              );
            })}
          </Routes> */}
          <Mapbox/>
        </div>
      </Router>
    </>
  );
}

export default App;
