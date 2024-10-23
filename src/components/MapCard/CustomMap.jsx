import "./Map.css";
import React, { useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

// Thay thế bằng style JSON của bạn
const mapStyles = [
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e9e9e9"
      },
      {
        "lightness": 17
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      },
      {
        "lightness": 20
      }
    ]
  },
  // Bạn có thể thêm nhiều style ở đây
];

const CustomMap = () => {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  return (
    <div className="map-container">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
        options={{
          styles: mapStyles,  // Thêm styles vào đây
        }}
      >
        <Marker position={markerLocation} />
      </Map>
    </div>
  );
}

export default CustomMap;
