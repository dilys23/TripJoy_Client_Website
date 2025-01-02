
import { MdClose, MdLogout } from "react-icons/md";
import { outPlanService } from "../../services/member";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function ModalOutPlan({ planId, handleClose }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleOutPLan = async () => {
        setLoading(true);
        try {
            const res = await outPlanService(planId);
            console.log(res);
            navigate('/plan');
        } catch (error) {
            const errorMessage = (typeof error === 'string' && error.split(': ')[1]) ||
                (error.message ? error.message.split(': ')[1] : "Lỗi không xác định");
            const extractedMessage = errorMessage?.match(/"([^"]+)"/)?.[1] || errorMessage;
            toast.error(extractedMessage);
        }
        setLoading(false);
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative sm:w-[450px] w-4/5 h-fit pb-5 flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full justify-center flex">
                        <div className="w-[80px] h-[80px] bg-[#FDF0E3] border border-[#FFEAE9] rounded-full flex justify-center items-center">
                            <div className="w-[68px] h-[68px] bg-[#FFCCAF] border border-[#FFBCBC] rounded-full flex justify-center items-center">
                                {/* <img src={iconChange} alt="" className="w-[45px] h-[40px]" /> */}
                                <MdLogout className="text-[#fb6e04] text-[25px]" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-5 right-3">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1">
                        <span className="md:text-[20px] text-[14px] font-bold">Rời khỏi đoàn</span>
                        <span className="sm:text-[14px] text-[12px]">Bạn có thật sự muốn rời khỏi đoàn ?</span>
                        <span></span>
                        <div className="flex gap-10 mx-auto pt-5">
                            <button onClick={handleClose} className="w-[100px] bg-[#ECEBEB] text-[15px] rounded h-[37px]">Huỷ</button>

                            <button onClick={handleOutPLan} className="w-[100px] bg-[#FF7324] text-white text-[15px] rounded h-[37px] ">
                                {
                                    loading ?
                                        (
                                            <img
                                                className="h-5 w-5 animate-spin"
                                                width="24"
                                                height="24"
                                                src="https://img.icons8.com/?size=100&id=94550&format=png&color=FFFFFF"
                                                alt="loading"
                                            />
                                        ) : "Xác nhận"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalOutPlan;