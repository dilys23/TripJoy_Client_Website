import { useState } from "react";
import { toast } from 'react-toastify'
import { changePasswordService } from "../../services/login";
import InputType from "../../components/Input/InputType";

function ForgetPassword({ onClose, email, switchToLogin }) {

    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);


    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        onClose();
    };
    const checkInputConfirmPassword = () => {
        if (confirmPassword.length === 0) {
            setConfirmPasswordError('Vui lòng nhập mật khẩu')
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Mật khẩu không trùng khớp')
        } else {
            setConfirmPasswordError('');
        }
    };


    const validatePassword = () => {
        if (!password) {
            setPasswordError('Mật khẩu không được để trống');
        } else if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa");
        } else if (!/[a-z]/.test(password)) {
            setPasswordError("Mật khẩu phải chứa ít nhất 1 chữ cái viết thường");
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setPasswordError("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt");
        } else {
            setPasswordError("");
        }
    };


    const handleConfirmPassword = async () => {
        validatePassword();
        checkInputConfirmPassword();

        if (passwordError || confirmPasswordError) return;
        setIsLoading(true);
        try {
            const url = localStorage.getItem('url');
            const response = await changePasswordService({ url, password, confirmPassword });
            if (response && response.status === "success") {
                toast.success("Đổi mật khẩu thành công", 1000)
            } else {
                toast.error("Không tìm thấy tài khoản")
            }
            handleClose();
            switchToLogin()
        } catch (error) {
            // console.error("Error during password reset:", error);
            console.error("Error during password confirmation:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
                toast.error(error.response.data.message || "Lỗi kết nối");
            } else {
                toast.error("Lỗi kết nối 2");
            }
        }
        setIsLoading(false);


    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={handleClose}
            >
                <div
                    className="modal w-[500px] h-[450px]  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] pt-2 flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-[27px] text-[#0F3E4A] font-bold my-9">Đổi mật khẩu</div>
                    <input
                        required
                        value={email}
                        type="email"
                        disabled
                        className={`h-[40px] w-[450px] rounded-[5px] border  bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none`}
                        placeholder="Tên đăng nhập..." />
                    <p className="text-red-500 w-[450px] h-[20px] flex justify-start items-center text-[14px] px-2 mb-2"></p>


                    <div className="w-[450px] flex flex-col gap-2">
                        <InputType
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword}
                            placeholder="Mật khẩu"
                            required={true}
                            errorMessage={passwordError}
                        ></InputType>
                        <InputType
                            name="password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={checkInputConfirmPassword}
                            placeholder="Xác nhận mật khẩu"
                            required={true}
                            errorMessage={confirmPasswordError}
                        ></InputType>
                    </div>
                    <div className={`flex justify-between  items-center w-[450px] mt-5 fixed  bottom-[180px]`}>
                        <div
                            onClick={switchToLogin}
                            className="text-[#818080] text-[16px] cursor-pointer hover:text-primary">Đăng nhập bằng mật khẩu</div>
                        <button
                            onClick={() => handleConfirmPassword()}
                            className="disabled:bg-gray-400 h-[45px] w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                            {isLoading ? "Đang xác nhận" : "Đổi mật khẩu"}
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ForgetPassword;