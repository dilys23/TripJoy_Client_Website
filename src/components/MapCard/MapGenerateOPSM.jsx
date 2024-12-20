import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import icon from "./constants";
import "leaflet-geosearch/dist/geosearch.css";
const Map = ({ listAddress, className, waypoints, setWaypoints }) => {
    const [map, setMap] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null); // GPS position
    const [distance, setDistance] = useState(null);
    const [markers, setMarkers] = useState([]);
    console.log("list",listAddress);
    useEffect(() => {
        // Initialize map
        const mapInstance = L.map("map").setView([16.054, 108.202], 12); // Da Nang coords
        L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }).addTo(mapInstance);
        setMap(mapInstance);
        // Convert listAddress to markers
        const provider = new OpenStreetMapProvider();
        listAddress.forEach(async (addressItem) => {
            const results = await provider.search({ query: addressItem.address });
            if (results && results.length > 0) {
                const { y: lat, x: lng } = results[0];
                const marker = L.marker([lat, lng], {
                    icon: L.icon({
                        iconUrl: "https://img.icons8.com/arcade/44/marker.png",
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                    }),
                }).addTo(mapInstance);
                setMarkers((prev) => [...prev, marker]);
            }
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]);
                    L.marker([latitude, longitude], {
                        icon: L.icon({
                            iconUrl: "https://img.icons8.com/arcade/44/marker.png",
                            iconSize: [40, 40],
                            iconAnchor: [20, 40],
                        }),
                    }).addTo(mapInstance);
                    mapInstance.setView([latitude, longitude], 13);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }
        return () => {
            mapInstance.remove();
        };
    }, [listAddress]); // Re-run useEffect if listAddress changes
    // You can keep the rest of your logic here related to calculateRoute and so on
    return (
        <div className={`relative ${className}`}>
            <div
                id="map"
                className={`padding-5 relative h-[600px] w-full rounded-[10px] border border-slate-300`}
            ></div>
            {distance && (
                <div className="absolute bottom-4 left-4 z-[1200] rounded bg-white p-2 shadow-md">
                    <span>Total Distance: {distance} km</span>
                </div>
            )}
        </div>
    );
};
export default Map;
