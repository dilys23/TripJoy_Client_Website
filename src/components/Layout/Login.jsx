import google from "../../images/google.png"
import facebook from "../../images/facebook.png"
import * as FaIcon from "react-icons/fa";
import { useContext, useState } from "react";
// import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import loginService from "../../services/login";
import { UserContext } from "../../contexts/UserContext";

function Login({ onClose }) {
    const [showPass, setShowPass] = useState(false);
    const [hasErrorEmail, setHasErrorEmail] = useState(false);
    const [hasErrorPass, setHasErrorPass] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const handleShow = () => {
        setShowPass(!showPass)
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleClose = () => {
        setEmail('');
        setPassword('');
        onClose();
    };
    const handleChangeEmail = (e) => {
        const emailValue = e.target.value
        if (!emailValue.startsWith(' ')) {
            setEmail(emailValue)
        }
    }

    const handleLogin = async () => {
        if (!email) {
            // setHasErrorEmail(true)
            // toast.error("Vui lòng nhập Email", {
            //     autoClose: 1000
            // });
            setTimeout(() => {
                setHasErrorEmail(false);
            }, 2000);
            return
        }
        if (!password) {
            // setHasErrorPass(true)
            // toast.error("Vui lòng nhập mật khẩu", {
            //     autoClose: 1000
            // }
            // );
            setTimeout(() => {
                setHasErrorPass(false);
            }, 2000);
            return
        }
        try {
            const response = await loginService(email, password);
            console.log('Login success:', response);
            const { accessToken, user } = response;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userInfo', JSON.stringify(user));
            login(user);

            // toast.success("Login successful", {
            //     autoClose: 1000
            // });
            handleClose();
            navigate('/network');
        } catch (error) {
            if (error.response && error.response.data) {
                const { errors } = error.response.data;
                if (errors && errors["Auth.InvalidCredentials"]) {
                    console.log("Tài khoản hoặc mật khẩu không đúng")
                    // toast.error("Tài khoản hoặc mật khẩu không đúng", {
                    //     autoClose: 1000
                    // });
                } else {
                    console.log("Đăng nhập thất bại, vui lòng thử lại")
                    // toast.error("Đăng nhập thất bại, vui lòng thử lại", {
                    //     autoClose: 1000
                    // });
                }
            } else {
                console.log("Lỗi kết nối, vui lòng thử lại")
                // toast.error("Lỗi kết nối, vui lòng thử lại", {
                //     autoClose: 1000
                // });
            }
        }
    }

    return (
        <>

            <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-50"
                onClick={handleClose}
            >
                <div
                    className="w-[500px] h-[600px] border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] pt-2 flex flex-col items-center gap-y-5"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-[27px] text-[#0F3E4A] w-[370px] font-bold my-3">Đăng nhập</div>
                    <div
                        className="flex gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] hover:bg-[#fbf9f9] w-[350px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={google} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[20px]">Đăng nhập với Google</div>
                    </div>
                    <div className="flex gap-3 shadow-md stroke-[#D7D7D7] bg-[#f9f7f7] hover:bg-[#fbf9f9] w-[350px] h-[55px] stroke-3 rounded-lg items-center pl-3 cursor-pointer">
                        <img src={facebook} alt="" className="w-[40px] h-[35px] object-cover" />
                        <div className="text-[#0F3E4A] font-bold text-[20px]">Đăng nhập với Facebook</div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 w-[350px]">
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                        <span className="text-[#658C96]">or</span>
                        <hr className="flex-grow border-t border-[#DDE9ED]" />
                    </div>

                    <input
                        required
                        value={email}
                        onChange={handleChangeEmail}
                        type="text"
                        className={`flex w-[350px] h-[55px] shadow-md stroke-[#CCD0D5] bg-[#F5F6F7] items-center outline-none pl-4 text-[20px]  focus-within:border focus-within:border-[#51525c33] focus-within:rounded-[2px] ${hasErrorEmail ? " border-red-600 border-[1px]" : ""}`}
                        placeholder="Tên đăng nhập..." />

                    <div className={`relative flex w-[350px] h-[55px] shadow-md  bg-[#F5F6F7] items-center pl-4  focus-within:border focus-within:border-[#51525c33] focus-within:rounded-[2px] ${hasErrorPass ? " border-red-600 border-[1px]" : ""}`}>
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPass ? 'text' : 'password'}
                            className="w-full outline-none bg-transparent text-[20px] "
                            placeholder="Mật khẩu..."
                        />
                        <div className="absolute right-5" onClick={handleShow}>
                            {!showPass && <FaIcon.FaEye className="cursor-pointer w-[25px] h-[25px] text-[#bbb8b8]" />}
                            {showPass && <FaIcon.FaEyeSlash className="cursor-pointer w-[25px] h-[25px] text-[#bbb8b8]" />}
                        </div>
                    </div>
                    <div className="underline text-[#818080] text-[14px] cursor-pointer hover:text-primary">Quên mật khẩu?</div>
                    <div className="flex justify-between items-center w-[350px]">
                        <div className="text-[#818080] text-[18px] cursor-pointer hover:text-primary">Tạo tài khoản</div>
                        <button
                            onClick={() => handleLogin()}
                            className="bg-[#13C892] text-white font-bold text-[18px] w-[150px] h-[45px] stroke-2 rounded-20 border-gray-100 shadow-md hover:bg-white hover:text-[#13C892] transition duration-500 ease-in-out">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;