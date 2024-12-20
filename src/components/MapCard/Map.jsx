import React, { useEffect, useState, useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { MdCheckCircleOutline, MdClose, MdLocationOn } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { notification } from "antd";
import locationProvinces from "./locations.json"
import dayjs from 'dayjs';
import 'leaflet-routing-machine';
import { addPlanLocation } from "../../services/planLocation";
const Map = ({ className, plan, planId, planLocation, onLocationAdded }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Lưu nội dung tìm kiếm
  const [marker, setMarker] = useState(null);
  const [locations, setLocations] = useState([]); // Lưu danh sách địa điểm tìm được
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Hiển thị dropdown
  const [province, setProvince] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 16.054, longitude: 108.202 });
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const [formData, setFormData] = useState({
    Longitude: '',
    Latitude: '',
    Name: '',
    Address: '',
    EstimatedStartDate: plan?.estimatedStartDate ? dayjs(plan.estimatedStartDate).format('YYYY-MM-DD') : null
  })

  const openNotificationWithIcon = (type, message, description, isHappy = false) => {
    const icon = isHappy ? (
      <SmileOutlined
        style={{
          color: '#108ee9',
        }}
      />
    ) : (
      <FrownOutlined
        style={{
          color: '#108ee9',
        }}
      />
    );
    api[type]({
      message: message || 'Thông báo',
      description: description || 'Vui lòng điền đủ thông tin.',
      icon: icon,
    });
  };
  console.log(planLocation)

  useEffect(() => {
    if (plan) {
      const provinceName = plan?.provinceEnd?.provinceName;
      setProvince(provinceName);
      const location = locationProvinces.find((loc) => loc.name === provinceName);
      if (location) {
        setCoordinates({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }

    }
  }, [plan])

  useEffect(() => {
    const map = L.map("map", {
      center: [coordinates.latitude, coordinates.longitude],
      zoom: 13,
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
    planLocation?.forEach((location) => {
      const { latitude, longitude, locationName } = location;
      console.log(location);
      const iconHtml = ReactDOMServer.renderToStaticMarkup(<MdLocationOn style={{ fontSize: '35px', color: 'red' }} />);

      const customIcon = L.divIcon({
        className: "custom-marker-icon",
        html: `<div>${iconHtml}</div>`,
        iconSize: [30, 50],
        iconAnchor: [15, 50],
      });

      L.marker([latitude, longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${locationName}</b>`);
    });

    // Vẽ đường đi nếu có nhiều hơn 1 điểm
    if (planLocation?.length > 1) {
      const waypoints = planLocation.map(location => L.latLng(location.latitude, location.longitude));
      console.log(waypoints);
      try {
        const routingControl = L.Routing.control({
          waypoints: waypoints,
          createMarker: () => null,
          routeWhileDragging: false,
          lineOptions: {
            styles: [{ color: "red", opacity: 0.7, weight: 4 }],
          },
        }).addTo(map);

        routingControl.on('routesfound', function (e) {
          console.log('Route found:', e.routes[0]);
        });

        routingControl.on('routingerror', function (e) {
          console.error('Routing error:', e);
          // openNotificationWithIcon('error', 'Lỗi định tuyến', 'Không thể tìm thấy tuyến đường.');
        });
      } catch (error) {
        console.error('Lỗi khi tạo Routing Control:', error);
      }
    }


    const existingMarkers = new Set();
    const markersMap = new window.Map();

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      handleMapClick(map, lat, lng, existingMarkers, markersMap);
    });

    setMapInstance(map);

    return () => {
      map.off();
      map.remove();
    };
  }, [planLocation]);

  // CLICK IN MAP
  const handleMapClick = async (map, lat, lng, existingMarkers, markersMap) => {
    const locationKey = `${lat},${lng}`;

    if (existingMarkers.has(locationKey)) {
      console.log("Marker đã tồn tại tại vị trí này.");
      return;
    }

    try {
      // Gọi API ngược để lấy thông tin địa chỉ
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      if (response.data) {
        const { display_name } = response.data;
        const [name, ...addressParts] = display_name.split(", ");
        const address = addressParts.join(", ");

        // Cập nhật formData và ô tìm kiếm
        setFormData((prevFormData) => ({
          ...prevFormData,
          Longitude: lng,
          Latitude: lat,
          Name: name,
          Address: address,
        }));

        setSearchQuery(display_name);

        // Thêm marker trên bản đồ
        const newMarker = L.marker([lat, lng]).addTo(map);
        newMarker.bindPopup(display_name).openPopup();

        // Lưu vị trí vào tập hợp và bản đồ marker
        existingMarkers.add(locationKey);
        markersMap.set(locationKey, newMarker);

        // Đăng ký sự kiện click để xóa marker
        newMarker.on("click", () => {
          map.removeLayer(newMarker);
          existingMarkers.delete(locationKey);
          markersMap.delete(locationKey);
          console.log(`Marker tại ${locationKey} đã bị xóa.`);
        });
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin địa điểm:", error);
    }
  };

  // SEARCH
  const handleSearch = useCallback(
    async (query) => {
      if (!query.trim()) {
        setLocations([]);
        setIsDropdownVisible(false);
        return;
      }

      try {
        // Gọi API Geocoding của OpenStreetMap (Nominatim) với giới hạn tìm kiếm trong Việt Nam
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=VN`
        );

        setLocations(response.data); // Lưu danh sách kết quả
        setIsDropdownVisible(true); // Hiển thị dropdown
      } catch (error) {
        console.error("Lỗi khi tìm kiếm địa điểm:", error);
      }
    },
    []
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, handleSearch]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);


    if (query.trim()) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  };


  const handleLocationSelect = (location) => {
    const { lat, lon, display_name } = location;
    const [name, ...addressParts] = display_name.split(", ");
    const address = addressParts.join(", ");

    setFormData((prevFormData) => ({
      ...prevFormData,
      Longitude: lon,
      Latitude: lat,
      Name: name,
      Address: address,
    }));
    setState(true);

    if (mapInstance) {
      mapInstance.setView([lat, lon], 14);
      // Xóa marker cũ nếu có
      if (marker) {
        marker.remove();
      }

      // Thêm marker mới
      const newMarker = L.marker([lat, lon]).addTo(mapInstance);
      newMarker.bindPopup(display_name).openPopup();

      setMarker(newMarker);
    }

    setSearchQuery(display_name); // Cập nhật giá trị input
    setIsDropdownVisible(false); // Ẩn dropdown

  };
  useEffect(() => {
    if (mapInstance) {
      mapInstance.setView([coordinates.latitude, coordinates.longitude], 12);
    }
  }, [coordinates]);


  const handleClearSearch = () => {
    setSearchQuery("");
    setLocations([]);
    setIsDropdownVisible(false);
    setState(false);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      EstimatedStartDate: dayjs(value).format('YYYY-MM-DD'),
    }));
  };

  const handleAddPlanLocation = async () => {
    const { Longitude, Latitude, Name, Address, EstimatedStartDate } = formData;
    console.log("formData", formData);
    if (!Longitude || !Latitude || !Name || !Address || !EstimatedStartDate) {
      openNotificationWithIcon('info', undefined, undefined, false);
      return;
    }
    setLoading(true);
    const newFormData = {
      PlanLocation: {
        Longitude: parseFloat(formData.Longitude),
        Latitude: parseFloat(formData.Latitude),
        Name: formData.Name,
        Address: formData.Address,
        EstimatedStartDate: formData.EstimatedStartDate,
      }
    };

    console.log('newFormData', newFormData);
    try {
      const res = await addPlanLocation(planId, newFormData);
      if (res) {
        openNotificationWithIcon('success', 'Thông báo', 'Thêm một địa điểm thành công', true);
      }
      if (onLocationAdded) onLocationAdded();
      handleClearSearch();
      setFormData(prevFormData => ({
        ...prevFormData,
        Longitude: '',
        Latitude: '',
        Name: '',
        Address: ''
      }));
    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className={`relative ${className}`}>
      <div id="map" className="h-[600px] w-full rounded-[10px] border border-slate-300 z-10"></div>

      <div className="absolute top-5 w-full h-[70px] flex justify-center z-50 mx-auto">
        <div className="w-[95%] h-full bg-white opacity-90 rounded-md border border-[#B3B3B3] flex px-3 py-1 gap-3 relative">
          <div className="w-6/12 flex flex-col relative">
            <span className="text-[12px] text-[#1270B0] font-semibold">Địa điểm<span className="text-[red] ml-1 text-[10px]">*</span></span>
            <div className="relative w-full flex items-center border border-[#979797] outline-none rounded px-1">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 border-none outline-none  text-[12px] h-[25.6px] pr-3"
              />
              {/* Clear button */}
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="ml-2 text-transparent  text-md absolute right-0 "
                >
                  <MdClose className="text-black" />
                </button>
              )}
            </div>


            {!state && <div
              className={`absolute top-[50px] w-[300px] bg-white border border-[#979797] rounded-md shadow-md z-50 ${isDropdownVisible && locations.length > 0 ? "block" : "hidden"
                }`}
            >
              {locations.map((location, index) => (
                <React.Fragment key={index}>
                  <div
                    onClick={() => handleLocationSelect(location)}
                    className="px-1 py-1 hover:bg-gray-200 cursor-pointer text-[12px] flex items-center "
                  >
                    <FaMapMarkerAlt className="mr-1 text-[#1270B0] flex items-center" /> {/* Icon location */}
                    <div className="truncate w-full" title={location.display_name}>
                      {location.display_name}
                    </div>
                  </div>
                  {index < locations.length - 1 && <hr className="border-t border-gray-300 my-1" />}
                </React.Fragment>
              ))}

            </div>}
          </div>

          <div className="w-4/12 flex flex-col">
            <span className="text-[12px] text-[#1270B0] font-semibold">Ngày dự tính<span className="text-[red] ml-1 text-[10px]">*</span></span>
            <input
              id="start-date"
              value={formData.EstimatedStartDate}
              onChange={handleDateChange}
              type="date"
              min={dayjs(plan?.estimatedStartDate).format('YYYY-MM-DD')}
              max={dayjs(plan?.estimatedEndDate).format('YYYY-MM-DD')}
              className="border border-[#B3B3B3] outline-none rounded-md px-1 text-[12px] h-[25.6px]"
            />
          </div>
          {/* <div className="w-2/12 flex flex-col">
            <span className="text-[12px] text-[#1270B0] font-semibold">Giờ</span>
            <input
              type="time"
              className="border border-[#B3B3B3] outline-none rounded-md px-1 text-[12px] h-[25.6px]"
            />
          </div> */}
          <div className="w-2/12 flex flex-col min-w-[25.6px] items-center">
            <div className="h-[18px]"></div>
            <div
              disabled={loading}
              onClick={handleAddPlanLocation}
              className={`w-full h-[25.6px] bg-[#0892F0] rounded-md justify-center flex items-center ${loading ? '' : 'cursor-pointer'}`}>
              {loading ? <img className="w-5 h-5 animate-spin" width="24" height="24" src="https://img.icons8.com/?size=100&id=94550&format=png&color=FFFFFF" alt="loading" /> : <MdCheckCircleOutline className="text-white text-[18px] font-bold text-center" />}
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Map;
