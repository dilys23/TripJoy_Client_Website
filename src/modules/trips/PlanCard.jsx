import map from "../../assets/images/map.png"
import avatar from "../../assets/images/avatarDefault.png"
import motor from "../../assets/images/motor.png"
import config from "../../config";
import Button from "../../components/Button/Button";
import { useState, useEffect } from "react";
import { getUserById } from "../../services/getUserById";
function PlanCard({ plan }) {
    const [leader, setLeader] = useState(null);
    const fetchLeader = async () => {
        try {
            const user = await getUserById(plan.leadUserId);
            setLeader(user.user);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchLeader();
    }, [plan.id])
    function formatDateRange(start, end) {
        const startDate = new Date(start).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });

        const endDate = new Date(end).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });

        return `${startDate} - ${endDate}`;
    }
    function formatCurrency(amount) {
        return `${amount.toLocaleString('vi-VN')} VND`;
    }
    return (
        <div className=" rounded-[7px] border-[0.4px] shadow-md bg-white border-[#CCD0D5] w-full h-fit lg:flex-row flex-col p-3 flex">
            <div className="lg:w-2/3 w-full h-full p-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <img src={avatar} alt="" className="w-[50px] h-[50px] rounded-full" />
                        <div className="flex flex-col text-start">
                            <div className="text-base leading-5 font-bold">{leader?.userName || 'Leader Name'}</div>
                            <div className="text-[10px] text-[#AEAEAE] font-normal leading-3">Hôm nay, 6/9/2024</div>
                        </div>
                    </div>
                    <span className={` text-white font-bold lg:text-base text-[12px] py-1 lg:px-3 px-2 flex justify-center rounded-md cursor-pointer ${plan.state ? 'bg-[#FF2424]' : 'bg-[#46E8A5]'}`}>
                        {plan.state ? 'Đã diễn ra' : 'Đang diễn ra'}
                    </span>

                </div>
                <div className="lg:text-[24px] text-[17px] font-bold text-black ">{plan.title}</div>
                <div className="flex flex-row w-full lg:gap-2 gap-1">
                    <div className="w-4/12 justify-start flex flex-col border-r-2 border-[#CCD0D5] gap-3 items-center ">
                        <span className="lg:text-[14px] text-[12px] text-[#979797] leading-4 font-normal">Thời gian</span>
                        <span className="lg:text-[14px] text-[12px] text-[#FF7324] leading-4 font-normal">{formatDateRange(plan.startDate, plan.endDate)}</span>
                    </div>
                    <div className="w-2/12 justify-start  flex flex-col border-r-2 border-[#CCD0D5] items-center">
                        <span className="lg:text-[14px] text-[12px] text-[#979797] leading-4 font-normal">Phương tiện</span>
                        {plan.vehicle === 0 && <img src={motor} alt="" className="w-[48px] h-[44px]"></img>}
                        {plan.vehicle === 1 && <img width="48" height="48" src="https://img.icons8.com/color/48/car--v1.png" alt="car--v1" />}
                        {plan.vehicle === 2 && <img width="48" height="48" src="https://img.icons8.com/emoji/48/train-emoji.png" alt="train-emoji" />}
                        {plan.vehicle === 3 && <img width="48" height="48" src="https://img.icons8.com/emoji/48/train-emoji.png" alt="train-emoji" />}
                        {plan.vehicle === 4 && <img width="48" height="48" src="https://img.icons8.com/fluency/48/sailing-ship-medium.png" alt="sailing-ship-medium" />}
                    </div>
                    <div className="w-3/12 justify-start  flex flex-col border-r-2 border-[#CCD0D5] items-center gap-3">
                        <span className="lg:text-[14px] text-[12px] text-[#979797] leading-4 font-normal">Chi phí</span>
                        <span className="lg:text-[14px] text-[12px] text-[#FF7324] leading-4 font-normal"> {formatCurrency(plan.estimatedBudget)}</span>
                    </div>
                    <div className="w-3/12 justify-center flex items-center">
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