import google from "../../assets/images/google.png"
import facebook from "../../assets/images/facebook.png"
import { useCallback, useContext, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/login";
import { UserContext } from "../../contexts/UserContext";
import InputType from "../../components/Input/InputType";

function Login({ onClose, onForgetPassword, setEmailParent }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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


    const handleForgetPassword = async () => {
        if (!checkInputEmail()) return;
        setEmailParent(email);
        onForgetPassword();
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={handleClose}
            >
                <div
                    className="modal w-[500px] h-[580px] flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-[27px] w-[400px] text-[#0F3E4A] font-bold mt-8 mb-5">Đăng nhập và tiếp tục cuộc hành trình của bạn!</div>
                    <div
                        className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] justify-center hover:bg-[#fbf9f9] w-[450px] h-[40px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={google} alt="" className="w-[35px] h-[30px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[16px]">Đăng nhập với Google</div>
                    </div>
                    <div className="flex mb-5 gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] justify-center hover:bg-[#fbf9f9] w-[450px] h-[40px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={facebook} alt="" className="w-[35px] h-[30px] object-cover" />
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
                        className={`h-[40px] w-[450px] rounded-[5px] border  bg-white px-3 shadow focus:border-blue-400 focus:outline-none ${emailError === "" ? "border-[#ccd0d5]" : "border-red-500"}`}
                        placeholder="Tên đăng nhập..." />
                    <p className="text-red-500 w-[450px] h-[20px] flex justify-start items-center text-[14px] px-2">{emailError}</p>

                    <InputType
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={checkInputPassword}
                        placeholder="Mật khẩu"
                        errorMessage={passwordError}
                    ></InputType>
                    <div className=" w-[450px] flex justify-start  mt-3">
                        <div
                            style={{ pointerEvents: emailError ? 'none' : 'auto' }}
                            onClick={handleForgetPassword}
                            className="underline text-[#818080] text-[16px] cursor-pointer hover:text-primary"
                        >Quên mật khẩu?</div>
                    </div>
                    <div className={`flex justify-between  items-center w-[450px] mt-5 fixed bottom-[120px]`}>
                        <div className="text-[#818080] w-[100px] text-[16px] cursor-pointer hover:text-primary">Tạo tài khoản</div>
                        <button
                            onClick={() => handleLogin()}
                            className="disabled:bg-gray-400 h-[45px] w-[140px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none">
                            {isLoading ? "Đang Đăng nhập..." : "Đăng nhập"}
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Login;