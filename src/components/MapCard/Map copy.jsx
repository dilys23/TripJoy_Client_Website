import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

const Map = ({className}) => {
    const [map, setMap] = useState(null);
    const [startPoint, setStartPoint] = useState(''); // Điểm bắt đầu (toạ độ nhập)
    const [endPoint, setEndPoint] = useState(''); // Điểm kết thúc (toạ độ nhập)
    const [routingControl, setRoutingControl] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null); // Vị trí hiện tại từ GPS
    const [distance, setDistance] = useState(null);
    useEffect(() => {
        // Khởi tạo bản đồ
        const mapInstance = L.map('map').setView([16.054, 108.202], 12); // Tọa độ Đà Nẵng
        L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }).addTo(mapInstance);
        setMap(mapInstance);

        // Lấy vị trí hiện tại qua GPS
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude, longitude);
                    setCurrentPosition([latitude, longitude]);

                    // Thêm marker cho vị trí hiện tại
                    L.marker([latitude, longitude], {
                        icon: L.icon({
                            iconUrl: 'https://img.icons8.com/arcade/44/marker.png', // URL của icon tùy chỉnh
                            iconSize: [40, 40],
                            iconAnchor: [20, 40],
                        }),
                    }).addTo(mapInstance);
                    
                    mapInstance.setView([latitude, longitude], 13); // Tự động zoom tới vị trí hiện tại
                },
                (error) => {
                    console.error("Lỗi định vị: ", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        }

        // Dọn dẹp khi component bị hủy
        return () => {
            mapInstance.remove();
        };
    }, []);

    // Xử lý tính toán route khi nhấn nút "Search"
    const calculateRoute = () => {
        if (routingControl) {
            routingControl.remove(); // Xóa routing cũ nếu có
        }

        const control = L.Routing.control({
            waypoints: [
                // L.latLng(currentPosition[0], currentPosition[1]), // Sử dụng vị trí hiện tại từ GPS làm điểm bắt đầu
                L.latLng(startPoint.split(',')), // Điểm bắt đầu nhập vào
                // L.latLng(endPoint.split(',')) // Điểm đích nhập vào
                L.latLng(...endPoint.split(',')) // Điểm đích nhập vào
            ],
            routeWhileDragging: true,
            show: false,
            createMarker: (i, waypoint, n) => {
                // Tùy chỉnh icon cho marker
                if (i === 0 || i === n - 1) {
                    return L.marker(waypoint.latLng, {
                        icon: L.icon({
                            iconUrl: 'https://img.icons8.com/arcade/44/marker.png',
                            iconSize: [40, 40],
                            iconAnchor: [20, 40],
                        })
                    });
                }
            }
        }).addTo(map);

        control.on('routesfound', function(e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            const totalDistance = (summary.totalDistance / 1000).toFixed(2); // Đổi ra km
            setDistance(totalDistance);
            const midPoint = routes[0].coordinates[Math.floor(routes[0].coordinates.length / 2)];
            const distancePopup = L.popup()
                .setLatLng(midPoint)
                .setContent(`Distance: ${totalDistance} km`)
                .openOn(map);
        });

        control.on('waypointschanged', function () {
            control.route();
        });

        

        setRoutingControl(control);
    };

    return (
        <div className={`relative  ${className}`}>
            {/* Bản đồ */}
            {/* <div id="map" className="w-[1249px] h-[315px]  rounded-[10px] padding-5"></div> */}
            <div id='map' className={`w-full h-[215px] relative rounded-[10px] padding-5"`}></div>
            {/* Search input nằm trong bản đồ nhưng được overlay */}
            <div className="absolute top-4 left-4 z-[1200] flex space-x-2">
                <input 
                    type="text" 
                    value={startPoint} 
                    onChange={(e) => setStartPoint(e.target.value)} 
                    placeholder='Bắt đầu (nếu cần)' 
                    className='p-1 rounded opacity-[95%]' 
                />
                <input 
                    type="text" 
                    value={endPoint} 
                    onChange={(e) => setEndPoint(e.target.value)} 
                    placeholder='Kết thúc (lat,lng)' 
                    className='p-1 rounded opacity-[95%]' 
                />
                <button 
                    onClick={calculateRoute} 
                    className='bg-blue-500 text-white p-1 rounded'
                >
                    Search
                </button>
            </div>
            
        </div>
    );
};

export default Map;
