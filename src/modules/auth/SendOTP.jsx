import { useState } from "react";
import { toast } from 'react-toastify'
import { resetPasswordService, confirmForgetPasswordService } from "../../services/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function SendOTP({ onClose, email, onConfirmOTP, switchToLogin }) {

    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        onClose();
    };
    const handleCheckOTP = () => {
        if (!otp) {
            setOtpError("Vui lòng nhập OTP")
        } else {
            setOtpError("");
        }
    }

    const sendOTP = async () => {
        try {
            const response = await resetPasswordService(email);
            if (response && response.status === "success") {
                console.log("Password reset response:", response);
                localStorage.setItem('url', response.url)
                toast.success("Đã gửi mã xác nhận ở email", 3000)
            } else {
                toast.error("Không tìm thấy tài khoản")
            }

        } catch (error) {
            console.error("Error during password reset:", error);
            toast.error("Không tìm thấy tài khoản")
        }
    }
    const handleConfirmOTP = async () => {
        if (!otp) {
            console.log("click")
            setOtpError("Vui lòng nhập OTP");
            return
        }
        setIsLoading(true);
        try {
            const url = localStorage.getItem('url');
            const response = await confirmForgetPasswordService({ otp, url });
            if (response && response.status === "success") {
                toast.success("Xác thực OTP thành công")
                console.log("respone otp:", response)
                localStorage.setItem('url', response.url)
            } else {
                toast.error("Không tìm thấy tài khoản")
            }
        } catch (error) {
            // console.error("Error during password reset:", error);
            console.error("Error during password confirmation:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
                toast.error(error.response.data.message || "Lỗi kết nối");
            } else {
                toast.error("Lỗi kết nối");
            }
        }
        setIsLoading(false);
        setOtpError("");
        onConfirmOTP();
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={handleClose}
            >
                <div
                    className="modal w-[500px] h-[380px]  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] pt-2 flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-[27px] w-[400px] text-[#0F3E4A] font-bold mt-8 mb-9">Xác thực tài khoản</div>
                    <input
                        required
                        disabled
                        value={email}
                        type="email"
                        className={`h-[40px] w-[450px] rounded-[5px] border bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none border-[#ccd0d5] mb-3`}
                    ></input>
                    <p className="text-red-500 w-[450px] h-[20px] flex justify-start items-center text-[14px] px-2"></p>


                    <div className=" w-[450px] mx-auto flex max-w-lg items-center gap-4 h-[40px]">
                        <input
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="OTP"
                            className=" h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-white px-3 shadow focus:border-blue-400 focus:outline-none"
                            id="voice-search"
                            type="text"
                            onBlur={handleCheckOTP}
                        />
                        <button
                            className=" flex px-1 gap-1 justify-around h-[40px] w-[40%] items-center rounded-[5px] border border-blue-700 bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="submit"
                            onClick={sendOTP}

                        >
                            <FontAwesomeIcon
                                icon={faPaperPlane}
                                size="1x"
                                className=""
                                color="white"
                            />
                            Gửi OTP
                        </button>

                    </div>
                    <p className="text-red-500 w-[450px] h-[20px] flex justify-start items-center text-[14px] px-2">{otpError}</p>

                    <div className={`flex justify-between  items-center w-[450px] mt-5 fixed  bottom-[210px]`}>
                        <div
                            onClick={switchToLogin}
                            className="text-[#818080] text-[16px] cursor-pointer hover:text-primary">Đăng nhập bằng mật khẩu</div>
                        <button
                            onClick={() => handleConfirmOTP()}
                            className="disabled:bg-gray-400 h-[45px] w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                            {isLoading ? "Đang xác nhận" : "Xác nhận"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SendOTP;