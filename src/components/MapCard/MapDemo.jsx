import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import ReactDOMServer from "react-dom/server";
import { MdLocationOn } from "react-icons/md";

const MapWithRoute = () => {

    const accessToken = "pk.eyJ1IjoiZGlseXMyMyIsImEiOiJjbTFwNGsxYXAwMGNxMmlvajZ4cTVoNjNwIn0.S12DlUDIneIXNewe0v8IFg"; // Thay bằng token của bạn


    useEffect(() => {
        const map = L.map("map", {
            center: [21.02883125, 105.85253566666667], // Tọa độ trung tâm
            zoom: 13,
        });

        // Thêm Mapbox Tile Layer
        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken,
        }).addTo(map);

        // Waypoints
        const waypoints = [
            L.latLng(21.02883125, 105.85253566666667),
            L.latLng(21.02474512114495, 105.85858839523648),
            L.latLng(21.0160827, 105.85717235000001),
        ];

        // Tạo router tùy chỉnh
        const mapboxRouter = L.Routing.osrmv1({
            serviceUrl: `https://api.mapbox.com/directions/v5/mapbox/driving/`,
            profile: "mapbox/driving",
            accessToken: accessToken,
            timeout: 30000,
        });

        // Routing Control
        const routingControl = L.Routing.control({
            waypoints: waypoints,
            router: mapboxRouter,
            routeWhileDragging: false,
            lineOptions: {
                styles: [{ color: "blue", opacity: 0.8, weight: 5 }],
            },
            createMarker: (i, waypoint) => {
                return L.marker(waypoint.latLng, {
                    icon: L.divIcon({
                        className: "custom-marker-icon",
                        html: `<span style="font-size: 24px; color: red;">📍</span>`,
                    }),
                }).bindPopup(`Waypoint ${i + 1}`);
            },
        }).addTo(map);

        routingControl.on("routesfound", (e) => {
            console.log("Route found:", e.routes[0]);
        });

        routingControl.on("routingerror", (e) => {
            console.error("Routing error:", e);
        });

        return () => {
            map.remove();
        };
    }, []);

    return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default MapWithRoute;
