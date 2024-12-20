import React, { useEffect, useState } from "react";
import { MdCircle, MdMoreVert } from "react-icons/md";
import fetchTripPlans from "../../services/getAIrecommend";

const CardRecommendationPlan = ({ isActive, onClick }) => {
  const [tripPlans, setTripPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const STORAGE_KEY = "tripPlansData";

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const storedPlans = localStorage.getItem(STORAGE_KEY);
        if (storedPlans) {
          setTripPlans(JSON.parse(storedPlans));
        } else {
          const payload = {
            startLocation: "Sài Gòn",
            destination: "Đà Lạt",
            days: 3,
            start_date: "07/12/2024",
            budget: 5000000,
            transport: "Ô tô",
          };

          const plans = await fetchTripPlans(payload);
          setTripPlans(plans);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
          console.log(plans);
        }
      } catch (err) {
        console.error("Error fetching trip plans:", err);
        setError("Không thể tải kế hoạch chuyến đi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const renderDetails = (details, isActive) => {
    if (!details || !Array.isArray(details)) {
      return <p className="text-gray-500">Không có chi tiết nào.</p>;
    }

    return details.map((detail, index) => (
      <div
        key={index}
        className={`flex items-center ${
          isActive ? "text-white" : "text-black"
        } ml-2 w-full gap-5 text-[15px]`}
      >
        <span className="inline-block w-1/5 text-[12px] lg:w-1/6 lg:text-base">
          {detail.date}
        </span>
        <MdCircle
          className={`${
            isActive ? "" : "z-50 ml-2 rounded-[90px] border-[1px] fill-white"
          }`}
        />
        <span className="inline-block w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] lg:text-base">
          {detail.address}
        </span>
      </div>
    ));
  };

  if (isLoading) {
    return (
      <div className="text-gray-500 flex h-[240px] items-center justify-center">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[240px] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative flex w-full min-w-[260px] max-w-full rounded-[15px] ${
        isActive ? "bg-[#007AFF]" : "border border-[#C2BFBF] bg-white shadow-lg"
      } cursor-pointer flex-col gap-2 px-3 pt-2`}
    >
      {tripPlans.map((plan, index) => {
        const isActiveItem = isActive === index;
        return (
          <div key={index} className="w-full">
            {/* Header */}
            <div className="flex w-full justify-between">
              <span
                className={`${
                  isActiveItem ? "text-white" : "text-black"
                } ml-5 text-[15px] font-bold lg:text-[18px]`}
              >
                {plan.theme || `Gợi ý ${index + 1}`}
              </span>
              <MdMoreVert
                className={`cursor-pointer ${
                  isActiveItem ? "text-white" : "text-black"
                }`}
              />
            </div>

            {/* Details */}
            <div className="relative flex w-full flex-col gap-3 pt-2">
              {renderDetails(plan.details, isActiveItem)}
            </div>

            {/* Nút chọn */}
            <div className="absolute bottom-2 right-5 flex w-full justify-end">
              <button className="flex h-[30px] w-[64px] items-center justify-center rounded-md bg-[#FF9864] px-2 py-2 text-[12px] font-bold text-black transition-all duration-200 hover:bg-[#ea8553] lg:text-base">
                Chọn
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardRecommendationPlan;
