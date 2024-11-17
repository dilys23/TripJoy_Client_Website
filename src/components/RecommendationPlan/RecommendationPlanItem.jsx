import ava from "../../assets/images/ava.jpg";
import ava1 from "../../assets/images/anh2.jpg";
import ava2 from "../../assets/images/anh3.jpg";
import { Avatar } from "antd";
function RecommendationPlanItem({ plan }) {
    return (
        <div className="flex w-[170px] h-[215px] rounded-md flex-col bg-white shadow-lg">
            <div className="w-full h-[167px] rounded-s-md relative cursor-pointer">
                <img src={plan.image} alt="" className="w-full h-full rounded-s-md " />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25">
                </div>
                <div className="absolute top-0 left-0 w-full h-full px-3 pt-5">
                    <div className="text-white text-[18px] font-bold cursor-pointer">{plan.title}</div>
                    <div className="text-white text-[11px]">{plan.time}</div>
                    <button className="rounded-[5px] mt-8 hover:bg-[#FF7324] px-4 py-[6px] text-sm font-medium text-[#ff6600] transition-all duration-300 ease-in-out bg-white hover:text-white">Tham gia</button>
                </div>

            </div>

            <div className="flex px-3 py-2 items-center gap-1">
                <div className="flex relative cursor-pointer ">
                    <Avatar src={ava1} alt="" className="w-[25px] h-[25px] rounded-full" />
                    <Avatar src={ava2} alt="" className="w-[25px] h-[25px] rounded-full -ml-3" />
                    <Avatar src={ava} alt="" className="w-[25px] h-[25px] rounded-full -ml-3" />
                </div>
                <div className="text-[10px] italic text-[#616161]">{plan.numberMember} người đã tham gia</div>
            </div>
        </div>
    );
}

export default RecommendationPlanItem;