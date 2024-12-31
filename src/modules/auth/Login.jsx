import google from "../../assets/images/google.png"
import facebook from "../../assets/images/facebook.png"
import { useCallback, useContext, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/login";
import { UserContext } from "../../contexts/UserContext";
import InputType from "../../components/Input/InputType";
import { getCurrentUser } from "../../services/getCurrentUser";
import LoadingSpinner from "../../components/Loading";
import DialogSucess from "../../components/Notification/DialogSuccess";

function Login({ onClose, onForgetPassword, setEmailParent }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const { login } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();
    const handleClose = () => {
        setEmail('');
        setPassword('');
        onClose();
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
            // console.log('Login success:', response);
            const { accessToken, refreshToken } = response;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            const user = await getCurrentUser();
            localStorage.setItem('userInfo', JSON.stringify(user));
            login(user);
            setIsLoading(false);
            // setShowDialog(true);
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


    const handleForgetPassword = async () => {
        if (!checkInputEmail()) return;
        setEmailParent(email);
        onForgetPassword();
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="modal md:w-[500px] w-4/5 h-[580px] flex px-3  border-2 border-none rounded-lg shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="md:text-[27px] text-[20px] md:w-[400px] text-[#0F3E4A] font-bold mt-8 mb-5">Đăng nhập và tiếp tục cuộc hành trình của bạn!</div>
                    <div
                        className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] justify-center hover:bg-[#fbf9f9] md:w-[450px] w-full md:px-0 px-5 h-[40px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={google} alt="" className="w-[35px] h-[30px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold md:text-[16px] text-[14px]">Đăng nhập với Google</div>
                    </div>
                    <div className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] justify-center hover:bg-[#fbf9f9] md:w-[450px] w-full md:px-0 px-5 h-[40px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={facebook} alt="" className="w-[35px] h-[30px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold md:text-[16px] text-[14px]">Đăng nhập với Facebook</div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 md:w-[450px] w-full md:px-0 px-5 mb-5">
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                        <span className="text-[#658C96] md:text-[16px] text-[14px]">or</span>
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                    </div>

                    <input
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        pattern=".+@example\.com"
                        onBlur={checkInputEmail}
                        size="30"
                        className={`h-[40px] md:w-[450px] md:text-[16px] text-[14px] w-full md:px-3 px-5 rounded-[5px] border  bg-white  shadow focus:border-blue-400 focus:outline-none ${emailError === "" ? "border-[#ccd0d5]" : "border-red-500"}`}
                        placeholder="Tên đăng nhập..." />
                    <p className="text-red-500 md:w-[450px] w-full h-[20px] flex justify-start items-center text-[11px] ">{emailError}</p>

                    <InputType
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={checkInputPassword}
                        placeholder="Mật khẩu"
                        errorMessage={passwordError}
                    ></InputType>
                    <div className=" md:w-[450px] md:px-3 px-5 flex justify-start  mt-3">
                        <div
                            style={{ pointerEvents: emailError ? 'none' : 'auto' }}
                            onClick={handleForgetPassword}
                            className="underline text-[#818080] md:text-[16px] text-[13px] cursor-pointer hover:text-primary"
                        >Quên mật khẩu?</div>
                    </div>
                    <div className={`flex justify-between  items-center md:w-[450px] w-full mt-5`}>
                        <div className="text-[#818080] w-[100px] text-[14px] md:text-[16px] cursor-pointer hover:text-primary">Tạo tài khoản</div>
                        <button
                            onClick={() => handleLogin()}
                            className="disabled:bg-gray-400 md:py-3 py-2 w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                            Đăng nhập
                        </button>
                    </div>
                </div>
                {/* {showDialog && <DialogSucess
                    message="Đăng nhập thành công"
                    description="Chào mừng bạn đến với TripJoy"
                />} */}
                {isLoading && <LoadingSpinner></LoadingSpinner>}

            </div>
        </>
    );
}

export default Login;   