import { FaSearch } from "react-icons/fa";
import PlanCard from "../../../modules/trips/PlanCard";
import { Link } from "react-router-dom";
import config from "../../../config";

import RecommendationPlanItem from "../../../components/RecommendationPlan";

import anh1 from "../../../assets/images/anh1.jpg"
import anh2 from "../../../assets/images/anh2.jpg"
import anh3 from "../../../assets/images/anh3.jpg"
import anh4 from "../../../assets/images/anh4.jpg"
import AddPlan from "../../../modules/plan/AddPlan";
import { MdFilterAlt } from "react-icons/md";
import { Dropdown } from 'antd';
function Plan() {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Tất cả
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Đang diễn ra
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Đã diễn ra
        </a>
      ),
    },
  ];
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
      title: "Cù Lao Chàm",
      image: anh1,
      time: "20/12 đến 25/12",
      numberMember: 5,
    },
    {
      id: 2,
      title: "Lủng Cú",
      image: anh2,
      time: "20/12 đến 25/12",
      numberMember: 3,
    },
    {
      id: 3,
      title: "Vịnh Hạ Long",
      image: anh4,
      time: "20/12 đến 25/12",
      numberMember: 2,
    },
  ];


  return (
    <div className="my-1 flex w-full flex-col lg:px-10 md:px-5 sm:px-3 px-3">
      <div className="flex h-[75px] w-full items-center justify-between rounded-[7px] border-[0.4px] border-[#CCD0D5] bg-white md:px-4 px-2 py-2 shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="nunito-text lg:text-[25px] font-semibold">
              Hora, Dilysnguyen
            </div>
          </div>
          <div className="md:text-[13px] text-[10px]">
            Hãy bắt đầu chuyến đi mới đầy thú vị nhé !
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-1 lg:pr-5">
          <Link
            to={config.routes.planAI}
            className="lg:text-[16px] md:text-[13px] text-[10px] font-bold text-[#0023FE] flex items-center"
          >
            Tạo chuyến đi mới với AI<img width="30" height="30" src="https://img.icons8.com/plasticine/100/light-on.png" alt="light-on" className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]" />
          </Link>
        </div>
      </div>
      <div className="mt-8 flex h-full w-full lg:gap-16 md:gap-10 sm:gap-6">
        <div className="sm:w-3/5">
          <div className="mb-5 flex md:h-[42px] w-full sm:gap-3 gap-3 sm:justify-normal justify-end sm:flex-row flex-col" >
            <div className="flex w-full gap-1 md:h-[42px] h-[30px]">
              <input
                type="text"
                placeholder="Tìm kiếm chuyến đi"
                className="h-full w-4/6 lg:py-3 py-2 rounded-md border-[0.4px] border-[#CCD0D5] bg-white px-3 md:text-[14px] text-[10px] shadow-md outline-none"
              ></input>
              <input
                type="date"
                value={new Date()}
                className="h-full  w-1/6 rounded-md border-[0.4px] border-[#CCD0D5] px-3 md:text-[14px] text-[10px] shadow-md outline-none"
              />
              <div className="h-full w-1/6">
                <Dropdown menu={{ items }} placement="bottom">
                  <button
                    className="h-full w-full flex items-center justify-center rounded-md bg-[#007AFF] shadow-md text-white md:text-[14px] text-[10px]">
                    <MdFilterAlt className="md:text-[20px] text-white" />
                    Bộ lọc
                  </button>
                </Dropdown>
              </div>
            </div>
            <div className="sm:hidden flex w-full justify-end ">
              <button
                className="sm:hidden w-1/4 h-[30px] flex border border-[#ff7124fc] text-[10px] text-[#ff7124fc] bg-white rounded-md hover:bg-[#ff7124fc] hover:text-white duration-200 font-bold items-center justify-center"
              >
                Lên kế hoạch
              </button>
            </div>

          </div>
          <div className="flex flex-col gap-5">
            {listPlan.map((plan) => (
              <PlanCard key={plan.id} plan={plan}></PlanCard>
            ))}
          </div>
        </div>
        <div className=" flex-col gap-1 sm:w-2/5 sm:flex hidden">
          <AddPlan />
          <span className="text-[#aeaeae] lg:text-base text-[13px] font-bold my-2">NHÓM GỢI Ý</span>
          <div className="flex gap-8 lg:flex-row flex-col justify-start mb-2">
            {listRecommendationPlan.slice(0, 2).map((plan) => (
              <RecommendationPlanItem key={plan.id} plan={plan}></RecommendationPlanItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plan;
