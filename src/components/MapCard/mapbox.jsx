import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Mapbox() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 16.089203,
    longitude: 108.143345,
    zoom: 10,
  });
  const [showPopup, togglePopup] = React.useState(false);
  const [address, setaddress] = useState("");
  const [addressMarker, setaddressMarker] = useState([]);
  const addressdata = [
    {
      id: 1,
      address: "69 Quang Trung, Thạch Thang, Hải Châu, Đà Nẵng 550000, Vietnam",
    },
    {
      id: 2,
      address:
        "số 59 đường nguyễn lương bằng phường hòa khánh bắc quận liên chiểu thành phố đà nẵng ",
    },
    {
      id: 3,
      address:
        "278 Xô Viết Nghệ Tĩnh, Khuê Trung, Cẩm Lệ, Đà Nẵng 550000, Vietnam",
    },
  ];
  useEffect(() => {
    let newaddressdata = [];

    addressdata.map((address) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address.address,
          )}.json?access_token=pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg`,
        )
        .then(function (response) {
          console.log(response);
          newaddressdata.push({
            ...address,
            longitude: response.data.features[0].center[0],
            latitude: response.data.features[0].center[1],
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    });
    console.log(">>arr new", newaddressdata);
    setaddressMarker(newaddressdata);
  }, []);
  return (
    <div style={{ width: "100%", height: "500px" }}>
      {" "}
      {/* Đặt chiều cao cho container */}
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg"
        onMove={(evt) => setViewport(evt.viewState)} // Cập nhật viewport khi di chuyển bản đồ
      >
        {/* 16.061686, 108.227362    */}
        {showPopup && (
          <Popup
            // latitude={16.061686}
            // longitude={108.227362}
            latitude={16.089203}
            longitude={108.143345}
            closeButton={true}
            closeOnClick={false}
            anchor="top-right"
          >
            <div>Pop pup marker</div>
          </Popup>
        )}
        {addressMarker.map((addressm) => (
          <Marker
            latitude={addressm.latitude}
            longitude={addressm.longitude}
            offsetLeft={-20}
            offsetTop={-30}
          >
            <div>
              <img
                onClick={() => togglePopup(true)}
                width="28"
                height="28"
                src="https://img.icons8.com/color/48/marker--v1.png"
                alt="marker--v1"
              />
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Mapbox;
