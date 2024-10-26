import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./router";
import React, { useState } from "react";
import { DefaultLayout } from "./components/Layout";
import GlobalStyles from "./components/GlobalStyles";
import { APIProvider } from "@vis.gl/react-google-maps";
import CustomMap from "./components/MapCard/CustomMap";
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
// import Mapbox from "./components/MapCard/Mapbox";
import DetailsTrip from "./modules/trips/DetailsTrip";
import Avatar from "./components/Avatar/Avatar";
import Map from "./components/MapCard/MapTest";
import InputSearch from "./components/Input/InputSearch";
import MapSearch from "./components/MapCard/Map";
function App() {
  const [selectPosition, setSelectPosition] = useState(null);
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
          {/* <Avatar
            name="Jane Doe"
            image="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
            className="w-32 hover:opacity-80 "
            onClick={() => alert("Jane Doe clicked!")}
          /> */}
          <DetailsTrip />
          {/* <Mapbox /> */}
          {/* <APIProvider apiKey={'AIzaSyCua2bI_3tFW1T5CnSVDjhmgQkiJxBPTfk'}>
          <CustomMap />
      </APIProvider> */}
          {/* <div className="border flex row w-[100vw] h-[100vw]">

            <div className="border w-[50vw]">
              <Map selectPosition={selectPosition}/>
aaa
            </div>
            <div className="border w-[50vw]">
              <InputSearch selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
            </div>
      </div> */}
          {/* <MapSearch/> */}
        </div>
      </Router>
    </>
  );
}

export default App;