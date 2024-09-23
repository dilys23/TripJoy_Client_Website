import google from "../../assets/images/google.png"
import facebook from "../../assets/images/facebook.png"
import * as FaIcon from "react-icons/fa";
import { useState } from "react";
function Login({ onClose }) {
    const [showPass, setShowPass] = useState(false);
    const hanldeShow = () => {
        setShowPass(!showPass)
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={onClose}
            >
                <div
                    className="w-[604px] h-[600px] border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] pt-2 flex flex-col items-center gap-y-5"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-[27px] text-[#0F3E4A] w-[370px] font-bold my-3">Đăng nhập</div>
                    <div
                        className="flex gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] w-[490px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={google} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[20px]">Đăng nhập với Google</div>
                    </div>
                    <div className="flex gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] w-[490px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={facebook} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[20px]">Đăng nhập với Facebook</div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 w-[490px]">
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                        <span className="text-[#658C96]">or</span>
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                    </div>
                    <input type="text" className="flex w-[490px] h-[55px] shadow-md stroke-[#CCD0D5] bg-[#F5F6F7] items-center outline-none pl-4 text-[20px]" placeholder="Tên đăng nhập..." />
                    <div className="relative flex w-[490px] h-[55px] shadow-md stroke-[#CCD0D5] bg-[#F5F6F7] items-center pl-4">
                        <input
                            type={showPass ? 'text' : 'password'}
                            className="w-full outline-none bg-transparent text-[20px]"
                            placeholder="Mật khẩu..."
                        />
                        <div className="absolute right-5" onClick={hanldeShow}>
                            {!showPass && <FaIcon.FaEye className="cursor-pointer w-[25px] h-[25px] text-[#bbb8b8]" />}
                            {showPass && <FaIcon.FaEyeSlash className="cursor-pointer w-[25px] h-[25px] text-[#bbb8b8]" />}
                        </div>
                    </div>
                    <div className="underline text-[#818080] text-[20px] cursor-pointer hover:text-primary">Quên mật khẩu?</div>
                    <div className="flex justify-between items-center w-[490px]">
                        <div className="text-[#818080] text-[20px] cursor-pointer hover:text-primary">Tạo tài khoản</div>
                        <button className="bg-[#13C892] text-white font-bold text-[24px] w-[191px] h-[55px] stroke-2 rounded-20 border-gray-100 shadow-md hover:bg-white hover:text-[#13C892] transition duration-500 ease-in-out">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;