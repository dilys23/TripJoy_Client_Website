import { FaSearch } from "react-icons/fa";
import planImage from "../../../assets/images/planIcon.png"
import aiIcon from '../../../assets/images/aiIcon.png';

import PlanCard from "../../../modules/trips/PlanCard";
import RecommendationPlan from "../../../modules/trips/RecommendationPlan";
import { Link } from "react-router-dom";
import config from "../../../config";
function Plan() {
    const listPlan = [
        {
            id: 1,
            title: 'Hai ngày một đêm ở Hà Giang',
            state: false,
            time: '2 ngày 1 đêm',
            vehicle: 'Motor',
            budget: '2.000.000đ'
        },
        {
            id: 2,
            title: 'Chinh phục cột cờ Lủng Cú',
            state: true,
            time: '2 ngày 1 đêm',
            vehicle: 'Motor',
            budget: '2.000.000đ'
        },
        {
            id: 3,
            title: 'Khám phá hang Sơn Đòong',
            state: true,
            time: '2 ngày 1 đêm',
            vehicle: 'Motor',
            budget: '2.000.000đ'
        }
    ]
    const listRecommendationPlan = [
        {
            id: 1,
            title: 'Phượt Đà Lạt',
            state: false,
            time: '2 ngày 1 đêm',
        },
        {
            id: 2,
            title: 'Phượt Đà Lạt',
            state: false,
            time: '2 ngày 1 đêm',
        }
    ]

    return (
        <div className="my-1 flex w-full md:px-3 flex-col">
            <div className="w-full h-[75px] rounded-[7px] border-[0.4px] shadow-md bg-white border-[#CCD0D5] px-4 py-2 flex justify-between items-center">
                <div className="flex flex-col ">
                    <div className="flex items-center ">
                        <div className="text-[25px] nunito-text font-semibold">Hora, Dilysnguyen</div>
                        <img src={planImage} alt="" className="w-[45px] h-[45px]" />
                    </div>
                    <div className="text-[13px]">Hãy bắt đầu chuyến đi mới đầy thú vị nhé !</div>
                </div>
                <div className="flex gap-1 items-center pr-5 cursor-pointer">
                    <img src={aiIcon} alt="" className="text-[#0023FE] w-[30px] h-[32px]" />
                    <Link to={config.routes.planAI} className="text-[#0023FE] text-[16px] font-bold">Tạo chuyến đi mới với AI </Link>
                </div>
            </div>
            <div className="w-full h-full flex mt-8 gap-6">
                <div className="w-3/5">
                    <div className="w-full flex gap-3 h-[42px] mb-5">
                        <input
                            type="text"
                            placeholder="Tìm kiếm chuyến đi"
                            className="h-full w-3/5 bg-white rounded-md border-[0.4px] border-[#CCD0D5] shadow-md outline-none px-3 text-[14px]"></input>
                        <input
                            type="month"
                            value={new Date().toISOString().slice(0, 7)}
                            className="w-1/5 h-full rounded-md border-[0.4px] border-[#CCD0D5] shadow-md outline-none px-3 text-[14px]" />
                        <button className="flex gap-3 bg-[#007AFF] w-1/5 h-full rounded-md shadow-md items-center justify-center">
                            <FaSearch className="text-white" />
                            <span className="text-white text-[14px]">Tìm kiếm</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-5">
                        {listPlan.map((plan) => (
                            <PlanCard key={plan.id} plan={plan}></PlanCard>
                        ))}
                    </div>
                </div>
                <div className="w-2/5 h-auto bg-white rounded-md border-[0.4px] border-[#CCD0D5] shadow-md flex flex-col">
                    <div className="w-full h-[70px] border-b-2 border-[#DEDFDF] text-[20px] font-bold items-center flex justify-center">Bạn đã có chuyến đi của mình chưa ?</div>
                    <div className="flex flex-col text-start px-5 py-5 gap-3">
                        <span className="text-[20px] font-bold">Tạo kế hoạch </span>
                        <div className="flex gap-10">
                            <div className="flex flex-col w-1/2 gap-2">
                                <span className="text-base text-[#979797] font-normal">Điểm bắt đầu</span>
                                <select className="border-[#CCD0D5] border shadow-md h-[39px] outline-none px-3 rounded-md">
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-1/2 gap-2">
                                <span className="text-base text-[#979797] font-normal">Điểm kết thúc</span>
                                <select className="border-[#CCD0D5] border shadow-md h-[39px] outline-none px-3 rounded-mds">
                                    <option value="Đà Lạt">Đà Lạt</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <span className="text-base text-[#979797] font-normal">Thời gian bắt đầu</span>
                            <select className="border-[#CCD0D5] border shadow-md h-[39px] outline-none px-3 rounded-mds">
                            </select>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <span className="text-base text-[#979797] font-normal">Thời gian kết thúc</span>
                            <select className="border-[#CCD0D5] border shadow-md h-[39px] outline-none px-3 rounded-mds">
                            </select>
                        </div>
                        <div className="flex gap-10">
                            <div className="flex flex-col w-3/5 gap-2">
                                <span className="text-base text-[#979797] font-normal">Kinh phí dự tính</span>
                                <input type="text" className="border-[#CCD0D5] border shadow-md h-[39px] outline-none px-3 rounded-md" />

                            </div>
                            <div className="flex flex-col w-2/5 gap-2">
                                <span className="text-base text-[#979797] font-normal">Phương tiện</span>
                                <select className="border-[#CCD0D5] border shadow-md h-[39px] outline-none px-3 rounded-mds">
                                    <option value="Xe máy">Xe máy</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex justify-end mt-3"> <button className="w-[85px] h-[33px] rounded-[5px] text-white bg-[#007AFF] flex items-center justify-center ">Tạo mới</button></div>
                    </div>
                    <div className="w-full flex flex-col  text-start px-5 pb-4">
                        <div className="text-[20px] font-bold">Các nhóm gợi ý</div>
                        <div className="flex flex-col w-full px-2 gap-3 mt-2">
                            {listRecommendationPlan.map((plan) => (
                                <RecommendationPlan key={plan.id} plan={plan}></RecommendationPlan>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plan;