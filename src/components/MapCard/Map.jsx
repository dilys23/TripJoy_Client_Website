import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

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

    // Cleanup map instance on component unmount
    return () => {
      mapInstance.remove();
    };
  }, []);

  // Recalculate route whenever waypoints are updated
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

        // Add popup with information and remove button
        marker.bindPopup(
          `<div>
                        <p>Location: (${waypoint.latLng.lat.toFixed(3)}, ${waypoint.latLng.lng.toFixed(3)})</p>
                        <button id="remove-${i}" class="remove-btn">Remove</button>
                    </div>`,
        );

        // Handle remove button click inside the popup
        marker.on("popupopen", () => {
          document
            .getElementById(`remove-${i}`)
            .addEventListener("click", () => {
              removeWaypoint(i); // Call function to remove waypoint
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
  const addWaypoint = () => {
    if (endPoint) {
      const [lat, lng] = endPoint
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        const newWaypoint = { lat, lng };
        const newLatLng = L.latLng(lat, lng);

        // Tìm vị trí chèn hợp lý cho điểm mới trong tuyến đường hiện tại
        let insertIndex = 1; // Vị trí chèn mặc định là sau điểm bắt đầu
        let minDistance = Infinity;

        for (let i = 0; i < waypoints.length - 1; i++) {
          const start = L.latLng(waypoints[i].lat, waypoints[i].lng);
          const end = L.latLng(waypoints[i + 1].lat, waypoints[i + 1].lng);

          // Tính khoảng cách từ điểm mới đến đoạn giữa các điểm trong tuyến đường
          const segmentDistance =
            newLatLng.distanceTo(start) + newLatLng.distanceTo(end);
          if (segmentDistance < minDistance) {
            minDistance = segmentDistance;
            insertIndex = i + 1; // Đặt vị trí chèn giữa hai điểm hiện tại
          }
        }

        // Thêm điểm mới vào tuyến đường tại vị trí chèn đã xác định
        const updatedWaypoints = [...waypoints];
        updatedWaypoints.splice(insertIndex, 0, newWaypoint);
        setWaypoints(updatedWaypoints);

        // Thêm marker và tính lại tuyến đường
        L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: "https://img.icons8.com/arcade/44/marker.png",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          }),
        }).addTo(map);

        calculateRoute(); // Tính lại tuyến đường sau khi thêm điểm
        setEndPoint(""); // Xóa input sau khi thêm
      } else {
        alert("Please enter valid coordinates (lat,lng)");
      }
    }
  };

  const removeWaypoint = (index) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
    calculateRoute(); // Recalculate route after removing waypoint
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
          placeholder="Enter coordinates (lat,lng)"
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
