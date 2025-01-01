import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { toast } from "react-toastify";
mapboxgl.accessToken = "pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg";

function Mapbox({ listLatitude, listLongitude, listAddress }) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 16.089203,
    longitude: 108.143345,
    zoom: 12,
  });

  const [showPopup, togglePopup] = React.useState(false);
  const [addressMarker, setaddressMarker] = useState([]);
  const [route, setRoute] = useState(null);
  const getBounds = (coordinates) => {
    console.log("vào getBounds", coordinates);
    const lats = coordinates.map(([lng, lat]) => lat);
    const lngs = coordinates.map(([lng, lat]) => lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    return [
      [minLng, minLat], // Góc Tây Nam
      [maxLng, maxLat], // Góc Đông Bắc
    ];
  };
  const fetchRoute = async (addresses) => {
    const coordinates = addresses
      .map((address) => [address.longitude, address.latitude])
      .filter(([longitude, latitude]) => {
        // Loại bỏ tọa độ không hợp lệ hoặc nằm ngoài Việt Nam
        return (
          longitude >= 102.144 &&
          longitude <= 109.465 &&
          latitude >= 8.179 &&
          latitude <= 23.393
        );
      });
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];
    let url;
    if (coordinates.length > 2) {
      const waypoints = coordinates
        .slice(1, -1)
        .map((coord) => coord.join("%2C"))
        .join("%3B");
      url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.join(",")};${waypoints};${end.join(",")}?alternatives=true&geometries=geojson&access_token=pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg`;
    } else {
      url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg`; // Thay thế bằng access token của bạn
    }

    try {
      const response = await axios.get(url);
      const routeGeoJSON = response.data.routes[0].geometry;
      setRoute(routeGeoJSON); // Lưu trữ đường đi vào state
      // Tính toán bounds và cập nhật viewport
      const bounds = getBounds(coordinates);
      const { longitude, latitude, zoom } = new WebMercatorViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      }).fitBounds(bounds, { padding: 50 });

      setViewport({
        width: "100vw",
        height: "100vh",
        latitude,
        longitude,
        zoom,
      });
    } catch (error) {
      toast.error(error);
      console.error("Error fetching route:", error);
    }
  };
  useEffect(() => {
    const updatedCoordinates = listLatitude.map((lon, index) => [
      lon,
      listLongitude[index],
    ]);
    console.log("updatedCoordinates", updatedCoordinates);

    if (listAddress && listAddress.length > 0) {
      let newaddressdata = [];

      const fetchAddressData = async () => {
        for (let i = 0; i < listAddress.length; i++) {
          try {
            const response = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                listAddress[i],
              )}.json?access_token=pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg`,
            );
            newaddressdata.push({
              id: i + 1,
              address: listAddress[i],
              longitude: listLongitude[i],
              latitude: listLatitude[i],
            });
            console.log("new: ", newaddressdata);
          } catch (error) {
            console.error("Error fetching address data:", error);
          }
        }
        setaddressMarker(newaddressdata);
        fetchRoute(newaddressdata);
        setViewport(newaddressdata)
      };
      fetchAddressData();
    }
  }, [listAddress]);



  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg"
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {showPopup && (
          <Popup
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top-right"
          >
            <div>Pop up marker</div>
          </Popup>
        )}
        {addressMarker.map((addressm) => (
          <Marker
            key={addressm.id}
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
                alt="marker"
              />
            </div>
          </Marker>
        ))}
        {route && (
          <Source
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: route.coordinates,
              },
            }}
          >
            <Layer
              id="route"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{ "line-color": "#3D3BF3", "line-width": 4 }}
            />
          </Source>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Mapbox;
