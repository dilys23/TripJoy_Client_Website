import planImage from "../../../assets/images/planIcon.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import recom1 from "../../../assets/images/recom1.png";
import recom2 from "../../../assets/images/recom2.png";
import recom3 from "../../../assets/images/recom3.png";
import recom4 from "../../../assets/images/recom4.png";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import CalendarContainer from "../../../components/Calendar/CalendarContainer";
import ModelAddTopic from "../../../modules/trips/ModelAddTopic";
import config from "../../../config";
import fetchTripPlans from "../../../services/getAIrecommend";

function PlanAI() {
  const listImage = [
    { id: 1, image: recom1 },
    { id: 2, image: recom2 },
    { id: 3, image: recom3 },
    { id: 4, image: recom4 },
    { id: 5, image: recom2 },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedMember, setSelectedMember] = useState("personal");
  const [openModelAddTopic, setOpenModelAddTopic] = useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState("");
  const [transport, setTransport] = useState(0);
  const [errors, setErrors] = useState({});
  const [plan, setPlan] = useState({});
  const handleSelect = (option) => {
    setSelectedMember(option);
  };
  const handleNextPage = () => {
    const newErrors = {};

    // Kiểm tra theo từng step
    if (currentStep === 1) {
      // Bước 1: Kiểm tra địa điểm
      console.log("Step 1: Checking location...");
      if (!startLocation)
        newErrors.startLocation = "Vui lòng nhập nơi bắt đầu.";
      if (!endLocation) newErrors.endLocation = "Vui lòng nhập nơi kết thúc.";
      console.log("start location : end location ", startLocation, endLocation);
    } else if (currentStep === 2) {
      // Bước 2: Kiểm tra ngày
      console.log("Step 2: Checking date...");
      if (!startDate) newErrors.startDate = "Vui lòng chọn ngày bắt đầu.";
      if (!endDate) newErrors.endDate = "Vui lòng chọn ngày kết thúc.";
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        newErrors.dateOrder = "Ngày bắt đầu phải trước ngày kết thúc.";
      }
      console.log("start startDate : end endDate ", startDate, endDate);
    } else if (currentStep === 3) {
      // Bước 3: Kiểm tra tiền thuê
      console.log("Step 3: Checking budget...");
      if (!budget) newErrors.budget = "Vui lòng nhập tiền thuê.";
      console.log("budget : ", budget);
    } else if (currentStep === 4) {
      // Bước 4: Kiểm tra phương tiện
      console.log("Step 4: Checking transport...");
      if (transport === 0) newErrors.transport = "Vui lòng chọn phương tiện.";
      if (selectedTopic.length === 0) {
        newErrors.selectedTopic("Vui lòng chọn ít nhất một phương tiện.");
      } else {
        // Nếu đã chọn phương tiện, tiếp tục chuyển bước
        newErrors.selectedTopic(""); // Reset lỗi
        console.log("No errors, proceed to next step");
        setSlideDirection("next");
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1); // Chuyển sang bước tiếp theo
        }, 300);
      }
    }

    // Hiển thị lỗi nếu có
    setErrors(newErrors);

    // Nếu không có lỗi, chuyển sang bước tiếp theo
    if (Object.keys(newErrors).length === 0) {
      console.log("No errors, proceed to next step");
      setSlideDirection("next");
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1); // Chuyển sang bước tiếp theo
        console.log("Next step:", currentStep + 1);
      }, 300);
    } else {
      console.log("Errors present, can't proceed");
    }
  };
  const handleBackPage = () => {
    setSlideDirection("prev");
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
    }, 300);
  };
  const topics = ["Xe máy", "Ô tô", "Tàu lửa", "Máy bay", "Thuyền"];
  const handleSelectTopic = (topic) => {
    // Nếu chọn "+ Thêm mới", mở modal thêm mới, nếu không thì thêm hoặc bỏ chọn phương tiện
    if (topic === "+ Thêm mới") {
      setOpenModelAddTopic(true);
    } else {
      console.log("selected topic:::", topic);
      setSelectedTopic((prev) => (prev === topic ? "" : topic)); // Bỏ chọn nếu đã chọn, chọn mới nếu chưa chọn
      setErrors(""); // Reset lỗi
      console.log(topic);
    }
  };
  const STORAGE_KEY = "tripPlansData";

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Chuyển chuỗi ngày thành đối tượng Date
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo ngày có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng (0-indexed) + 1
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Kết hợp thành định dạng dd/MM/yyyy
  };

  const handleFinished = async () => {
    console.log("Trip plan created successfully");

    // Định dạng lại ngày
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const plan = {
      startLocation,
      destination: endLocation,
      start_date: formattedStartDate, // Sử dụng ngày đã định dạng
      end_date: formattedEndDate, // Sử dụng ngày đã định dạng
      days:
        Math.abs(new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24),
      budget,
      transport: selectedTopic,
    };
    console.log("Payload sent to API:", plan);
    setPlan(plan);
    // history.push(config.routes.generatePlan, { plan });
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Sử dụng await để đợi dữ liệu trả về từ API
      const fetchedPlans = await fetchTripPlans(plan);

      console.log("Fetched plans:", fetchedPlans);

      // Lưu kết quả vào localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedPlans));
      localStorage.setItem('currentPlan', JSON.stringify(plan));
      
      // Điều hướng đến trang generatePlan với plan trong state
      history.push(config.routes.generatePlan, { plan });

    } catch (error) {
      console.error("Error in handleFinished:", error);
    }
  };

  return (
    <div className="mt-1 flex h-[89vh] w-full flex-col gap-4 overflow-y-hidden bg-[#f5f6f7] md:px-3">
      {currentStep === 1 && (
        <div className="flex h-[50px] w-full items-center justify-between rounded-[7px] border-[0.4px] border-[#CCD0D5] bg-white px-4 py-2 shadow-md sm:h-[75px]">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="nunito-text text-[12px] font-semibold sm:text-[25px]">
                Hora, Dilysnguyen
              </div>
              <img
                src={planImage}
                alt=""
                className="h-[20px] w-[20px] sm:h-[45px] sm:w-[45px]"
              />
            </div>
            <div className="text-[6px] sm:text-[13px]">
              Hãy bắt đầu chuyến đi mới đầy thú vị nhé !
            </div>
          </div>
          <div className="flex cursor-pointer items-center gap-1 sm:pr-5">
            <span className="text-[10px] font-bold text-[#0023FE] sm:text-[16px]">
              Tạo chuyến đi mới với AI{" "}
            </span>
          </div>
        </div>
      )}
      <div className="relative h-[100%] w-full overflow-x-hidden rounded-[7px] border-[0.4px] border-[#CCD0D5] bg-white shadow-md">
        {currentStep === 1 && (
          <div
            className={`step-container flex flex-col items-center justify-start gap-2 pt-8 ${
              slideDirection === "next"
                ? "step-exit-next"
                : slideDirection === "prev"
                  ? "step-exit-prev"
                  : "step-active"
            }`}
          >
            <span className="text-[14px] font-bold leading-10 sm:text-[25px]">
              Hãy chọn địa điểm mà bạn muốn đi ?
            </span>
            <input
              type="text"
              placeholder="Nơi bắt đầu..."
              className={`h-[35px] w-full rounded-[98px] border px-3 text-[10px] outline-none sm:h-[50px] sm:w-1/3 sm:text-[16px] ${
                errors.startLocation ? "border-red-500" : "border-gray"
              }`}
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
            {errors.startLocation && (
              <span className="text-[12px] text-red-500">
                {errors.startLocation}
              </span>
            )}
            <input
              type="text"
              placeholder="Nơi kết thúc..."
              className={`h-[35px] w-full rounded-[98px] border px-3 text-[10px] outline-none sm:h-[50px] sm:w-1/3 sm:text-[16px] ${
                errors.endLocation ? "border-red-500" : "border-gray"
              }`}
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
            {errors.endLocation && (
              <span className="text-[12px] text-red-500">
                {errors.endLocation}
              </span>
            )}

            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span className="w-[70%] text-start text-[11px] font-semibold sm:text-base">
                Các địa điểm gợi ý
              </span>
              <div className="relative flex w-[70%] items-center justify-center gap-2">
                <div className="swiper-button-prev z-10 w-1/12 cursor-pointer"></div>
                <div className="w-10/12">
                  <Swiper
                    spaceBetween={0}
                    breakpoints={{
                      400: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1280: {
                        slidesPerView: 4,
                      },
                    }}
                    loop={true}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    modules={[Navigation]}
                  >
                    {/* Giả lập danh sách ảnh */}
                    {listImage.map((img) => (
                      <SwiperSlide key={img.id}>
                        <img
                          src={img.image}
                          alt=""
                          className="h-[150px] w-[120px] cursor-pointer rounded-[19px] object-cover sm:h-[210px] sm:w-[190px]"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="swiper-button-next z-10 w-1/12 cursor-pointer"></div>
              </div>
            </div>

            <div className="absolute bottom-10 flex w-[90%] justify-end pt-0">
              <Button secondary onClick={handleNextPage}>
                Kế tiếp
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div
            className={`step-container flex flex-col items-center justify-start gap-10 pb-3 pt-7 ${slideDirection === "next" ? "step-exit-next" : slideDirection === "prev" ? "step-exit-prev" : "step-active"} ${currentStep === 1 ? "step-active" : ""}`}
          >
            <div className="h-[10px] w-[80%] rounded-[23px] border border-gray">
              <div className="h-full w-1/3 rounded-s-3xl bg-black"></div>
            </div>
            <span className="text-[14px] font-bold leading-10 md:text-[25px]">
              Thời gian dự định cho chuyến đi?
            </span>

            <CalendarContainer
              onDateChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
                console.log("Selected start date:", start, "end date:", end);
              }}
            />

            {/* Hiển thị lỗi cho thời gian */}
            <div className="text-red-500">
              {errors.startDate && <p>{errors.startDate}</p>}
              {errors.endDate && <p>{errors.endDate}</p>}
              {errors.dateOrder && <p>{errors.dateOrder}</p>}
            </div>

            {/* Hiển thị lỗi cho địa điểm */}
            <div className="text-red-500">
              {errors.startLocation && <p>{errors.startLocation}</p>}
              {errors.endLocation && <p>{errors.endLocation}</p>}
            </div>

            <div className="absolute bottom-10 flex w-[90%] justify-between">
              <Button tertiary onClick={handleBackPage}>
                Trở về
              </Button>
              <Button secondary onClick={handleNextPage}>
                Kế tiếp
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div
            className={`step-container flex flex-col items-center justify-start gap-10 pb-3 pt-7 ${slideDirection === "next" ? "step-exit-next" : slideDirection === "prev" ? "step-exit-prev" : "step-active"} ${currentStep === 1 ? "step-active" : ""}`}
          >
            <div className="h-[10px] w-[80%] rounded-[23px] border border-gray">
              <div className="h-full w-2/3 rounded-s-3xl bg-black"></div>
            </div>
            <span className="pt-5 text-[14px] font-bold leading-10 md:text-[25px]">
              Nhập kinh phí dự tính ?
            </span>
            <div className="flex w-full justify-center gap-5 md:gap-12">
              <input
                type="text"
                className={`h-[50px] w-1/3 rounded-lg border border-[#CCD0D5] px-5 text-[20px] text-[#F05D1D] outline-none ${
                  errors.budget ? "border-red-500" : "border-gray"
                }`}
                placeholder="1.500.000đ"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              {errors.endLocation && (
                <span className="text-[12px] text-red-500">
                  {errors.endLocation}
                </span>
              )}
            </div>
            <span className="text-[14px] font-bold leading-10 md:text-[25px]">
              Bạn đi cá nhân hay cùng bạn đồng hành ?
            </span>
            <div className="flex h-[80px] w-1/3 justify-around gap-3">
              <div
                className={`flex h-[80px] w-1/2 cursor-pointer items-center justify-center rounded ${selectedMember === "personal" ? "bg-[#45EDA7]" : "border border-[#CCD0D5] bg-white"}`}
                onClick={() => handleSelect("personal")}
              >
                Cá nhân
              </div>
              <div
                className={`flex h-[80px] w-1/2 cursor-pointer items-center justify-center rounded ${selectedMember === "friends" ? "bg-[#45EDA7]" : "border border-[#CCD0D5] bg-white"}`}
                onClick={() => handleSelect("friends")}
              >
                Bạn bè
              </div>
            </div>
            {selectedMember === "friends" && (
              <div className="max-h-[400px] w-1/3 rounded-[13px] border border-[#CCD0D5] px-3 shadow-md">
                <span className="text-[14px] font-bold leading-10 md:text-[18px]">
                  Mời bạn bè tham gia
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between px-5 py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={recom1}
                        alt=""
                        className="h-[40px] w-[40px] rounded-full object-cover"
                      />
                      <span className="text-[14px] font-semibold">
                        Le Nguyen
                      </span>
                    </div>
                    <button className="text-[14px] font-semibold text-[#007AFF] outline-none">
                      Mời tham gia
                    </button>
                  </div>
                  <hr className="mx-auto flex w-[80%] justify-center text-[1px]" />
                  <div className="flex w-full justify-between px-5 py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={recom2}
                        alt=""
                        className="h-[40px] w-[40px] rounded-full object-cover"
                      />
                      <span className="text-[14px] font-semibold">
                        Le Nguyen
                      </span>
                    </div>
                    <button className="text-[14px] font-semibold text-[#007AFF] outline-none">
                      Mời tham gia
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="absolute bottom-10 flex w-[90%] justify-between pt-12">
              <Button tertiary onClick={handleBackPage}>
                Trở về
              </Button>
              <Button secondary onClick={handleNextPage}>
                Kế tiếp
              </Button>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div
            className={`step-container flex flex-col items-center justify-start gap-10 pb-3 pt-7 ${slideDirection === "next" ? "step-exit-next" : slideDirection === "prev" ? "step-exit-prev" : "step-active"} ${currentStep === 1 ? "step-active" : ""}`}
          >
            <div className="h-[10px] w-[80%] rounded-[23px] border border-gray">
              <div className="w-3/3 h-full rounded-s-3xl bg-black"></div>
            </div>
            <span className="pt-14 text-[14px] font-bold leading-10 md:text-[25px]">
              Bạn đi bằng phương tiện gì ?
            </span>
            <div className="flex w-[80%] flex-wrap gap-7 px-5">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectTopic(topic)}
                  className={`nunito-text cursor-pointer rounded-[66px] border border-[#CCD0D5] px-10 py-5 text-[20px] font-bold ${selectedTopic === topic ? "bg-[#45EDA7] text-white" : "hover:bg-[#f1f2f4]"}`}
                >
                  {topic}
                </div>
              ))}
              {/* {errorMessage && (
                <div className="mt-4 text-sm text-red-500">{errorMessage}</div>
              )} */}
            </div>
            <div className="absolute bottom-10 flex w-[90%] justify-between">
              <Button tertiary onClick={handleBackPage}>
                Trở về
              </Button>
              <Button
                primary
                to={{
                  pathname: config.routes.generatePlan,
                  state: { plan },
                }}
                onClick={handleFinished}
                className="h-[37px] w-[85px] rounded-lg"
              >
                Kết thúc
              </Button>
            </div>
          </div>
        )}
      </div>
      {openModelAddTopic && (
        <ModelAddTopic
          handleClose={() => setOpenModelAddTopic(false)}
        ></ModelAddTopic>
      )}
    </div>
  );
}

export default PlanAI;
