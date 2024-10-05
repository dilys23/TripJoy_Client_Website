import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./router";
import { DefaultLayout } from "./components/Layout";
import GlobalStyles from "./components/GlobalStyles";
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
// import Mapbox from "./components/MapCard/Mapbox";
// import Avatar from "./components/Avatar/Avatar";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
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
          </Routes>
          {/* <Avatar
            name="Jane Doe"
            image="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
            className="w-32 hover:opacity-80 "
            onClick={() => alert("Jane Doe clicked!")}
          /> */}

          {/* <Mapbox/> */}
        </div>
      </Router>
    </>
  );
}

export default App;
