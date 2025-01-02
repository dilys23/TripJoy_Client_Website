import { MdClose } from "react-icons/md";
import image from "../../assets/images/travel.png"
import { startPlanService } from "../../services/statusPlanService";
import { toast } from "react-toastify";
function ModalStartPlan({ handleClose, planId, onSuccess, openNotificationWithIcon }) {
    const handleStartPlan = async () => {
        try {
            const response = await startPlanService(planId);
            handleClose();
            if (response) {
                openNotificationWithIcon('success', 'Chúc bạn có chuyến hành trình vui vẻ !');
            }
            onSuccess();
        } catch (error) {
            const errorMessage = (typeof error === 'string' && error.split(': ')[1]) ||
                (error.message ? error.message.split(': ')[1] : "Lỗi không xác định");
            const extractedMessage = errorMessage?.match(/"([^"]+)"/)?.[1] || errorMessage;
            toast.error(extractedMessage);
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
                    className="relative sm:w-[450px] w-4/5 h-fit pb-5 flex bg-[#EEF8FF]  border-2 border-none rounded-xl shadow-xl stroke-2  stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img src={image} alt="" className="w-[130px] h-[130px] object-cover" />
                    <div className="absolute top-5 right-5">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1">
                        <span className="text-[20px] font-bold">Bắt đầu chuyến đi </span>
                        <span className="w-[80%] mx-auto text-[12px]">Bạn đã sẵn sàng cho chuyến đi này chưa ?
                            <br />Click nút Start để bắt đầu chuyến đi của mình nhé!
                            <br />Chúc bạn có chuyến đi trọn vẹn cùng TripJoy! </span>
                        <div className="flex gap-10 mx-auto pt-5">
                            <button onClick={handleClose} className="w-[100px] bg-[#ECEBEB] text-[15px] rounded h-[37px]">Huỷ</button>
                            <button onClick={handleStartPlan} className="w-[100px] bg-[#17A1FA] text-white text-[15px] rounded h-[37px]">Bắt đầu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalStartPlan;