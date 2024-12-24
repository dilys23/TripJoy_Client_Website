import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const Mapbox = ({ listLongitude, listLatitude }) => {
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    // Initialize map
    const mapInstance = L.map("map").setView([16.054, 108.202], 12); // Da Nang coords
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map && listLongitude && listLatitude) {
      // Tạo danh sách tọa độ từ longitudes và latitudes

      const waypoints = listLongitude
        .map((lon, index) => ({
          latLng: L.latLng(listLatitude[index], lon),
        }))
        .filter((point) => {
          return (
            point.latLng.lat >= 8.179 &&
            point.latLng.lat <= 23.393 &&
            point.latLng.lng >= 102.144 &&
            point.latLng.lng <= 109.465
          );
        }); // Lọc bỏ các giá trị không hợp lệ
      console.log("waypoint", waypoints);
      if (waypoints.length === 0) return;

      // Xóa routingControl cũ nếu có
      if (routingControl) {
        map.removeControl(routingControl);
      }

      // Thêm routing control mới
      const newRoutingControl = L.Routing.control({
        waypoints: waypoints.map((point) => point.latLng),
        routeWhileDragging: true,
        createMarker: (i, waypoint) => {
          const marker = L.marker(waypoint.latLng, {
            icon: L.icon({
              iconUrl: "https://img.icons8.com/arcade/44/marker.png",
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            }),
          });
          marker
            .bindTooltip((i + 1).toString(), {
              permanent: true,
              direction: "right",
              className:
                " border-1 border-black w-5 h-6 transform translate-x-10 -translate-y-[10]",
            })
            .openTooltip();
          return marker;
        },
      }).addTo(map);

      setRoutingControl(newRoutingControl);

      // Tính toán bounds và tự động zoom
      const bounds = L.latLngBounds(waypoints.map((point) => point.latLng));
      map.fitBounds(bounds, { padding: [50, 50] }); // Padding để các điểm không sát mép bản đồ
    }
  }, [map, listLongitude, listLatitude]);

  return <div id="map" className="relative z-0 h-[350px] w-full"></div>;
};

export default Mapbox;
