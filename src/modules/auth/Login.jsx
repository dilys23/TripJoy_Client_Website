import google from "../../assets/images/google.png"
import facebook from "../../assets/images/facebook.png"
import * as FaIcon from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { loginService, resetPasswordService, refreshTokenService, confirmForgetPasswordService } from "../../services/login";
import { UserContext } from "../../contexts/UserContext";

function Login({ onClose }) {
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useContext(UserContext);
    const [otp, setOtp] = useState('')
    const [forgetPass, setForgetPass] = useState(false);


    const handleClose = () => {
        setEmail('');
        setPassword('');
        onClose();
    };

    const checkInputEmail = (e) => {
        // const value = e.target.value;
        // setEmail(value);
        const emailRole = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (email.length === 0) {
            setEmailError('Vui lòng nhập email')
            return false
        }
        else if (!emailRole.test(email)) {
            setEmailError('Email không hợp lệ')
            return false
        } else {
            setEmailError('');
            return true
        }
    }
    const checkInputPassword = (e) => {
        if (password.length === 0) {
            setPasswordError('Vui lòng nhập mật khẩu')
        } else if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự')
        }
        else {
            setPasswordError('');
        }
    }
    const handleLogin = async () => {
        if (!email) {
            setEmailError('Vui lòng nhập email')
            return
        }
        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu")
            return
        }
        setIsLoading(true);
        try {
            const response = await loginService(email, password);
            console.log('Login success:', response);
            const { accessToken, refreshToken, user } = response;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userInfo', JSON.stringify(user));
            login(user);
            toast.success("Đăng nhập thành công", {
                autoClose: 1000
            });
            handleClose();
            navigate('/network');
        } catch (error) {
            if (error.response && error.response.data) {
                const { errors } = error.response.data;
                if (errors && errors["Auth.InvalidCredentials"]) {
                    setPasswordError("Tài khoản hoặc mật khẩu không đúng")
                } else {
                    toast.error("Đăng nhập thất bại, vui lòng thử lại", {
                        autoClose: 1000
                    });
                    setEmail('');
                    setPassword('');
                }
            } else {

                toast.error("Lỗi kết nối, vui lòng thử lại", {
                    autoClose: 1000
                });
                // setEmail('');
                // setPassword('');
            }
        }
        setIsLoading(false);
    }

    // useEffect(() => {
    //     const refreshAccessToken = async () => {
    //         try {
    //             const newToken = await refreshTokenService();
    //             localStorage.setItem('accessToken', newToken.accessToken);
    //             localStorage.setItem('refreshToken', newToken.refreshToken);
    //         } catch (error) {
    //             console.error("Error refreshing access token:", error);
    //         }
    //     };

    //     const isTokenExpired = (token) => {
    //         if (!token) return true;
    //         const payload = JSON.parse(atob(token.split('.')[1]));
    //         const exp = payload.exp * 1000;
    //         return Date.now() >= exp;
    //     };

    //     const checkAndRefreshToken = () => {
    //         const token = localStorage.getItem('accessToken');
    //         if (isTokenExpired(token)) {
    //             refreshAccessToken();
    //         }
    //     };

    //     checkAndRefreshToken();

    //     const intervalId = setInterval(checkAndRefreshToken, 3600 * 1000); // 3600 seconds

    //     return () => clearInterval(intervalId); 
    // }, []);

    const handleForgetPassword = async () => {
        if (!checkInputEmail()) return;
        setForgetPass(true);
        sendOTP();
    }
    const sendOTP = async () => {
        try {
            const response = await resetPasswordService(email);
            if (response && response.status === "success") {
                console.log("Password reset response:", response);
                //console.log(forgetPass);
                // onForgetPassword();
                // onClose();
                localStorage.setItem('url', response.url)

                toast.success("Đã gửi mã xác nhận ở email để khôi phục mật khẩu", 3000)
            } else {
                toast.error("Không tìm thấy tài khoản")
            }

        } catch (error) {
            console.error("Error during password reset:", error);
            toast.error("Không tìm thấy tài khoản")
        }
    }
    const handleConfirmPassword = async () => {
        setIsLoading(true);
        try {

            const url = localStorage.getItem('url');
            if (!url) {
                throw new Error("No URL found in local storage");
            }
            const parsedUrl = new URL(url);
            const key = parsedUrl.searchParams.get("key");
            const response = await confirmForgetPasswordService({ otp, key });
            console.log("key:", key)
            if (response && response.status === "success") {
                // console.log("Khôi phục mật khẩu thành công", response);
                toast.success("Khôi phục mật khẩu thành công")
            } else {
                toast.error("Không tìm thấy tài khoản")
            }

        } catch (error) {
            // console.error("Error during password reset:", error);
            toast.error("Lỗi kết nối")
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
                    className="w-[500px] h-[600px] border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] pt-2 flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-[27px] text-[#0F3E4A] w-[370px] font-bold my-5">Đăng nhập</div>
                    <div
                        className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] hover:bg-[#fbf9f9] w-[350px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={google} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[16px]">Đăng nhập với Google</div>
                    </div>
                    <div className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] hover:bg-[#fbf9f9] w-[350px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={facebook} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[16px]">Đăng nhập với Facebook</div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 w-[350px] mb-5">
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                        <span className="text-[#658C96]">or</span>
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                    </div>

                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        onBlur={checkInputEmail}
                        className={`h-[40px] w-[350px] rounded-[5px] border  bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none ${emailError === "" ? "border-[#ccd0d5]" : "border-red-500"}`}
                        placeholder="Tên đăng nhập..." />
                    <p className="text-red-500 w-[350px] h-[40px] flex justify-start items-center text-[14px] px-2">{emailError}</p>
                    {forgetPass ? (<>

                        <div className="relative flex items-center h-[40px] w-[350px] rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus-within:border-blue-400 focus:outline-none">
                            <input
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full outline-none bg-transparent "
                                placeholder="OTP..."
                            />
                            <div
                                onClick={sendOTP}
                                className="absolute right-5 text-blue-500 font-bold cursor-pointer">
                                RESEND
                            </div>
                        </div>
                    </>) : (
                        <div className="relative flex items-center h-[40px] w-[350px] rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus-within:border-blue-400 focus:outline-none">
                            <input
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPass ? 'text' : 'password'}
                                onBlur={checkInputPassword}
                                className="w-full outline-none bg-transparent "
                                placeholder="Mật khẩu..."
                            />
                            <div className="absolute right-5" onClick={() => setShowPass(!showPass)}>
                                {!showPass && <FaIcon.FaEye className="cursor-pointer w-[20px] h-[20px] text-[#bbb8b8]" />}
                                {showPass && <FaIcon.FaEyeSlash className="cursor-pointer w-[20px] h-[20px] text-[#bbb8b8]" />}
                            </div>
                        </div>
                    )}

                    <p className="text-red-500 w-[350px] h-[40px] flex justify-start items-center text-[14px] px-2">{passwordError}</p>
                    <div
                        style={{ pointerEvents: emailError ? 'none' : 'auto' }}
                        onClick={handleForgetPassword}
                        className="underline text-[#818080] text-[14px] cursor-pointer hover:text-primary"
                    >Quên mật khẩu?</div>
                    <div className="flex justify-between items-center w-[350px] mt-5">
                        <div className="text-[#818080] w-[100px] text-[15px] cursor-pointer hover:text-primary">Tạo tài khoản</div>
                        {forgetPass ? (<>
                            <button
                                onClick={() => handleConfirmPassword()}
                                className="disabled:bg-gray-400 h-[45px] w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                                {isLoading ? "Đang xác nhận" : "Xác nhận"}
                            </button>
                        </>) : (
                            <button
                                onClick={() => handleLogin()}
                                className="disabled:bg-gray-400 h-[45px] w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                                {isLoading ? "Đang Đăng nhập..." : "Đăng nhập"}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Login;