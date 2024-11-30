import { MdClose } from "react-icons/md";
import iconChange from "../../../assets/images/cahge.png"
function ModalEditRole({ handleClose }) {
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
                        <span className="">Bạn muốn thay đổi quyền của thành viên này ? </span>
                        <select name="roles" id="roles" class="border border-gray-300 rounded px-2 py-2 w-[150px] flex justify-center items-center mx-auto text-center outline-none bg-[#13C892] text-white">
                            <option value="member" className="bg-white text-black">Thành viên</option>
                            <option value="vice-leader" className="bg-white text-black">Phó đoàn</option>
                        </select>
                        <div className="flex gap-10 mx-auto pt-5">
                            <button className="w-[100px] bg-[#ECEBEB] text-[15px] rounded h-[37px]">Huỷ</button>
                            <button className="w-[100px] bg-[#17A1FA] text-white text-[15px] rounded h-[37px]">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditRole;