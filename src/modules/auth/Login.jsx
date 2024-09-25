import google from "../../assets/images/google.png"
import facebook from "../../assets/images/facebook.png"
import * as FaIcon from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { loginService, resetPasswordService, refreshTokenService, confirmForgetPasswordService } from "../../services/login";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/Input/InputField";


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
    const [showInputResetPassword, setShowInputResetPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClose = () => {
        setEmail('');
        setPassword('');
        onClose();
    };
    const validatePassword = (value) => {
        if (!value) return "Mật khẩu không được để trống";
        if (value.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
        if (!/^[a-zA-Z0-9]+$/.test(value)) return "Mật khẩu không hợp lệ";
        return "";
    };
    const validateConfirmPassword = (value) => {
        if (!value) return "Xác nhận mật khẩu không được để trống";
        if (value !== password) return "Mật khẩu không trùng khớp";
        return "";
    };
    const checkInputEmail = () => {
        const emailRole = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length === 0) {
            setEmailError('Vui lòng nhập email')
            return false
        } else if (!emailRole.test(email)) {
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
        } else {
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
    const handleConfirmPassword = async () => {
        setIsLoading(true);
        try {
            const url = localStorage.getItem('url');
            const response = await confirmForgetPasswordService({ otp, url });
            if (response && response.status === "success") {
                toast.success("Xác thực OTP thành công")
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
        setShowInputResetPassword(true)
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={handleClose}
            >
                <div
                    className="w-[500px] h-[650px] border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] pt-2 flex flex-col items-center"
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

                        <div className=" w-[350px] mx-auto flex max-w-lg items-center gap-4 h-[40px]">
                            <input
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="OTP"
                                className=" h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none"
                                id="voice-search"
                                type="text"
                            />
                            <button
                                className=" flex px-1 gap-1 justify-between h-[40px] w-[45%] items-center rounded-[5px] border border-blue-700 bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="submit"
                                onClick={sendOTP}
                            >
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    size="1x"
                                    className=""
                                    color="white"
                                />
                                Gửi lại OTP
                            </button>
                        </div>
                    </>) : (
                        <>
                            {/* <div className="w-[350px]"> */}
                            {/* <InputField
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    validate={validatePassword}
                                    placeholder="Mật khẩu"
                                    required={true}
                                ></InputField> */}
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
                            <p className="text-red-500 w-[350px] h-[40px] flex justify-start items-center text-[14px] px-2">{passwordError}</p>
                            {/* </div> */}
                        </>
                    )}
                    {showInputResetPassword ? (
                        <div className="w-[350px] flex flex-col gap-5 mt-7">
                            <InputField
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                validate={validatePassword}
                                placeholder="Mật khẩu"
                                required={true}
                            ></InputField>
                            <InputField
                                name="password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                validate={validateConfirmPassword}
                                placeholder="Xác nhận mật khẩu"
                                required={true}
                            ></InputField>
                        </div>
                    )
                        : (<></>)}

                    {forgetPass ?
                        (<div>

                        </div>) : (
                            <div
                                style={{ pointerEvents: emailError ? 'none' : 'auto' }}
                                onClick={handleForgetPassword}
                                className="underline text-[#818080] text-[14px] cursor-pointer hover:text-primary"
                            >Quên mật khẩu?</div>
                        )}
                    <div className="flex justify-between items-center w-[350px] mt-5 fixed bottom-[80px] ">
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