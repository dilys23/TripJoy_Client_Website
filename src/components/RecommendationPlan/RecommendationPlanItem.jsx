import ava from "../../assets/images/ava.jpg";
import ava1 from "../../assets/images/anh2.jpg";
import ava2 from "../../assets/images/anh3.jpg";
import thiennhien from "../../assets/images/thiennhien.jpg"
import { Avatar, notification } from "antd";
import { acceptInvitationService, declineInvitationService } from "../../services/member";
import { toast } from "react-toastify";

function RecommendationPlanItem({ plan, onSuccess, openNotificationWithIcon }) {
    // console.log(plan);
    function formatDateRange(estimatedStartDate, estimatedEndDate) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

        const startDate = new Date(estimatedStartDate).toLocaleDateString('vi-VN', options);
        const endDate = new Date(estimatedEndDate).toLocaleDateString('vi-VN', options);

        return `${startDate} đến ${endDate}`;
    }

    const handleAcceptPlan = async () => {
        try {
            const res = await acceptInvitationService(plan.planId);
            openNotificationWithIcon('success', 'Thông báo', 'Chúc bạn có chuyến đi vui vẻ', true);
            onSuccess();
        } catch (error) {
            toast.error("Thời gian này bạn đang nằm trong một chuyến đi khác");
            openNotificationWithIcon('success', 'Thông báo', 'Thời gian chuyến đi này trùng với một hành trình khác.', false)
            console.log(error);
        }
    }
    const handleDeclinePlan = async () => {
        try {
            const res = await declineInvitationService(plan.planId);
            openNotificationWithIcon('success', 'Thông báo', 'Hẹn gặp bạn ở một dịp khác', true);
            onSuccess();
        } catch (error) {
            toast.error(error);
            // openNotificationWithIcon('success', 'Thông báo', 'Thời gian chuyến đi này trùng với một hành trình khác.', false)
            console.log(error);
        }
    }
    return (
        <div className="flex w-full max-w-[200px] h-[215px] rounded-md flex-col bg-white shadow-lg">
            <div className="w-full h-4/5 rounded-s-md relative cursor-pointer">
                <img src={plan.avatar || thiennhien} alt="" className="w-full h-full rounded-t-md " />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 rounded-t-md">
                </div>
                <div className="absolute top-0 left-0 w-full h-full px-3 lg:pt-5 pt-2">
                    <div className="text-white lg:text-[18px] font-bold cursor-pointer">{plan?.title}</div>
                    <div className="text-white text-[11px]">{formatDateRange(plan?.startDate, plan?.endDate)}</div>
                    <div className="flex gap-1">
                        <button
                            onClick={handleAcceptPlan}
                            className="rounded-[5px] mt-8 hover:bg-[#FF7324] lg:px-4 px-2 lg:py-[6px] py-1 lg:text-sm text-[12px] font-medium text-[#ff6600] transition-all duration-300 ease-in-out bg-white hover:text-white"
                        >Tham gia
                        </button>
                        <button
                            onClick={handleDeclinePlan}
                            className="rounded-[5px] mt-8  lg:px-4 px-2 lg:py-[6px] py-1 lg:text-sm text-[12px] font-medium  transition-all duration-300 ease-in-out bg-[#E4E6EB] hover:bg-[#CCD0D5] "
                        >
                            Từ chối
                        </button>
                    </div>
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