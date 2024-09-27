import React, { useContext, useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import logo from "../../assets/images/logo1.png";
// import Login from "../../modules/auth/Login";
import Login from "../../modules/auth/Login"
import SendOTP from "../../modules/auth/SendOTP"
import ForgetPassword from "../../modules/auth/ForgetPassword"
import Register from "../../modules/auth/Register";
import VerifyAccount from "../../modules/auth/VerifyAccount";
import * as MdIcons from "react-icons/md";
// import noImages from "../../images/noImages.jpg";
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
// import Tippy from 'tippy.js';
import ava from "../../assets/images/ava.jpg";
import { useAuthStore } from "../../services/authUser";
import { logoutService } from "../../services/login";
// import { Container } from './styles';
function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    var { isRegister, isVerifyAccount, userVerify } = useAuthStore();

    const showDropdown = () => {
        setDropdown(!dropdown);
    };

    var [register, setRegister] = useState(false);
    const [isVerifyAccountOpen, setIsVerifyAccountOpen] = useState(false);
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate()

    const [showLogin, setShowLogin] = useState(false);
    const [showSendOTP, setShowSendOTP] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const [email, setEmailParent] = useState("");

    const handleLoginOpen = () => setShowLogin(true);
    const handleLoginClose = () => setShowLogin(false);
    const handleSendOTPOpen = () => {
        setShowLogin(false);
        setShowSendOTP(true);
    };
    const handleSendOTPClose = () => setShowSendOTP(false);

    const handleForgetPasswordOpen = () => {
        setShowSendOTP(false);
        setShowForgetPassword(true);
    };
    const handleForgetPasswordClose = () => setShowForgetPassword(false);
    const switchToLogin = () => {
        setShowSendOTP(false)
        setShowForgetPassword(false);
        setShowLogin(true)
    };

    const handleRegister = () => {
        setRegister(true);
    };
    const handleClose = () => {
        setLogin(false);
        setRegister(isRegister);
        setIsVerifyAccountOpen(false);
    };

    useEffect(() => {
        setRegister(isRegister);
        if (!isRegister && !isVerifyAccount) {
            setIsVerifyAccountOpen(false);
        } else if (isRegister) {
            setIsVerifyAccountOpen(true);
        }
    }, [isRegister, isVerifyAccount]);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUser(userVerify);
    }, [userVerify]);


    const handleLogout = async () => {
        try {
            const res = await logoutService();
            console.log("error:", res)
            console.log("User logged out");
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }

    }

    return (
        <nav className="sticky top-0 z-20 flex h-24 w-full flex-col items-center justify-center bg-white">
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between lg:px-3">
                <div
                    className={`${user ? "" : "mx-auto w-11/12 lg:w-full"} flex h-full items-center justify-between`}
                >
                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-2">
                            <img src={logo} alt="Logo" className="w-[5em]" />
                            <div className="flex h-[35px] w-[166px]">
                                <span
                                    className="text-[28px] font-normal leading-[37.63px] tracking-[3.36px]"
                                    style={{
                                        color: "#13c892",
                                        fontFamily: "Leckerli One, cursive",
                                    }}
                                >
                                    Trip
                                </span>
                                <span
                                    className="text-[28px] font-normal leading-[37.63px] tracking-[3.36px]"
                                    style={{
                                        color: "#ff7224",
                                        fontFamily: "Leckerli One, cursive",
                                    }}
                                >
                                    Joy
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {user ? (
                    <div className="flex items-center gap-x-3">
                        <MdIcons.MdNotifications className="h-[30px] w-[23.74px] cursor-pointer text-iconGray sm:h-[40px] sm:w-[30.74px]" />
                        <div className="flex cursor-pointer items-center gap-x-1.5">
                            <img
                                src={ava}
                                alt="Avatar-user"
                                className="rounded-90 h-[41px] w-[42px] sm:h-[51px] sm:w-[52px]"
                            />
                            <h3 className="text-base font-medium sm:block">Bach Duong</h3>
                            <MdIcons.MdExpandMore className="h-[18px] w-[18px] text-iconGray sm:h-[20px] sm:w-[20px]" onClick={handleLogout} />
                        </div>
                    </div>
                ) : (
                    <ul className="flex items-center gap-x-4 max-lg:hidden xl:gap-12">
                        <a
                            href="#"
                            className="w-[6em] text-lg font-bold leading-normal text-black no-underline hover:text-primary"
                        >
                            Trang chủ
                        </a>
                        <a
                            href="#"
                            className="w-[6rem] text-lg font-bold leading-normal text-black no-underline hover:text-primary"
                        >
                            Liên hệ
                        </a>
                        <a
                            href="#"
                            className="w-[8rem] text-lg font-bold leading-normal text-black no-underline hover:text-primary"
                            onClick={handleLoginOpen}
                        >
                            Đăng nhập
                        </a>
                        {showLogin && (
                            <Login
                                onClose={handleLoginClose}
                                onForgetPassword={handleSendOTPOpen}
                                setEmailParent={setEmailParent}
                            />
                        )}

                        {showSendOTP && (
                            <SendOTP
                                onClose={handleSendOTPClose}
                                email={email}
                                onConfirmOTP={handleForgetPasswordOpen}
                                switchToLogin={switchToLogin}
                            />
                        )}

                        {showForgetPassword && (
                            <ForgetPassword
                                onClose={handleForgetPasswordClose}
                                email={email}
                                switchToLogin={switchToLogin}
                            />
                        )}
                        <button
                            className="px-13 transition-bg h-[39px] w-32 cursor-pointer rounded-[20px] bg-[#ff7224] text-base font-semibold text-white shadow outline-none hover:border hover:border-primary hover:bg-white hover:text-primary"
                            onClick={handleRegister}
                        >
                            Đăng kí
                        </button>

                        {register && <Register onClose={handleClose}></Register>}
                        {isVerifyAccount && (
                            <VerifyAccount onClose={handleClose}></VerifyAccount>
                        )}
                    </ul>
                )}
                {dropdown ? (
                    <div
                        onClick={showDropdown}
                        className="cursor-pointer text-[22px] text-black lg:hidden"
                    >
                        <MdClose />
                    </div>
                ) : (
                    <div
                        onClick={showDropdown}
                        className="cursor-pointer text-[22px] text-black lg:hidden"
                    >
                        <HiMenuAlt3 />
                    </div>
                )}
            </div>
            {dropdown && (
                <div className="fixed top-24 w-full bg-primary transition-all lg:hidden">
                    <div className="flex w-full flex-col items-baseline gap-4">
                        <ul className="flex w-full flex-col justify-center">
                            <a
                                href="#"
                                className="text flex h-10 items-center px-6 font-bold leading-normal text-white no-underline"
                            >
                                Trang chủ
                            </a>
                            <a href="">Tours</a>
                            <a href="">Pages</a>
                            <a href="">Contact</a>
                        </ul>
                    </div>
                </div>
            )}
            {/* {login && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <Login onClose={handleClose} />
                </div>
            )} */}
        </nav>
    );
}

export default Navbar;
