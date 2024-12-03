import React, { useEffect, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5"; // Import close icon
import { FaBowlRice, FaBuildingColumns } from "react-icons/fa6";
import Button from "../Button/Button";

const Map = ({ className }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Lưu nội dung tìm kiếm
  const [marker, setMarker] = useState(null);
  const [locations, setLocations] = useState([]); // Lưu danh sách địa điểm tìm được
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Hiển thị dropdown
  const [province, setProvince] = useState('Đà Nẵng')
  useEffect(() => {
    // Khởi tạo bản đồ
    const map = L.map("map", {
      center: [16.054, 108.202], // Đà Nẵng
      zoom: 12,
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

    // Lưu instance của bản đồ
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

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

  // Debounce logic để trì hoãn API call
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500); // Trì hoãn 500ms

    return () => clearTimeout(delayDebounce); // Hủy bỏ timeout nếu searchQuery thay đổi
  }, [searchQuery, handleSearch]);

  const handleLocationSelect = (location) => {
    const { lat, lon, display_name } = location;

    if (mapInstance) {
      // Di chuyển bản đồ tới vị trí mới
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

  const handleClearSearch = () => {
    setSearchQuery(""); // Xóa nội dung tìm kiếm
    setLocations([]); // Xóa danh sách địa điểm
    setIsDropdownVisible(false); // Ẩn dropdown
  };
  const [selectedOption, setSelectedOption] = useState("Địa điểm du lịch");
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "Địa điểm du lịch", icon: <FaBuildingColumns /> },
    { label: "Quán ăn", icon: <FaBowlRice /> },
    { label: "Nơi ở", icon: <FaBed /> },
  ];
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div id="map" className="h-[600px] w-full rounded-[10px] border border-slate-300 z-10"></div>

      <div className="absolute top-5 w-full h-[70px] flex justify-center z-50 mx-auto">
        <div className="w-[95%] h-full bg-white opacity-90 rounded-md border border-[#B3B3B3] flex px-2 py-1 gap-1 relative">
          <div className="w-5/12 flex flex-col relative">
            <span className="text-[12px] text-[#1270B0] font-semibold">Địa điểm</span>
            <div className="relative w-full flex items-center border border-[#979797] outline-none rounded px-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none  outline-none  text-[12px] h-[25.6px]"
              />
              {/* Clear button */}
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="ml-1 text-[#1270B0] text-md absolute right-0 "
                >
                  <IoCloseCircle />
                </button>
              )}
            </div>


            <div
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

            </div>
          </div>
          <div className="w-1/12 flex flex-col">
            <div className="h-[18px]"></div>
            <div
              className="w-full h-[25.6px] rounded-md justify-center mx-auto flex items-center cursor-pointer relative">
              <Button className="h-full flex justify-center w-full items-center " hide onClick={() => setIsOpen(!isOpen)} normalBtn leftIcon={selectedOption === "Địa điểm du lịch" ? <FaBuildingColumns /> : selectedOption === "Quán ăn" ? <FaBowlRice /> : <FaBed />}></Button>
              {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-[100px] bg-white border border-[#CCD0D5] rounded-md shadow-lg z-10">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option.label)}
                      className="px-1 py-2 cursor-pointer hover:bg-gray-100 text-[10px] flex items-center space-x-2"
                    >
                      <span >{option.icon}</span>
                      <span>{option.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-3/12 flex flex-col">
            <span className="text-[12px] text-[#1270B0] font-semibold">Ngày dự tính</span>
            <input
              type="date"
              className="border border-[#B3B3B3] outline-none rounded-md px-1 text-[12px] h-[25.6px]"
            />
          </div>
          <div className="w-2/12 flex flex-col">
            <span className="text-[12px] text-[#1270B0] font-semibold">Giờ</span>
            <input
              type="time"
              className="border border-[#B3B3B3] outline-none rounded-md px-1 text-[12px] h-[25.6px]"
            />
          </div>
          <div className="w-1/12 flex flex-col min-w-[25.6px] items-center">
            <div className="h-[18px]"></div>
            <div className="w-full h-[25.6px] bg-[#0892F0] rounded-md justify-center flex items-center cursor-pointer">
              <MdCheckCircleOutline className="text-white text-[18px] font-bold text-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
