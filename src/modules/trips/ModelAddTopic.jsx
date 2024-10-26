import { MdClose } from "react-icons/md";
import Button from "../../components/Button/Button";
import { useState } from "react";

function ModelAddTopic({ handleClose }) {
    const [interest, setInterest] = useState("");
    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setInterest(value);
        }
    };
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="modal w-1/3 h-1/3 flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full justify-end flex">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="flex flex-col justify-start w-full gap-3 px-6 pt-3">
                        <span className="text-[16px] font-semibold text-start">Thêm một sở thích khác</span>
                        <input
                            type="text" placeholder="Sở thích...."
                            value={interest}
                            onChange={handleChange}
                            className=" border-gray focus-within:border-black outline-none w-full h-[73px] rounded-md px-3 border-[2px]" />
                        <div className="flex w-full justify-between">
                            <span className="text-[12px] nunito-text text-[#333]" >
                                Phân cách mỗi mục bằng dấu phẩy</span>
                            <span className="text-[12px] nunito-text text-[#333]">{interest.length}/50 ký tự</span>
                        </div>
                        <div className="flex justify-between">
                            <div></div>
                            <Button secondary className="text-end">Thêm</Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ModelAddTopic;