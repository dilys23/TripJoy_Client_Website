import map from "../../assets/images/map.png"
import motobrike from "../../assets/images/motorbike.png"
function DetailPlanAI() {
    return (
        <div className="flex w-full flex-col py-3 px-3 h-full gap-4">
            <div className="text-[18px] font-bold px-1">Gợi ý 1</div>
            <img src={map} alt="" className="w-full lg:h-2/3 h-[300px] object-cover rounded-lg" />
            <div className="text-[18px] font-bold px-2">Chi tiết</div>
            <div className="w-full h-[200px] rounded-lg shadow-lg border-[#C2BFBF] border flex px-7 lg:gap-10 items-center">
                <img src={motobrike} alt="" className="lg:w-[170px] lg:h-[170px] w-[100px] h-[100px]" />
                <div className="flex flex-col lg:w-[60%] px-2 py-3 gap-1">
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] text-[#B3B3B3] font-bold">Bắt đầu</span>
                            <span className="text-[#616161] font-bold">Huế</span>
                        </div>
                        <div className="flex flex-col justify-start w-[140px]">
                            <span className="text-[16px] text-[#B3B3B3] font-bold">Kết thúc</span>
                            <span className="text-[#616161] font-bold">Đà Lạt</span>
                        </div>
                    </div>
                    {/* <hr className="w-[80%] mx-auto text-[#CCD0D5]" /> */}
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] text-[#B3B3B3] font-bold">Thời gian </span>
                            <span className="text-[#616161] font-bold">17/9/2024 - 7/10/2024</span>
                        </div>
                        <div className="flex flex-col justify-end w-[140px]">
                            <span className="text-[16px] text-[#B3B3B3] font-bold">Tổng quãng đường</span>
                            <span className="text-[#616161] font-bold ">500 km</span>
                        </div>
                    </div>
                    {/* <hr className="w-[80%] mx-auto text-[#CCD0D5]" /> */}
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-start">
                            <span className="text-[16px] text-[#B3B3B3] font-bold">Thành viên</span>
                            <span className="text-[#616161] font-bold">Cá nhân</span>
                        </div>
                        <div className="flex flex-col justify-end w-[140px]">
                            <span className="text-[16px] text-[#B3B3B3] font-bold ">Kinh phí</span>
                            <span className="text-[#616161] font-bold ">2.000.000 đồng</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default DetailPlanAI;