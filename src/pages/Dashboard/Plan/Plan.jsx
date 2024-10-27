import { FaSearch } from "react-icons/fa";
// Kiểm tra cách bạn import hình ảnh

import PlanCard from "../../../modules/trips/PlanCard";
import RecommendationPlan from "../../../modules/trips/RecommendationPlan";
import { Link } from "react-router-dom";
import config from "../../../config";
function Plan() {
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
                  Điểm bắt đầu
                </span>
                <select className="h-[39px] rounded-md border border-[#CCD0D5] px-3 shadow-md outline-none">
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
              <div className="flex w-1/2 flex-col gap-2">
                <span className="text-base font-normal text-[#979797]">
                  Điểm kết thúc
                </span>
                <select className="rounded-mds h-[39px] border border-[#CCD0D5] px-3 shadow-md outline-none">
                  <option value="Đà Lạt">Đà Lạt</option>
                </select>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-base font-normal text-[#979797]">
                Thời gian bắt đầu
              </span>
              <select className="rounded-mds h-[39px] border border-[#CCD0D5] px-3 shadow-md outline-none"></select>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-base font-normal text-[#979797]">
                Thời gian kết thúc
              </span>
              <select className="rounded-mds h-[39px] border border-[#CCD0D5] px-3 shadow-md outline-none"></select>
            </div>
            <div className="flex gap-10">
              <div className="flex w-3/5 flex-col gap-2">
                <span className="text-base font-normal text-[#979797]">
                  Kinh phí dự tính
                </span>
                <input
                  type="text"
                  className="h-[39px] rounded-md border border-[#CCD0D5] px-3 shadow-md outline-none"
                />
              </div>
              <div className="flex w-2/5 flex-col gap-2">
                <span className="text-base font-normal text-[#979797]">
                  Phương tiện
                </span>
                <select className="rounded-mds h-[39px] border border-[#CCD0D5] px-3 shadow-md outline-none">
                  <option value="Xe máy">Xe máy</option>
                </select>
              </div>
            </div>
            <div className="mt-3 flex w-full justify-end">
              {" "}
              <button className="flex h-[33px] w-[85px] items-center justify-center rounded-[5px] bg-[#007AFF] text-white">
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
