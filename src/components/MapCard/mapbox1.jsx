import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg";

function Mapbox({listLongitude, listLatitude, listAddress}) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 15.878540899999996,
    longitude: 108.33191,
    zoom: 13,
  });
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    const updatedCoordinates = listLongitude.map((lon, index) => [lon, listLatitude[index]]);
    setCoordinates(updatedCoordinates);
    console.log("Updated coordinates: ", updatedCoordinates);
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [108.33191, 15.878540899999996],
      zoom: 13,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    map.addControl(directions, "top-left");

    if (updatedCoordinates.length > 1) {
      const [origin, ...rest] = updatedCoordinates;
      const destination = rest.pop();

      directions.setOrigin(origin);
      directions.setDestination(destination);

      rest.forEach((waypoint) => {
        directions.addWaypoint(0, waypoint);
      });
    }

    return () => map.remove();
  }, [listLongitude, listLatitude]);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Mapbox;
