import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import icon from "./constants";
import "leaflet-geosearch/dist/geosearch.css";
import { act } from "react";

const Map = ({ className }) => {
  const [map, setMap] = useState(null);
  const [endPoint, setEndPoint] = useState(""); // Input for new location
  const [routingControl, setRoutingControl] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null); // GPS position
  const [distance, setDistance] = useState(null);
  const [waypoints, setWaypoints] = useState([
    { lat: 16.467, lng: 107.59 }, // Start (Hue)
    { lat: 16.054, lng: 108.202 }, // End (Da Nang)
  ]);

  useEffect(() => {
    // Initialize map
    const mapInstance = L.map("map").setView([16.054, 108.202], 12); // Da Nang coords
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(mapInstance);

    setMap(mapInstance);

    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        icon,
      },
      style: "button", // or "bar" for a search bar style
      autoComplete: true,
      autoCompleteDelay: 250,
      keepResult: true,
      updateMap: false,
    });

    // Add search control to map
    mapInstance.addControl(searchControl);

    mapInstance.on("geosearch/showlocation", (result) => {
      const { x, y } = result.location;
      if (x && y) {
        mapInstance.setView([y, x], 13); // Center map on the search result
      } else {
        console.error("Invalid bounds for search result.");
      }
    });

    // Get current position via GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);

          // Add marker for current position
          L.marker([latitude, longitude], {
            icon: L.icon({
              iconUrl: "https://img.icons8.com/arcade/44/marker.png",
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            }),
          }).addTo(mapInstance);

          mapInstance.setView([latitude, longitude], 13); // Zoom to current location
        },
        (error) => {
          console.error("Error getting location: ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    }

    const handleMapClick = async (event) => {
      const { lat, lng } = event.latlng;
      setWaypoints((prevWaypoints) => [...prevWaypoints, { lat, lng }]);
      console.log(waypoints);
      L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: "https://img.icons8.com/arcade/44/marker.png",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        }),
      }).addTo(mapInstance);
      calculateRoute();
    };

    mapInstance.on("click", handleMapClick);
    // mapInstance.on("click", addWaypoint);

    return () => {
      mapInstance.off("click", handleMapClick);
      mapInstance.remove();
    };
  }, []);

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address,
        )}`,
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        return { lat, lng };
      } else {
        alert("Không tìm thấy địa chỉ.");
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi lấy tọa độ:", error);
      return null;
    }
  };

  const calculateRoute = () => {
    if (routingControl) {
      routingControl.remove(); // Remove old route
    }

    const control = L.Routing.control({
      waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
      routeWhileDragging: true,
      show: false,
      createMarker: (i, waypoint, n) => {
        const marker = L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl: "https://img.icons8.com/arcade/44/marker.png",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          }),
        });

        marker.bindPopup(
          `<div>
                        <p>Location: (${waypoint.latLng.lat.toFixed(
                          3,
                        )}, ${waypoint.latLng.lng.toFixed(3)})</p>
                        <button id="remove-${i}" class="remove-btn">Remove</button>
                    </div>`,
        );

        marker.on("popupopen", () => {
          document
            .getElementById(`remove-${i}`)
            .addEventListener("click", () => {
              removeWaypoint(i);
            });
        });

        return marker;
      },
    }).addTo(map);

    control.on("routesfound", function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      const totalDistance = (summary.totalDistance / 1000).toFixed(2);
      setDistance(totalDistance);
      const midPoint =
        routes[0].coordinates[Math.floor(routes[0].coordinates.length / 2)];
      L.popup()
        .setLatLng(midPoint)
        .setContent(`Distance: ${totalDistance} km`)
        .openOn(map);
    });

    setRoutingControl(control);
  };

  const addWaypoint = async () => {
    console.log("1111");
    console.log(endPoint);
    if (!endPoint) {
      const coords = await fetchCoordinates(endPoint);
      if (coords) {
        const newWaypoint = coords;
        const updatedWaypoints = [...waypoints];
        updatedWaypoints.push(newWaypoint);
        setWaypoints(updatedWaypoints);
        console.log(waypoints);

        L.marker([coords.lat, coords.lng], {
          icon: L.icon({
            iconUrl: "https://img.icons8.com/arcade/44/marker.png",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          }),
        }).addTo(map);

        calculateRoute();
        setEndPoint("");
      }
    }
  };

  const removeWaypoint = (index) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
    calculateRoute();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        id="map"
        className={`padding-5 relative h-[215px] w-full rounded-[10px]`}
      ></div>
      <div className="absolute left-4 top-4 z-[1200] flex space-x-2">
        <input
          type="text"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          placeholder="Enter address"
          className="rounded p-1 opacity-[95%]"
        />

        <button
          onClick={addWaypoint}
          className="rounded bg-green-500 p-1 text-white"
        >
          Add Waypoint
        </button>
        <button
          onClick={calculateRoute}
          className="rounded bg-blue-500 p-1 text-white"
        >
          Calculate Route
        </button>
      </div>

      {distance && (
        <div className="absolute bottom-4 left-4 z-[1200] rounded bg-white p-2 shadow-md">
          <span>Total Distance: {distance} km</span>
        </div>
      )}
    </div>
  );
};

export default Map;
