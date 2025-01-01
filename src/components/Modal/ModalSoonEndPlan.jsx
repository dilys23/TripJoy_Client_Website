import { MdClose } from "react-icons/md";
import image from "../../assets/images/endplansoon.png"
import { completePlan, endPlanSoonService } from "../../services/statusPlanService";
import { toast } from "react-toastify";
function ModalSoonEndPlan({ handleClose, planId, onSuccess, openNotificationWithIcon }) {
    const handlePausePlan = async () => {
        try {
            const response = await endPlanSoonService(planId);
            handleClose();

            if (response) {
                openNotificationWithIcon('success', 'Chuyến đi của bạn đã tạm dừng !');
            }
            onSuccess();
        } catch (error) {
            toast.error("Bạn không có quyền chỉnh sửa");
            console.log(error);
        }
    }
    const handleCompletePlan = async () => {
        try {
            const response = await completePlan(planId);
            handleClose();

            if (response) {
                openNotificationWithIcon('success', 'Chúc mừng bạn đã kết thúc chuyến đi thành công !');
            }
            onSuccess();
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative sm:w-[450px] w-4/5 h-fit pb-5 flex bg-[#FFEBEB]  border-2 border-none rounded-xl shadow-xl stroke-2  stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img src={image} alt="" className="w-[130px] h-[130px] object-cover" />
                    <div className="absolute top-5 right-5">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1">
                        <span className="text-[20px] font-bold">Kết thúc chuyến đi ? </span>
                        <span className="w-[80%] mx-auto text-[12px]">Bạn có chắc chắn muốn kết thúc chuyến đi này ?
                            <br /> Click nút “Kết thúc” để kết thúc chuyến đi của mình nhé!
                            <br /> Hẹn các bạn ở chuyến đi tiếp theo cùng TripJoy! </span>
                        <div className="flex gap-10 mx-auto pt-5">
                            <button onClick={handlePausePlan} className="w-[100px] bg-white border shadow-sm font-bold text-[15px] rounded h-[37px]">Tạm dừng </button>
                            <button
                                onClick={handleCompletePlan}
                                className="w-[100px] bg-[#FF8B4A] text-white font-bold text-[15px] rounded h-[37px]">Kết thúc</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalSoonEndPlan;