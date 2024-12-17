import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import icon from "./constants";
import "leaflet-geosearch/dist/geosearch.css";
import { act } from "react";

const Map = ({ listLongitude, listLatitude }) => {
    const [map, setMap] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null); // GPS position
    const [distance, setDistance] = useState(null);

    
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
            style: "button",
            autoComplete: true,
            autoCompleteDelay: 250,
            keepResult: true,
            updateMap: false,
        });

        mapInstance.addControl(searchControl);
        mapInstance.on("geosearch/showlocation", async (result) => {
            if (result.location) {
                const { x, y } = result.location;
                mapInstance.setView([y, x], 13);

                setWaypoints((prevWaypoints) => {
                    let position = prevWaypoints.length - 1; // Tính vị trí n-1

                    // Tạo một bản sao của prevWaypoints và thêm phần tử mới vào vị trí n-1
                    const updatedWaypoints = [...prevWaypoints]; // Sao chép mảng trước đó
                    updatedWaypoints.splice(position, 0, { lat: y, lng: x }); // Chèn phần tử mới

                    console.log("Cập nhật waypoints", updatedWaypoints);

                    return updatedWaypoints; // Trả về mảng đã cập nhật
                });
                calculateRoute();
            } else {
                console.error("Không thể xác định vị trí tìm kiếm.");
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
            const clickedPoint = { lat, lng }; // Tọa độ của điểm được nhấp
            console.log("1234", lat, lng);
            const start = { lat: 10.762, lng: 106.659 }; // Điểm bắt đầu
            const end = { lat: 10.763, lng: 106.661 }; // Điểm kết thúc
            const updateWaypoint = setWaypoints((prevWaypoints) => {
                let position = prevWaypoints.length - 1; // Tính vị trí n-1

                // Tạo một bản sao của prevWaypoints và thêm phần tử mới vào vị trí n-1
                const updatedWaypoints = [...prevWaypoints]; // Sao chép mảng trước đó
                updatedWaypoints.splice(position, 0, { lat, lng }); // Chèn phần tử mới

                console.log("Cập nhật waypoints", updatedWaypoints);

                return updatedWaypoints; // Trả về mảng đã cập nhật
            });
            console.log("handle map", waypoints);
            const newMarker = L.marker([lat, lng], {
                icon: L.icon({
                    iconUrl: "https://img.icons8.com/arcade/44/marker.png",
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                }),
            }).addTo(mapInstance);
            const updateMarker = setMarkers((prevMarkers) => {
                const updatedMarkers = [...prevMarkers, newMarker];
                console.log("Cập nhật markers", updatedMarkers);
                return updatedMarkers; // Trả về mảng mới
            });
            calculateRoute(updateWaypoint);

        };
        mapInstance.on("click", handleMapClick);
        return () => {
            mapInstance.off("click", handleMapClick);
            mapInstance.remove();
        };
    }, []);

    const calculateRoute = (newWaypoints = []) => {
        console.log("vào hàm calculateRoute");
        console.log("routingControl", routingControl);

        if (routingControl) {
            routingControl.remove(); // Xoá lộ trình cũ nếu có
        }
        const waypointsToUse =
            Array.isArray(newWaypoints) && newWaypoints.length > 0
                ? newWaypoints
                : waypoints;
        console.log("in ra way mới", waypointsToUse);
        // markers.forEach((marker) => map.removeLayer(marker));

        // Sử dụng các điểm dừng trong `waypoints` để tính lộ trình
        const control = L.Routing.control({
            waypoints: waypointsToUse.map((point) => L.latLng(point.lat, point.lng)),
            routeWhileDragging: true,
            show: false,
            createMarker: (i, waypoint, n) => {
                console.log('vào hàm createrMarker', i, waypoint);
                const marker = L.marker(waypoint.latLng, {
                    icon: L.icon({
                        iconUrl: "https://img.icons8.com/arcade/44/marker.png",
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                    }),
                });
                console.log("qua control");
                marker.bindPopup(
                    `<div>
            <p>Location: (${waypoint.latLng.lat.toFixed(3)}, ${waypoint.latLng.lng.toFixed(3)})</p>
            <button id="remove-${i}" className="remove-btn">Remove</button>
          </div>`,
                );

                marker.on("popupopen", () => {
                    // Thêm sự kiện `click` vào nút "Remove"
                    document
                        .getElementById(`remove-${i}`)
                        .addEventListener("click", () => {
                            removeWaypoint(i); // Gọi hàm `removeWaypoint` với chỉ số `i`
                        });
                });

                return marker;
            },
        }).addTo(map);

        control.on("routesfound", function (e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            const totalDistance = (summary.totalDistance / 1000).toFixed(2); // Chuyển đổi sang km
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

    const removeWaypoint = (index) => {
        console.log("remove click");

        // Update waypoints and markers
        setWaypoints((prevWaypoints) => {
            const newWaypoints = prevWaypoints.filter((_, i) => i !== index); // Remove the waypoint
            console.log("waypoints after remove", newWaypoints);

            setMarkers((prevMarkers) => {
                const newMarkers = prevMarkers.filter((_, i) => i !== index); // Remove the marker from state

                // Remove the marker from the map
                if (prevMarkers[index]) {
                    console.log("xóa marker ", prevMarkers[index]);
                    map.removeLayer(prevMarkers[index]); // Ensure the marker is removed from the map
                }

                console.log("markers after remove", newMarkers);
                return newMarkers; // Update markers state
            });

            // Remove the routing control and re-calculate the route
            if (routingControl) {
                console.log(routingControl);
                routingControl.remove(); // Remove the existing route
            }

            // Recalculate the route with the updated waypoints
            calculateRoute(newWaypoints); // Use updated waypoints
            return newWaypoints; // Update waypoints state
        });
    };

    return (
        <div className={`relative ${className}`}>
            <div
                id="map"
                className={`padding-5 relative h-[600px] w-full rounded-[10px] border border-slate-300`}
            ></div>
            <div className="absolute left-3 top-16 z-[1200] mt-[60px] flex space-x-2">
                <button
                    onClick={calculateRoute}
                    className="rounded bg-blue-500 p-1 text-sm text-white"
                >
                    Calculate
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
