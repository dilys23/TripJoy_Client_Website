import map from "../../assets/images/map.png"
import avatar from "../../assets/images/ava.jpg"
import motor from "../../assets/images/motor.png"
import config from "../../config";
import Button from "../../components/Button/Button";
function PlanCard({ plan }) {
    return (
        <div className=" rounded-[7px] border-[0.4px] shadow-md bg-white border-[#CCD0D5] w-full h-fit lg:flex-row flex-col p-3 flex">
            <div className="lg:w-2/3 w-full h-full p-2 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <img src={avatar} alt="" className="w-[50px] h-[50px] rounded-full" />
                        <div className="flex flex-col text-start">
                            <div className="text-base leading-5 font-bold">Dilysnguyen</div>
                            <div className="text-[10px] text-[#AEAEAE] font-normal leading-3">Hôm nay, 6/9/2024</div>
                        </div>
                    </div>
                    <span className={` text-white font-bold lg:text-base text-[12px] py-1 lg:px-3 px-2 flex justify-center rounded-md cursor-pointer ${plan.state ? 'bg-[#FF2424]' : 'bg-[#46E8A5]'}`}>
                        {plan.state ? 'Đã diễn ra' : 'Đang diễn ra'}
                    </span>

                </div>
                <div className="lg:text-[24px] text-[17px] font-bold text-black ">{plan.title}</div>
                <div className="flex flex-row w-full lg:gap-3 gap-1">
                    <div className="w-1/4 justify-start flex flex-col border-r-2 border-[#CCD0D5] gap-3 items-center ">
                        <span className="lg:text-[14px] text-[12px] text-[#979797] leading-4 font-normal">Thời gian</span>
                        <span className="lg:text-[14px] text-[12px] text-[#FF7324] leading-4 font-normal">{plan.time}</span>
                    </div>
                    <div className="w-1/4 justify-start  flex flex-col border-r-2 border-[#CCD0D5] items-center">
                        <span className="lg:text-[14px] text-[12px] text-[#979797] leading-4 font-normal">Phương tiện</span>
                        {plan.vehicle === 'Motor' && <img src={motor} alt="" className="w-[48px] h-[44px]"></img>}
                    </div>
                    <div className="w-1/4 justify-start  flex flex-col border-r-2 border-[#CCD0D5] items-center gap-3">
                        <span className="lg:text-[14px] text-[12px] text-[#979797] leading-4 font-normal">Chi phí</span>
                        <span className="lg:text-[14px] text-[12px] text-[#FF7324] leading-4 font-normal">{plan.budget}</span>
                    </div>
                    <div className="w-1/4 justify-center flex items-center">
                        <Button to={config.routes.detailTrip} secondary className=" rounded-[5px] text-white bg-[#007AFF] flex items-center justify-center lg:text-[14px] text-[12px] ">Chi tiết</Button>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/3 w-full">
                <img src={map} alt="" className="w-full h-full p-2 object-cover rounded-lg" />
            </div>
        </div>
    );
}

export default PlanCard;