import map from "../../assets/images/map.png"
import avatar from "../../assets/images/ava.jpg"
import motor from "../../assets/images/motor.png"
function PlanCard({ plan }) {
    return (
        <div className=" rounded-[7px] border-[0.4px] shadow-md bg-white border-[#CCD0D5] w-full h-[209px] p-3 flex">
            <div className="w-2/3 h-full p-2 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <img src={avatar} alt="" className="w-[50px] h-[50px] rounded-full" />
                        <div className="flex flex-col text-start">
                            <div className="text-base leading-5 font-bold">Dilysnguyen</div>
                            <div className="text-[10px] text-[#AEAEAE] font-normal leading-3">Hôm nay, 6/9/2024</div>
                        </div>
                    </div>
                    <span className={`w-[120px] h-[26px] text-white font-bold text-base px-3 flex justify-center rounded-md cursor-pointer ${plan.state ? 'bg-[#FF2424]' : 'bg-[#46E8A5]'}`}>
                        {plan.state ? 'Đã diễn ra' : 'Đang diễn ra'}
                    </span>

                </div>
                <div className="text-[24px] font-bold text-black">{plan.title}</div>
                <div className="flex flex-row w-full gap-3">
                    <div className="w-1/4 justify-start flex flex-col border-r-2 border-[#CCD0D5] gap-3 items-center ">
                        <span className="text-[14px] text-[#979797] leading-4 font-normal">Thời gian</span>
                        <span className="text-[14px] text-[#FF7324] leading-4 font-normal">{plan.time}</span>
                    </div>
                    <div className="w-1/4 justify-start  flex flex-col border-r-2 border-[#CCD0D5] items-center">
                        <span className="text-[14px] text-[#979797] leading-4 font-normal">Phương tiện</span>
                        {plan.vehicle === 'Motor' && <img src={motor} alt="" className="w-[48px] h-[44px]"></img>}
                    </div>
                    <div className="w-1/4 justify-start  flex flex-col border-r-2 border-[#CCD0D5] items-center gap-3">
                        <span className="text-[14px] text-[#979797] leading-4 font-normal">Chi phí</span>
                        <span className="text-[14px] text-[#FF7324] leading-4 font-normal">{plan.budget}</span>
                    </div>
                    <button className="w-1/4 h-[33px] rounded-[5px] text-white bg-[#007AFF] flex items-center justify-center">Chi tiết</button>
                </div>
            </div>
            <div className="w-1/3 full">
                <img src={map} alt="" className="w-full h-full p-2 object-cover" />
            </div>
        </div>
    );
}

export default PlanCard;