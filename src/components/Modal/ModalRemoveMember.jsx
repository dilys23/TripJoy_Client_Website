import { AiOutlineWarning } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { removeMemberService } from "../../services/member";

function ModalRemoveMember({ planId, member, handleClose, onSuccess }) {

    const handleRemoveMember = async () => {
        console.log(planId, member?.userId);
        try {
            const res = await removeMemberService(planId, member?.userId);
            if (res) {
                onSuccess();
                handleClose();
            }
        }
        catch (error) {
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
                    className="relative sm:w-[450px] w-4/5 h-fit flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 pt-5 pb-8 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full justify-center flex">
                        <div className="w-[80px] h-[80px] bg-[#FFF0F0] border border-[#FFEAE9] rounded-full flex justify-center items-center">
                            <div className="w-[68px] h-[68px] bg-[#FFCECE] border border-[#FFBCBC] rounded-full flex justify-center items-center">
                                {/* <img src={iconChange} alt="" className="w-[45px] h-[40px]" /> */}
                                <AiOutlineWarning className="text-[#FF2424] text-[30px]" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-5 right-3">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1">
                        <span className="text-[20px] font-bold">Xóa thành viên</span>
                        <span className="w-[80%] mx-auto">Bạn có thật sự muốn xóa thành viên này ?</span>
                        <div className="flex gap-10 mx-auto pt-5">
                            <button onClick={handleClose} className="w-[100px] bg-[#ECEBEB] text-[15px] rounded h-[37px]">Huỷ</button>
                            <button onClick={handleRemoveMember} className="w-[100px] bg-[#FF2424] text-white text-[15px] rounded h-[37px]">Xác nhận</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ModalRemoveMember;