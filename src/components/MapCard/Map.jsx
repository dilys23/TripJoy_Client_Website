import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

const Map = ({ className }) => {
    const [map, setMap] = useState(null);
    const [endPoint, setEndPoint] = useState(''); // Input for new location
    const [routingControl, setRoutingControl] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null); // GPS position
    const [distance, setDistance] = useState(null);
    const [waypoints, setWaypoints] = useState([
        { lat: 16.467, lng: 107.590 }, // Start (Hue)
        { lat: 16.054, lng: 108.202 }  // End (Da Nang)
    ]);

    useEffect(() => {
        // Initialize map
        const mapInstance = L.map('map').setView([16.054, 108.202], 12); // Da Nang coords
        L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
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
                            iconUrl: 'https://img.icons8.com/arcade/44/marker.png',
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
                }
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
            waypoints: waypoints.map(point => L.latLng(point.lat, point.lng)),
            routeWhileDragging: true,
            show: false,
            createMarker: (i, waypoint, n) => {
                const marker = L.marker(waypoint.latLng, {
                    icon: L.icon({
                        iconUrl: 'https://img.icons8.com/arcade/44/marker.png',
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                    })
                });

                // Add popup with information and remove button
                marker.bindPopup(
                    `<div>
                        <p>Location: (${waypoint.latLng.lat.toFixed(3)}, ${waypoint.latLng.lng.toFixed(3)})</p>
                        <button id="remove-${i}" class="remove-btn">Remove</button>
                    </div>`
                );

                // Handle remove button click inside the popup
                marker.on('popupopen', () => {
                    document
                        .getElementById(`remove-${i}`)
                        .addEventListener('click', () => {
                            removeWaypoint(i); // Call function to remove waypoint
                        });
                });

                return marker;
            }
        }).addTo(map);

        control.on('routesfound', function (e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            const totalDistance = (summary.totalDistance / 1000).toFixed(2);
            setDistance(totalDistance);
            const midPoint = routes[0].coordinates[Math.floor(routes[0].coordinates.length / 2)];
            L.popup()
                .setLatLng(midPoint)
                .setContent(`Distance: ${totalDistance} km`)
                .openOn(map);
        });

        setRoutingControl(control);
    };

    const addWaypoint = () => {
        if (endPoint) {
            const [lat, lng] = endPoint.split(',').map(coord => parseFloat(coord.trim()));
            if (!isNaN(lat) && !isNaN(lng)) {
                const newWaypoint = { lat, lng };
                setWaypoints(prevWaypoints => {
                    const updatedWaypoints = [...prevWaypoints, newWaypoint];

                    // Add marker for new waypoint
                    L.marker([lat, lng], {
                        icon: L.icon({
                            iconUrl: 'https://img.icons8.com/arcade/44/marker.png',
                            iconSize: [40, 40],
                            iconAnchor: [20, 40],
                        })
                    }).addTo(map);

                    calculateRoute(); // Recalculate route after adding waypoint
                    return updatedWaypoints;
                });
                setEndPoint(''); // Clear input after adding
            } else {
                alert('Please enter valid coordinates (lat,lng)');
            }
        }
    };

    const removeWaypoint = (index) => {
        setWaypoints(waypoints.filter((_, i) => i !== index));
        calculateRoute(); // Recalculate route after removing waypoint
    };

    return (
        <div className={`relative ${className}`}>
            <div id='map' className={`w-full h-[215px] relative rounded-[10px] padding-5`} ></div>
            <div className="absolute top-4 left-4 z-[1200] flex space-x-2">
                <input
                    type="text"
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)}
                    placeholder='Enter coordinates (lat,lng)'
                    className='p-1 rounded opacity-[95%]'
                />
                <button
                    onClick={addWaypoint}
                    className='bg-green-500 text-white p-1 rounded'
                >
                    Add Waypoint
                </button>
                <button
                    onClick={calculateRoute}
                    className='bg-blue-500 text-white p-1 rounded'
                >
                    Calculate Route
                </button>
            </div>

            {distance && (
                <div className="absolute bottom-4 left-4 z-[1200] bg-white p-2 rounded shadow-md">
                    <span>Total Distance: {distance} km</span>
                </div>
            )}
        </div>
    );
};

export default Map;
