import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Mapbox() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 16.061686,
    longitude: 108.227362,
    zoom: 10,
  });
  const [showPopup, togglePopup] = React.useState(false);
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
            latitude={16.061686}
            longitude={108.227362}
            closeButton={true}
            closeOnClick={false}
            anchor="top-right"
          >
            <div>Pop pup marker</div>
          </Popup>
        )}
        <Marker
          latitude={16.061686}
          longitude={108.227362}
          offsetLeft={-20}
          offsetTop={-30}
        >
          <div>
            {" "}
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/color/48/marker--v1.png"
              alt="marker--v1"
            />
          </div>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default Mapbox;
