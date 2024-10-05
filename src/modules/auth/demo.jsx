import google from "../../assets/images/google.png"
import facebook from "../../assets/images/facebook.png"
import { useContext, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { loginService, resetPasswordService, refreshTokenService, confirmForgetPasswordService, changePasswordService } from "../../services/login";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import InputType from "../../components/Input/InputType";

function Login({ onClose }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const { login } = useContext(UserContext);


    const [forgetPass, setForgetPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showInputResetPassword, setShowInputResetPassword] = useState(false);


    const navigate = useNavigate();
    const handleClose = () => {
        setEmail('');
        setPassword('');
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
        // sendOTP();
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
        setShowInputResetPassword(true)
        setOtpError("");
    }
    const handleConfirmPassword = async () => {
        setIsLoading(true);
        try {
            const url = localStorage.getItem('url');
            const response = await changePasswordService({ url, password, confirmPassword });
            if (response && response.status === "success") {
                toast.success("Đổi mật khẩu thành công", 1000)
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
        handleClose()
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={handleClose}
            >
                <div
                    className={`w-[500px] ${showInputResetPassword ? "h-[600px]" : "h-[540px]"}  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] pt-2 flex flex-col items-center`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-[27px] text-[#0F3E4A] font-bold my-5">Đăng nhập</div>
                    <div
                        className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] hover:bg-[#fbf9f9] w-[450px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={google} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[16px]">Đăng nhập với Google</div>
                    </div>
                    <div className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] hover:bg-[#fbf9f9] w-[450px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={facebook} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[16px]">Đăng nhập với Facebook</div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 w-[450px] mb-5">
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
                        className={`h-[40px] w-[450px] rounded-[5px] border  bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none ${emailError === "" ? "border-[#ccd0d5]" : "border-red-500"}`}
                        placeholder="Tên đăng nhập..." />
                    <p className="text-red-500 w-[450px] h-[20px] flex justify-start items-center text-[14px] px-2">{emailError}</p>
                    {forgetPass ? (<>

                        <>
                            <div className=" w-[450px] mx-auto flex max-w-lg items-center gap-4 h-[40px]">
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
                            <p

                                className="text-red-500 w-[450px] h-[20px] flex justify-start items-center text-[14px] px-2">{otpError}</p>
                        </>
                    </>) : (
                        <InputType
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={checkInputPassword}
                            placeholder="Mật khẩu"
                            errorMessage={passwordError}
                        ></InputType>
                    )}
                    {showInputResetPassword ? (
                        <div className="w-[450px] flex flex-col">
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
                    )
                        : (<></>)}

                    {forgetPass ?
                        (<div>

                        </div>) : (
                            <div className=" w-[450px] flex justify-start  mt-4">
                                <div
                                    style={{ pointerEvents: emailError ? 'none' : 'auto' }}
                                    onClick={handleForgetPassword}
                                    className="underline text-[#818080]text-[16px] cursor-pointer hover:text-primary"
                                >Quên mật khẩu?</div>
                            </div>
                        )}
                    <div className={`flex justify-between  items-center w-[450px] mt-5 fixed ${showInputResetPassword ? " bottom-[80px] " : " bottom-[120px] "}`}>
                        {forgetPass ? (
                            <div
                                onClick={() => { setForgetPass(false); setShowInputResetPassword(false) }}
                                className="text-[#818080] text-[16px] cursor-pointer hover:text-primary">Đăng nhập bằng mật khẩu</div>
                        ) : (
                            <div className="text-[#818080] w-[100px] text-[16px] cursor-pointer hover:text-primary">Tạo tài khoản</div>
                        )}
                        {forgetPass ? (<>
                            {showInputResetPassword ? (
                                <button
                                    onClick={() => handleConfirmPassword()}
                                    className="disabled:bg-gray-400 h-[45px] w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                                    {isLoading ? "Đang xác nhận" : "Xác nhận"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleConfirmOTP()}
                                    className="disabled:bg-gray-400 h-[45px] w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                                    {isLoading ? "Đang xác nhận" : "Xác nhận"}
                                </button>
                            )}

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