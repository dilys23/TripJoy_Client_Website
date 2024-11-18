import { FaSearch } from "react-icons/fa";
// Kiểm tra cách bạn import hình ảnh

import PlanCard from "../../../modules/trips/PlanCard";
import RecommendationPlan from "../../../modules/trips/RecommendationPlan";
import { Link } from "react-router-dom";
import config from "../../../config";
import { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
// import "antd/dist/antd.css";
function Plan() {
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState("");
  const [visibility, setVisibility] = useState(true);
  const dateFormat = "DD-MM-YYYY";
  const [errors, setErrors] = useState({
    startDestination: "",
    endDestination: "",
    startDate: "",
    endDate: "",
    budget: ""
  })
  const validateForm = () => {
    let formIsValid = true;
    let errors = {
      startDestination: "",
      endDestination: "",
      startDate: "",
      endDate: "",
      budget: ""
    };

    if (!startDestination) {
      formIsValid = false;
      errors.startDestination = "Vui lòng điền điểm bắt đầu";
    }

    if (!endDestination) {
      formIsValid = false;
      errors.endDestination = "Vui lòng điền điểm kết thúc";
    }
    if (!startDate) {
      formIsValid = false;
      errors.startDate = "Vui lòng ngày bắt đầu";
    }
    if (!endDate) {
      formIsValid = false;
      errors.endDate = "Vui lòng ngày kết thúc";
    }
    if (!budget) {
      formIsValid = false;
      errors.budget = "Vui lòng điền ngân sách";
    }
    setErrors(errors);
    return formIsValid;
  };
  const listPlan = [
    {
      id: 1,
      title: "Hai ngày một đêm ở Hà Giang",
      state: false,
      time: "2 ngày 1 đêm",
      vehicle: "Motor",
      budget: "2.000.000đ",
    },
    {
      id: 2,
      title: "Chinh phục cột cờ Lủng Cú",
      state: true,
      time: "2 ngày 1 đêm",
      vehicle: "Motor",
      budget: "2.000.000đ",
    },
    {
      id: 3,
      title: "Khám phá hang Sơn Đòong",
      state: true,
      time: "2 ngày 1 đêm",
      vehicle: "Motor",
      budget: "2.000.000đ",
    },
  ];
  const listRecommendationPlan = [
    {
      id: 1,
      title: "Phượt Đà Lạt",
      state: false,
      time: "2 ngày 1 đêm",
    },
    {
      id: 2,
      title: "Phượt Đà Lạt",
      state: false,
      time: "2 ngày 1 đêm",
    },
  ];

  const handleStartDateChange = (date) => {
    if (date) {
      setStartDate(date);
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDate: null,
      }))
    }
  };

  const handleEndDateChange = (date) => {
    if (startDate && date && date.isBefore(startDate)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDate: "Ngày kết thúc không thể nhỏ hơn ngày bắt đầu!",
      }));
      return;
    }
    setEndDate(date);
    setErrors((prevErrors) => ({
      ...prevErrors,
      endDate: "",
    }));
  };
  const handleAddPlan = (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) {
      return;
    }


  }


  return (
    <div className="my-1 flex w-full flex-col md:px-3">
      <div className="flex h-[75px] w-full items-center justify-between rounded-[7px] border-[0.4px] border-[#CCD0D5] bg-white px-4 py-2 shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="nunito-text text-[25px] font-semibold">
              Hora, Dilysnguyen
            </div>
          </div>
          <div className="text-[13px]">
            Hãy bắt đầu chuyến đi mới đầy thú vị nhé !
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-1 pr-5">
          <Link
            to={config.routes.planAI}
            className="text-[16px] font-bold text-[#0023FE]"
          >
            Tạo chuyến đi mới với AI{" "}
          </Link>
        </div>
      </div>
      <div className="mt-8 flex h-full w-full gap-6">
        <div className="w-3/5">
          <div className="mb-5 flex h-[42px] w-full gap-3">
            <input
              type="text"
              placeholder="Tìm kiếm chuyến đi"
              className="h-full w-3/5 rounded-md border-[0.4px] border-[#CCD0D5] bg-white px-3 text-[14px] shadow-md outline-none"
            ></input>
            <input
              type="month"
              value={new Date().toISOString().slice(0, 7)}
              className="h-full w-1/5 rounded-md border-[0.4px] border-[#CCD0D5] px-3 text-[14px] shadow-md outline-none"
            />
            <button className="flex h-full w-1/5 items-center justify-center gap-3 rounded-md bg-[#007AFF] shadow-md">
              <FaSearch className="text-white" />
              <span className="text-[14px] text-white">Tìm kiếm</span>
            </button>
          </div>
          <div className="flex flex-col gap-5">
            {listPlan.map((plan) => (
              <PlanCard key={plan.id} plan={plan}></PlanCard>
            ))}
          </div>
        </div>
        <div className="flex h-auto w-2/5 flex-col rounded-md border-[0.4px] border-[#CCD0D5] bg-white shadow-md">
          <div className="flex h-[70px] w-full items-center justify-center border-b-2 border-[#DEDFDF] text-[20px] font-bold">
            Bạn đã có chuyến đi của mình chưa ?
          </div>
          <div className="flex flex-col gap-3 px-5 py-5 text-start">
            <span className="text-[20px] font-bold">Tạo kế hoạch </span>
            <div className="flex gap-10">
              <div className="flex w-1/2 flex-col gap-2">
                <span className="text-base font-normal text-[#979797]">
                  Điểm bắt đầu<span className="text-[red] ml-1 text-[15px]">*</span>
                </span>
                <input
                  value={startDestination}
                  onChange={(e) => setStartDestination(e.target.value)}
                  placeholder="Đà Nẵng"
                  required
                  type="text"
                  className="h-[39px] rounded-md border border-[#CCD0D5] px-3 shadow-md outline-none"
                />
                {!startDestination && <span className="text-[12px] font-normal text-red-500">{errors?.startDestination}</span>}
              </div>
              <div className="flex w-1/2 flex-col gap-2">
                <span className="text-base font-normal text-[#979797]">
                  Điểm kết thúc<span className="text-[red] ml-1 text-[15px]">*</span>
                </span>
                <input
                  value={endDestination}
                  onChange={(e) => setEndDestination(e.target.value)}
                  placeholder="Đà Lạt"
                  required
                  type="text"
                  className="h-[39px] rounded-md border border-[#CCD0D5] px-3 shadow-md outline-none"
                />
                {!endDestination && <span className="text-[12px] font-normal text-red-500">{errors?.endDestination}</span>}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="date-input" className="text-base font-normal text-[#979797]">
                Thời gian bắt đầu<span className="text-[red] ml-1 text-[15px]">*</span>
              </label>
              <DatePicker
                value={startDate}
                onChange={handleStartDateChange}
                format={dateFormat}
                placeholder="dd-mm-yyyy"
                className="rounded-md w-full h-[39px] border border-[#CCD0D5] px-3 shadow-md outline-none"
                disabledDate={(current) => current && current < moment().startOf("day")}
              />
              <span className="text-[12px] font-normal text-red-500">{errors?.startDate}</span>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-base font-normal text-[#979797]">
                Thời gian kết thúc<span className="text-[red] ml-1 text-[15px]">*</span>
              </span>
              <DatePicker
                value={endDate}
                onChange={handleEndDateChange}
                format={dateFormat}
                placeholder="dd-mm-yyyy"
                className="rounded-md w-full h-[39px] border border-[#CCD0D5] px-3 shadow-md outline-none"
                disabledDate={(current) => current && current < moment().startOf("day")}
              />
              <span className="text-[12px] font-normal text-red-500">{errors?.endDate}</span>
            </div>
            <div className="flex gap-10">
              <div className="flex w-3/5 flex-col gap-2">
                <span className="text-base font-normal text-[#979797]">
                  Kinh phí dự tính<span className="text-[red] ml-1 text-[15px]">*</span>
                </span>
                <input
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ""))}
                  type="text"
                  className="h-[39px] rounded-md border border-[#CCD0D5] px-3 shadow-md outline-none"
                />
                {!budget && <span className="text-[12px] font-normal text-red-500">{errors?.budget}</span>}
              </div>
              <div className="flex w-2/5 flex-col gap-2">
                <span className="text-base font-normal text-[#979797]">
                  Chế độ<span className="text-[red] ml-1 text-[15px]">*</span>
                </span>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                    <input
                      type="radio"
                      value={true}
                      name="visibility"
                      className="mr-2"
                      checked={visibility === true}
                      onChange={() => setVisibility(true)}
                    />
                    Công khai
                  </label>
                  <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                    <input
                      type="radio"
                      name="visibility"
                      value={false}
                      checked={visibility === false}
                      className="mr-2"
                      onChange={() => setVisibility(false)}
                    />
                    Cá nhân
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-3 flex w-full justify-end">
              {" "}
              <button
                onClick={handleAddPlan}
                className="flex h-[33px] w-[85px] items-center justify-center rounded-[5px] bg-[#007AFF] text-white">
                Tạo mới
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col px-5 pb-4 text-start">
            <div className="text-[20px] font-bold">Các nhóm gợi ý</div>
            <div className="mt-2 flex w-full flex-col gap-3 px-2">
              {listRecommendationPlan.map((plan) => (
                <RecommendationPlan
                  key={plan.id}
                  plan={plan}
                ></RecommendationPlan>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plan;
