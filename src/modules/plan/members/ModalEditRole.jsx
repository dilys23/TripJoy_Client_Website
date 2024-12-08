import { MdClose } from "react-icons/md";
import iconChange from "../../../assets/images/cahge.png"
import { changePermissionService } from "../../../services/member";

function ModalEditRole({ planId, member, handleClose, onSuccess }) {

    const getRoleChangeMessage = () => {
        if (member?.role === 2) {
            return "Bạn muốn thay đổi quyền của thành viên này từ Thành viên sang Phó đoàn?";
        }
        if (member?.role === 1) {
            return "Bạn muốn thay đổi quyền của thành viên này từ Phó đoàn sang Thành viên?";
        }
        return "Không thể thay đổi quyền cho vai trò hiện tại.";
    };

    const handleChangePermission = async () => {

        console.log(planId, member?.userId);
        try {

            const res = await changePermissionService(planId, member?.userId);
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
                    className="relative sm:w-[450px] w-4/5 h-[300px] flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full justify-center flex">
                        <div className="w-[80px] h-[80px] bg-[#DCF1FF] border border-[#6eb5ff] rounded-full flex justify-center items-center">
                            <div className="w-[68px] h-[68px] bg-[#A1DAFF] border border-[#6eb5ff] rounded-full flex justify-center items-center">
                                <img src={iconChange} alt="" className="w-[45px] h-[40px]" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-5 right-3">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1">
                        <span className="text-[20px] font-bold">Thay đổi quyền</span>
                        <span className="w-[80%] mx-auto">{getRoleChangeMessage()}</span>
                        <div className="flex gap-10 mx-auto pt-5">
                            <button onClick={handleClose} className="w-[100px] bg-[#ECEBEB] text-[15px] rounded h-[37px]">Huỷ</button>
                            <button onClick={handleChangePermission} className="w-[100px] bg-[#17A1FA] text-white text-[15px] rounded h-[37px]">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditRole;