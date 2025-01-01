import { useEffect, useState } from "react";
import { getPlanLocation } from "../../services/planLocation";
import ModalJoinRequest from "../Modal/ModalJoinRequest";
import { joinRequest, revokeJoinRequest, viewDetailAvailablePlan } from "../../services/joinRequest";
import RoutingMap from "../MapCard/RoutingMap"
import ModalDetailRouting from "../Modal/ModalDetailRouting";
import Button from "../Button/Button";
import { toast } from "react-toastify";
function RecommendationAddressItem({ mySelf, plan, handleShowDetailRouting }) {
    // console.log(plan);

    const [showModalJoin, setShowModalJoin] = useState(false);
    const [applyStatus, setApplyStatus] = useState(plan.applyStatus);
    const handleButtonClick = () => {
        if (applyStatus) {
            handleRevokeJoinRequest();
        } else {
            setShowModalJoin(true);
        }
    }
    const handleRevokeJoinRequest = async () => {
        if (plan.applyStatus) {
            try {
                const res = await revokeJoinRequest(plan.id);
                setApplyStatus(false);
                console.log(res);

            } catch (error) {
                toast.error("Lỗi kết nối", error);
                console.log(error);
            }
        }
    }
    const handleSendJoinRequest = async (message) => {
        try {
            const res = await joinRequest(plan.id, message);
            console.log(res);
            setApplyStatus(true);
            setShowModalJoin(false);
        } catch (error) {
            toast.error("Lỗi kết nối", error);
            console.log(error);
        }
    }
    const handleViewDetails = () => {
        handleShowDetailRouting(plan.id);
    }


    return (
        <>
            <div className="w-full h-auto py-2 flex gap-3 lg:flex-row flex-col">
                <img src={plan.avatar} alt="" className="lg:w-[84px] lg:h-[84px] w-full rounded-[7px] object-cover" />
                <div className="flex flex-col">
                    <span className="font-bold lg:text-[18px]">{plan.title}</span>
                    <span className="lg:text-[14px] text-[12px]">Chia sẻ và cùng lập kế hoạch với bạn đồng hành</span>
                    <div className="flex  lg:gap-3 gap-1 items-center">
                        <Button primary onClick={handleButtonClick} className="text-[10px] rounded-md">{!applyStatus ? "Tham gia" : "Đã gửi"}</Button>
                        {/* <span
                            onClick={handleButtonClick}
                            className="text-[13px] text-[#0354AD] font-semibold italic cursor-pointer">  {!applyStatus ? "Tham gia" : "Đã gửi lời mời"}</span> */}
                        <span
                            onClick={handleViewDetails}
                            className="text-[12px] text-[#0354AD] font-semibold italic cursor-pointer">Xem chi tiết</span>
                    </div>

                </div>

                {
                    showModalJoin &&
                    <ModalJoinRequest
                        plan={plan}
                        mySelf={mySelf}
                        onOk={handleSendJoinRequest}
                        open={() => setShowModalJoin(true)}
                        onCancel={() => setShowModalJoin(false)}
                    >

                    </ModalJoinRequest>
                }
            </div>
        </>
    );
}

export default RecommendationAddressItem;