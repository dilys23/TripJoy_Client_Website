import { MdClose, MdFilterList, MdOutlineSearch } from "react-icons/md";
import Button from "../../../components/Button/Button";
import CardGeneratePlan from "../../../modules/planAI/CardGeneratePlan";
import { useState, useEffect } from "react";
import DetailGeneratePlan from "../../../modules/planAI/DetailGeneratePlan";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import { map } from "leaflet";
function GeneratePlan() {
  const [isChoosePlan, setIsChoosePlan] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plans, setPlans] = useState([]);
  const STORAGE_KEY = "tripPlansData";
  const [currentPlan, setCurrentPlan] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        const storedPlans = localStorage.getItem(STORAGE_KEY);
        const currentPlan = JSON.parse(localStorage.getItem("currentPlan"));

        if (storedPlans && currentPlan) {
          const parsedPlans = JSON.parse(storedPlans);
          setCurrentPlan(currentPlan);
          setPlans(parsedPlans);
          setIsLoading(false); // Dữ liệu đã được tải
          clearInterval(intervalId); // Dừng kiểm tra
        }
      } catch (err) {
        console.error("Error fetching trip plans:", err);
        setError("Không thể tải kế hoạch chuyến đi.");
        clearInterval(intervalId); // Dừng kiểm tra khi gặp lỗi
      }
    }, 500); // Kiểm tra mỗi 500ms

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen w-full py-4 lg:px-4">
      <div className="flex w-full flex-col gap-5 sm:w-2/5">
        {/* Search bar */}
        <div className="flex w-full justify-center gap-2 lg:justify-normal">
          <div className="relative h-[37px] w-3/5 rounded-lg bg-white px-2 shadow-lg">
            <div className="absolute left-0 top-0 flex h-[37px] w-[37px] items-center justify-center">
              <MdOutlineSearch className="h-[25px] w-[25px] text-[#b7b7b7]" />
            </div>
            <input
              type="text"
              className="h-full w-full pl-8 pr-2 outline-none"
            />
          </div>
          <Button
            className="flex h-[37px] w-[37px] rounded-lg bg-white text-[#b7b7b7] transition-all duration-150"
            leftIcon={<MdFilterList className="h-[25px] w-[25px] pl-1" />}
          />
          <Button className="rounded-[5px] bg-[#007AFF] px-3 py-2 text-[12px] text-white shadow-lg lg:text-base">
            Gợi ý lại
          </Button>
        </div>
        {/* Tags */}
        <div className="flex w-full flex-wrap justify-center gap-2 lg:justify-normal">
          {plans?.map((plan, index) => (
            <Button
              className="rounded-[20px] bg-white px-3 py-2 text-[12px] shadow-lg lg:text-base"
              rightIcon={<MdClose />}
            >
              {plan.theme}
            </Button>
          ))}
         
        </div>
        {/* Cards */}
        <div className="scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 flex h-[900px] flex-col gap-3 overflow-y-auto">
          {plans?.map((plan, index) => (
            <CardGeneratePlan
              isActive={isChoosePlan === index}
              key={index}
              onClick={() => setIsChoosePlan(index)}
              suggestion={plan.suggestion}
              theme={plan.theme}
              details={plan.details}
            />
          ))}
        </div>
      </div>
      {/* Detail section */}
      <div className="hidden min-h-[80%] rounded-md bg-white shadow-md sm:block sm:w-3/5">
        <DetailGeneratePlan
          startPoint={currentPlan.startLocation}
          endPoint={currentPlan.destination}
          startDate={currentPlan.start_date}
          endDate={currentPlan.end_date}
          budget={currentPlan.budget}
          transportation={currentPlan.transport}
          listLocation={
            plans[isChoosePlan]?.details?.map((detail) => detail.location) || []
          }
          listAddress={
            plans[isChoosePlan]?.details?.map((detail) => detail.address) || []
          }
          listLongitude={
            plans[isChoosePlan]?.details?.map((detail) =>
              parseFloat(detail.longitude),
            ) || []
          }
          listLatitude={
            plans[isChoosePlan]?.details?.map((detail) =>
              parseFloat(detail.latitude),
            ) || []
          }
          totalDistance={plans[isChoosePlan]?.total_distance_km || 0}
        />
      </div>
    </div>
  );
}

export default GeneratePlan;
