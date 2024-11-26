import map from "../../../assets/images/map.png"
import hoian from "../../../assets/images/hoian.png"
import { MdOutlineSettings } from "react-icons/md";
import { BsCalendar2Week, BsFillPersonPlusFill, BsFillPinMapFill, BsShare } from "react-icons/bs";
import { useState } from "react";
import DetailJourney from "../../../modules/plan/DetailJourney.jsx";
function DetailPlan() {
    const [activeTab, setActiveTab] = useState("hanhTrinh");
    const date = {
        dateStart: "2024-12-02",
        dateEnd: "2024-12-05",
    }
    return (
        <div className="flex w-full lg:px-16 px-3 h-auto min-h-[630px] gap-14 md:pt-3">
            <div className="lg:w-2/3 w-full flex flex-col gap-8">
                <div className="w-full h-[230px] relative">
                    <img src={hoian} alt="" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute top-0 left-0 w-full h-full opacity-15  rounded-lg bg-black"></div>
                    <div className="absolute top-4 right-5 flex gap-3">
                        <button className="flex md:py-1 md:px-3 px-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer gap-2">
                            <BsFillPersonPlusFill />
                            <span className="md:text-[14px] text-[10px]">Mời thành viên</span>
                        </button>
                        <button className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] p-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer">
                            <BsShare />
                        </button>
                        <button className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] p-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer">
                            <MdOutlineSettings />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-5 flex flex-col gap-2">
                        <span className="text-white md:text-[35px] text-[23px] font-extrabold nunito-text">Hai ngày một đêm ở Hội An</span>
                        <div className="flex md:flex-row flex-col md:gap-10 gap-1">
                            <div className="flex gap-2 text-white  items-center md:text-[18px] text-[14px]">
                                <BsCalendar2Week className="font-bold" />
                                <span className="text-white font-bold ">14th11 đến 16th11</span>
                            </div>
                            <div className="flex gap-2 text-white  items-center  md:text-[18px] text-[14px]">
                                <BsFillPinMapFill className="font-bold" />
                                <span className="text-white font-bold ">Hội An, Quảng Nam</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-10">
                    <button
                        className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "hanhTrinh" ? "border-b-4 border-black font-bold" : ""}`}
                        onClick={() => setActiveTab("hanhTrinh")}
                    >
                        Hành trình
                    </button>
                    <button
                        className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "thuChi" ? "border-b-4 border-black font-bold" : ""}`}
                        onClick={() => setActiveTab("thuChi")}
                    >
                        Thu chi
                    </button>
                    <button
                        className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "thanhVien" ? "border-b-4 border-black font-bold" : ""}`}
                        onClick={() => setActiveTab("thanhVien")}
                    >
                        Thành viên
                    </button>
                </div>
                <div className="mt-4">
                    {activeTab === "hanhTrinh" && (
                        <div>
                            <DetailJourney date={date}></DetailJourney>
                        </div>
                    )}
                    {activeTab === "thuChi" && (
                        <div>
                            <span className="font-normal text-xl">Nội dung thu chi </span>

                        </div>
                    )}
                    {activeTab === "thanhVien" && (
                        <div>
                            <span className="font-normal text-xl">Nội dung thành viên </span>
                        </div>
                    )}
                </div>

            </div>
            <img src={map} alt="" className="w-1/3 object-cover h-[600px] rounded-md lg:flex  hidden sticky top-[80px]" />
        </div>
    );
}

export default DetailPlan;