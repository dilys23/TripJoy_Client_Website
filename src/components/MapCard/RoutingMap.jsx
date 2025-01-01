import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdLocationOn } from "react-icons/md";
import "leaflet-routing-machine";
const RoutingMap = (planLocation, mapId) => {
    const mapRef = useRef(null);
    // console.log(planLocation)
    const [coordinates, setCoordinates] = useState({
        latitude: 16.054,
        longitude: 108.202,
    });

    useEffect(() => {
        const locations = planLocation?.planLocation;
        if (!Array.isArray(locations)) {
            console.error("planLocation.planLocation is not an array:", locations);
            return;
        }

        // Use mapRef instead of document.getElementById
        const mapContainer = mapRef.current;
        if (mapContainer && mapContainer._leaflet_id) {
            // Map already initialized, exit the function
            return;
        }

        const map = L.map(mapRef.current, { // Initialize map using mapRef.current
            center: [coordinates.latitude, coordinates.longitude],
            zoom: 10,
            zoomControl: false,
        });

        L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }).addTo(map);

        L.control
            .zoom({
                position: "bottomleft",
            })
            .addTo(map);

        locations.forEach((location, index) => {
            const { coordinates: { latitude, longitude }, name } = location;
            const iconHtml = ReactDOMServer.renderToStaticMarkup(
                <div style={{ position: "relative", textAlign: "center" }}>
                    <MdLocationOn style={{ fontSize: "35px", color: "red" }} />
                    <div
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "80%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            fontSize: "10px",
                            fontWeight: "bold",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            borderRadius: "100px",
                            width: "15px",
                            height: "15px",
                        }}
                    >
                        {index + 1}
                    </div>
                </div>
            );

            const customIcon = L.divIcon({
                className: "custom-marker-icon",
                html: iconHtml,
                iconSize: [30, 50],
                iconAnchor: [15, 50],
            });

            L.marker([latitude, longitude], { icon: customIcon })
                .addTo(map)
                .bindPopup(`<b>${name}</b>`);
        });

        if (locations.length > 1) {
            const waypoints = locations.map((location) =>
                L.latLng(location.coordinates.latitude, location.coordinates.longitude)
            );

            L.Routing.control({
                waypoints,
                createMarker: () => null,
                routeWhileDragging: false,
                lineOptions: {
                    styles: [{ color: "red", opacity: 0.7, weight: 3 }],
                },
            }).addTo(map);
        }

        return () => {
            // Cleanup map instance on component unmount
            if (map) {
                map.off();
                map.remove();
            }
        };
    }, [planLocation, coordinates]); // Add coordinates as dependency to ensure the map updates if they change


    return (

        <div
            ref={mapRef} // This will now reference the map container
            id={`map-${mapId}`} // Optional dynamic ID for multiple maps
            className="z-10 h-full w-full rounded-[10px] border border-slate-300 sm:pt-2"

        ></div>
    );
}

export default RoutingMap;