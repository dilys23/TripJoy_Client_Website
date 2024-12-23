import axios from "axios";
import { MdCircle, MdMoreVert } from "react-icons/md";
import addGenarateTripbyAI from "../../services/addGenarateTripbyAI";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CardRecommendationPlan({
  isActive,
  onClick,
  suggestion,
  details,
  startPoint,
  endPoint,
  startDate,
  endDate,
  budget,
  transport,
  listLocation,
  listLongitude,
}) {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const handleSavePlan = async () => {
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      if (isNaN(d)) {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
      }
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    const planLocations = details.map((detail, index) => ({
      Latitude: detail.latitude || "0",
      Longitude: detail.longitude || "0",
      Name: detail.location || "Activity not provided",
      Address: detail.address || "No address provided",
      EstimatedStartDate: formatDate(detail.date || startDate),
    }));
    console.log("Plan locations:", planLocations);

    const payload = {
      Plan: {
        Title: suggestion,
        StartDate: formatDate(startDate),
        EndDate: formatDate(endDate),
        EstimatedBudget: parseInt(budget.replace(/\./g, "")),
        ProvinceStart: startPoint,
        ProvinceEnd: endPoint,
        Method: transport,
        Vehicle: 0,
        PlanLocations: planLocations,
      },
    };
    console.log("Payload:", payload);

    try {
      const response = await addGenarateTripbyAI(payload);

      console.log("Response:", response);
      return response;
      // Handle response
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleButtonClick = async () => {
    const result = await handleSavePlan();
    if (result?.planId) {
      // Kiểm tra nếu có planId
      setResponse(result);
      navigate(`/detail-plan/${result.planId}`); // Chuyển hướng với planId
    } else {
      console.error("Plan ID not found in response");
    }
  };
  return (
    <div
      onClick={onClick}
      className={`flex w-full min-w-[260px] max-w-[260px] rounded-[15px] md:min-w-[260px] md:max-w-[240px] lg:min-w-[300px] lg:max-w-[500px] ${isActive ? "bg-[#007AFF]" : "border border-[#C2BFBF] bg-white shadow-lg"} cursor-pointer flex-col gap-2 px-3 pt-2`}
    >
      {/* Header */}
      <div className="flex w-full justify-between">
        <span
          className={`${isActive ? "text-white" : "text-black"} mb-2 text-[15px] font-bold lg:text-[18px]`}
        >
          {suggestion}
        </span>
        <MdMoreVert
          className={`${isActive ? "text-white" : "text-black"} cursor-pointer`}
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-[-10px] h-[10px] w-full rounded-[5px] border bg-white">
        <div className="h-full w-1/3 rounded-[5px] bg-[#6FFFC3]"></div>
      </div>

      {/* Details Section */}
      <div className="relative mb-3 flex min-h-fit flex-col gap-2 p-5">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`flex items-center ${isActive ? "text-white" : "text-black"} w-full gap-2 text-[14px]`}
          >
            <span className="mr-2 inline-block w-1/5 text-[12px] lg:w-1/6 lg:text-base">
              {detail.date || "N/A"}
            </span>
            {isActive ? (
              <MdCircle className="ml-2 w-4" />
            ) : (
              <MdCircle className="ml-2 w-4 text-[#717171]" />
            )}
            <div className="ml-2 mt-5 flex w-full flex-col">
              <span className="overflow-hidden text-ellipsis font-bold lg:text-base">
                {detail.location || "Activity not provided"}
              </span>
              <span className="overflow-hidden text-ellipsis lg:text-sm">
                {detail.address || "No address provided"}
              </span>
            </div>
          </div>
        ))}
        <div className="absolute flex h-full w-full flex-row items-center gap-[14px]">
          <div className="inline-block w-1/5 lg:w-1/6"></div>
          <div
            className={`border-l-[1px] ${isActive ? "border-white" : "border-[#717171]"} mb-11 ml-2 h-[92%] border`}
          ></div>
          <div className="w-2/3"></div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bottom-2 right-5 flex w-full justify-end">
        <button
          className="mb-2 flex h-[30px] w-[64px] items-center justify-center rounded-md bg-[#FF9864] text-[12px] font-bold text-black transition-all duration-200 hover:bg-[#ea8553] lg:text-base"
          onClick={handleButtonClick}
        >
          Chọn
        </button>
      </div>
    </div>
  );
}

export default CardRecommendationPlan;
