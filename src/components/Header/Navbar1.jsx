import React, { useContext, useEffect, useState, useRef } from "react";
import { Collapse, Dropdown, initTWE } from "tw-elements";
import gifLogo from "../../assets/images/airplane_16121567.gif";
import staticLogo from "../../assets/images/logoTripJoy.png";

// import Login from "../../modules/auth/Login";
import Login from "../../modules/auth/Login";
import SendOTP from "../../modules/auth/SendOTP";
import ForgetPassword from "../../modules/auth/ForgetPassword";
import Register from "../../modules/auth/Register";
import * as MdIcons from "react-icons/md";
// import noImages from "../../images/noImages.jpg";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react/headless';
import { useAuthStore } from "../../services/authUser";
import { logoutService } from "../../services/login";

import Search from "./Search";
import avatarDefault from "../../assets/images/avatarDefault.png"
import LoadingSpinner from "../Loading/LoadingSpinner";
const Navbar1 = () => {
  initTWE({ Collapse, Dropdown });
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isLogin = localStorage.getItem('isLogin');
  const [loading, setLoading] = useState(false);
  // Hàm xử lý khi nhấn vào nút
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen); // Đảo ngược trạng thái hiển thị menu
  };

  const [dropdown, setDropdown] = useState(false);
  var { isRegister, isVerifyAccount, userVerify } = useAuthStore();

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  var [register, setRegister] = useState(false);
  const [isVerifyAccountOpen, setIsVerifyAccountOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(user.profile.id);
  const [showLogin, setShowLogin] = useState(false);
  // const [showRegister, setShowRegister] = useState(false);

  const [showSendOTP, setShowSendOTP] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [email, setEmailParent] = useState("");
  const location = useLocation();
  const handleLoginOpen = () => {
    console.log("chuyển qua trang login");
    setShowLogin(true);
    setRegister(false);
  };
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
    setShowSendOTP(false);
    setShowForgetPassword(false);
    setShowLogin(true);
  };

  const handleRegister = () => {
    setRegister(true);
  };
  const handleClose = () => {
    setShowLogin(false);
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
      setLoading(true);
      const res = await logoutService();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem('isLogin');
      localStorage.removeItem('userInfo');
      setLoading(false);
      navigate("/");
      logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleHideResult = () => {
    setShowMenu(false);
  };
  useEffect(() => {
    handleHideResult();
  }, [location.pathname])
  const handleClickProfile = () => {
    console.log("hi")
    navigate(`/profile/${user.profile.id}`);
    // window.location.reload();
  };
  return (
    <div>
      <nav className="shadow-dark-mild fixed top-0 z-20 flex h-[62px] w-full flex-wrap justify-between bg-zinc-50 py-2 font-[sans-serif] shadow-sm lg:py-4">
        <div className="mt-[-7px] flex w-full flex-wrap items-center justify-between px-2">
          {/* <div
            className={`${user ? "" : "mx-auto w-11/12 lg:w-full"} flex h-full items-center justify-between`}
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-3">
                <img src={logo} alt="Logo" className="ml-5 w-[4em]" />
                <div className="flex h-[25px] w-[146px]">
                  <span
                    className="text-[25px] font-normal leading-[17px] tracking-[3.36px]"
                    style={{
                      color: "#13c892",
                      fontFamily: "Leckerli One, cursive",
                    }}
                  >
                    Trip
                  </span>
                  <span
                    className="text-[28px] font-normal leading-[17px] tracking-[3.36px]"
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
          </div> */}

          {isLogin ? (
            <div className="flex w-full">
              <div
                className={`${user ? "" : "mx-auto w-11/12 lg:w-full"} flex h-full items-center justify-between`}
              >
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={isHovered ? gifLogo : staticLogo}
                      alt="Logo"
                      className={`ml-5 mt-[-4px] ${isHovered ? "w-[3.3em]" : "w-[3.1em]"}`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    />
                  </div>
                </div>
              </div>
              <Search></Search>

              <ul className="z-50 ml-[170px] mt-2 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-2/3 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-[#151d20] max-lg:px-10 max-lg:py-4 max-lg:shadow-md lg:!flex lg:gap-x-12">
                <li className="px-3 max-lg:border-b max-lg:py-3">
                  <a
                    href="/network"
                    className="text-gray-300 divide flex flex-col items-center gap-1 text-base text-blue-600 hover:text-blue-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 511.999" fill="currentColor" className="h-6 w-6"                    >
                      <path
                        d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"
                        data-original="#000000"
                      />
                    </svg>
                  </a>
                </li>
                <li className="px-3 max-lg:border-b max-lg:py-3">
                  <a
                    href="/plan"
                    className="text-gray-300 divide flex flex-col items-center gap-1 text-base hover:text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="h-6 w-6"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M27.531 30h-8.062A2.472 2.472 0 0 1 17 27.531V17.469A2.472 2.472 0 0 1 19.469 15h8.062A2.472 2.472 0 0 1 30 17.469v10.062A2.472 2.472 0 0 1 27.531 30zm-8.062-13a.469.469 0 0 0-.469.469v10.062c0 .259.21.469.469.469h8.062c.259 0 .469-.21.469-.469V17.469a.469.469 0 0 0-.469-.469zm8.062-4h-8.062A2.472 2.472 0 0 1 17 10.531V4.469A2.472 2.472 0 0 1 19.469 2h8.062A2.472 2.472 0 0 1 30 4.469v6.062A2.472 2.472 0 0 1 27.531 13zm-8.062-9a.469.469 0 0 0-.469.469v6.062c0 .259.21.469.469.469h8.062c.259 0 .469-.21.469-.469V4.469A.469.469 0 0 0 27.531 4zm-6.938 13H4.469A2.472 2.472 0 0 1 2 14.531V4.469A2.472 2.472 0 0 1 4.469 2h8.062A2.472 2.472 0 0 1 15 4.469v10.062A2.472 2.472 0 0 1 12.531 17zM4.469 4A.469.469 0 0 0 4 4.469v10.062c0 .259.21.469.469.469h8.062c.259 0 .469-.21.469-.469V4.469A.469.469 0 0 0 12.531 4zm8.062 26H4.469A2.472 2.472 0 0 1 2 27.531v-6.062A2.472 2.472 0 0 1 4.469 19h8.062A2.472 2.472 0 0 1 15 21.469v6.062A2.472 2.472 0 0 1 12.531 30zm-8.062-9a.469.469 0 0 0-.469.469v6.062c0 .259.21.469.469.469h8.062c.259 0 .469-.21.469-.469v-6.062a.469.469 0 0 0-.469-.469z"
                        data-original="#000000"
                      />
                    </svg>

                  </a>
                </li>
                <li className="px-3 max-lg:border-b max-lg:py-3">
                  <a
                    href="#"
                    className="text-gray-300 divide flex flex-col items-center gap-1 text-base hover:text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="h-6 w-6"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                        data-original="#000000"
                      ></path>
                    </svg>

                  </a>
                </li>
                <li className="mt-[-3px] px-3 max-lg:border-b max-lg:py-3">
                  <a
                    href="#"
                    className="text-gray-300 divide flex flex-col items-center gap-1 text-base hover:text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                    >
                      <path d="M 13.1875 3 L 13.03125 3.8125 L 12.4375 6.78125 C 11.484375 7.15625 10.625 7.683594 9.84375 8.3125 L 6.9375 7.3125 L 6.15625 7.0625 L 5.75 7.78125 L 3.75 11.21875 L 3.34375 11.9375 L 3.9375 12.46875 L 6.1875 14.4375 C 6.105469 14.949219 6 15.460938 6 16 C 6 16.539063 6.105469 17.050781 6.1875 17.5625 L 3.9375 19.53125 L 3.34375 20.0625 L 3.75 20.78125 L 5.75 24.21875 L 6.15625 24.9375 L 6.9375 24.6875 L 9.84375 23.6875 C 10.625 24.316406 11.484375 24.84375 12.4375 25.21875 L 13.03125 28.1875 L 13.1875 29 L 18.8125 29 L 18.96875 28.1875 L 19.5625 25.21875 C 20.515625 24.84375 21.375 24.316406 22.15625 23.6875 L 25.0625 24.6875 L 25.84375 24.9375 L 26.25 24.21875 L 28.25 20.78125 L 28.65625 20.0625 L 28.0625 19.53125 L 25.8125 17.5625 C 25.894531 17.050781 26 16.539063 26 16 C 26 15.460938 25.894531 14.949219 25.8125 14.4375 L 28.0625 12.46875 L 28.65625 11.9375 L 28.25 11.21875 L 26.25 7.78125 L 25.84375 7.0625 L 25.0625 7.3125 L 22.15625 8.3125 C 21.375 7.683594 20.515625 7.15625 19.5625 6.78125 L 18.96875 3.8125 L 18.8125 3 Z M 14.8125 5 L 17.1875 5 L 17.6875 7.59375 L 17.8125 8.1875 L 18.375 8.375 C 19.511719 8.730469 20.542969 9.332031 21.40625 10.125 L 21.84375 10.53125 L 22.40625 10.34375 L 24.9375 9.46875 L 26.125 11.5 L 24.125 13.28125 L 23.65625 13.65625 L 23.8125 14.25 C 23.941406 14.820313 24 15.402344 24 16 C 24 16.597656 23.941406 17.179688 23.8125 17.75 L 23.6875 18.34375 L 24.125 18.71875 L 26.125 20.5 L 24.9375 22.53125 L 22.40625 21.65625 L 21.84375 21.46875 L 21.40625 21.875 C 20.542969 22.667969 19.511719 23.269531 18.375 23.625 L 17.8125 23.8125 L 17.6875 24.40625 L 17.1875 27 L 14.8125 27 L 14.3125 24.40625 L 14.1875 23.8125 L 13.625 23.625 C 12.488281 23.269531 11.457031 22.667969 10.59375 21.875 L 10.15625 21.46875 L 9.59375 21.65625 L 7.0625 22.53125 L 5.875 20.5 L 7.875 18.71875 L 8.34375 18.34375 L 8.1875 17.75 C 8.058594 17.179688 8 16.597656 8 16 C 8 15.402344 8.058594 14.820313 8.1875 14.25 L 8.34375 13.65625 L 7.875 13.28125 L 5.875 11.5 L 7.0625 9.46875 L 9.59375 10.34375 L 10.15625 10.53125 L 10.59375 10.125 C 11.457031 9.332031 12.488281 8.730469 13.625 8.375 L 14.1875 8.1875 L 14.3125 7.59375 Z M 16 11 C 13.25 11 11 13.25 11 16 C 11 18.75 13.25 21 16 21 C 18.75 21 21 18.75 21 16 C 21 13.25 18.75 11 16 11 Z M 16 13 C 17.667969 13 19 14.332031 19 16 C 19 17.667969 17.667969 19 16 19 C 14.332031 19 13 17.667969 13 16 C 13 14.332031 14.332031 13 16 13 Z"></path>
                    </svg>

                  </a>
                </li>
              </ul>
              <ul
                className="list-style-none mr-5 ms-auto flex flex-row items-center ps-0 md:ps-4"
                data-twe-navbar-nav-ref
              >

                <li className="relative px-2" data-twe-dropdown-ref>
                  <a
                    className="hidden-arrow flex items-center text-blue-800/80 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                    href="#"
                    id="dropdownMenuButton1"
                    role="button"
                    data-twe-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <span className="[&>svg]:h-7 [&>svg]:w-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                        <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                      </svg>
                    </span>

                    <span className="absolute -mt-6 ms-5 rounded-full bg-red-600 px-[0.50em] py-[0.25em] text-[0.6rem] font-bold leading-none text-white">
                      6
                    </span>
                  </a>

                  <ul
                    className="dark:bg-surface-dark absolute z-[1000] float-left hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block"
                    aria-labelledby="dropdownMenuButton1"
                    data-twe-dropdown-menu-ref
                  >
                    <li>
                      <a
                        className="dark:bg-surface-dark block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                      >
                        Some news
                      </a>
                    </li>
                    <li>
                      <a
                        className="dark:bg-surface-dark block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                      >
                        Another news
                      </a>
                    </li>
                    <li>
                      <a
                        className="dark:bg-surface-dark block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                      >
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>

                <li
                  className="relative px-2"
                  data-twe-dropdown-ref
                  data-twe-dropdown-alignment="end"
                >
                  <a
                    className="hidden-arrow mr  flex items-center text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                    href="#"
                    id="dropdownMenuButton1"
                    role="button"
                    data-twe-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <span className="[&>svg]:h-7 [&>svg]:w-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="absolute -mt-6 ms-3 rounded-full bg-red-500 px-[0.50em] py-[0.25em] text-[0.6rem] font-bold leading-none text-white">
                      12
                    </span>
                  </a>

                  <ul
                    className="dark:bg-surface-dark absolute z-[1000] float-left hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block"
                    aria-labelledby="dropdownMenuButton1"
                    data-twe-dropdown-menu-ref
                  >
                    <li>
                      <a
                        className="dark:bg-surface-dark block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                      >
                        Some news
                      </a>
                    </li>
                    <li>
                      <a
                        className="dark:bg-surface-dark block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                      >
                        Another news
                      </a>
                    </li>
                    <li>
                      <a
                        className="dark:bg-surface-dark block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                      >
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="px-2" data-twe-nav-item-ref>
                  <a
                    className="flex transition duration-200  hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                    // href="#"
                    data-twe-nav-link-ref
                  >
                    <Tippy
                      onClickOutside={handleHideResult}
                      visible={showMenu}
                      interactive
                      placement="bottom-end"
                      render={(attrs) => (
                        <div
                          className="w-[200px] items-start flex"
                          tabIndex="-1"
                          {...attrs}
                        >
                          <div className="w-full min-h-[100px] rounded-lg shadow-xl bg-white mt-[-10px] py-2 flex-col flex gap-1">
                            <div
                              onClick={handleClickProfile}
                              className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer ">
                              {/* <MdIcons.MdOutlinePerson className=" text-[25px]" /> */}
                              <img src={avatarDefault} alt="" className="w-[30px] h-[30px] rounded-full" />
                              <span className="text-[14px]">{user?.profile.userName}</span>
                            </div>
                            <div className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer ">
                              <MdIcons.MdOutlineSettings className=" text-[25px]" />
                              <span className="text-[14px]">Cài đặt</span>
                            </div>
                            <div
                              onClick={handleLogout}
                              className="flex items-center gap-2 hover:bg-[#16182312] px-3 h-[40px] cursor-pointer"
                            >
                              <MdIcons.MdLogin className=" text-[25px]" />
                              <span className="text-[14px]">Đăng xuất</span>
                            </div>
                          </div>
                        </div>
                      )}>
                      <img
                        onMouseEnter={() => {
                          setShowMenu(true);
                        }}
                        src={avatarDefault}
                        type="button"
                        // data-dropdown-toggle="userDropdown"
                        // data-dropdown-placement="bottom-start"
                        className="h-[40px] w-[40px] cursor-pointer rounded-full"
                        //   style="height: 25px; width: 25px"
                        alt="Avatar-user"
                        loading="lazy"
                      />
                    </Tippy>
                    {/* <!-- Dropdown menu --> */}

                  </a>
                  {/* */}
                </li>

              </ul>

            </div>

          ) : (
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-3">
                  {/* <img
                    src={isHovered ? gifLogo : staticLogo}
                    alt="Logo"
                    className={`ml-5 mt-[-4px] ${isHovered ? "block w-[3.6em]" : "w-[3.3em]"}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  /> */}
                  <img
                    src={staticLogo}
                    alt="Logo"
                    className="ml-5 mt-[-4px] w-[3.3em]"
                  />
                  <div className="flex h-[25px] w-[146px]">
                    <span
                      className="text-[25px] font-normal leading-[17px] tracking-[3.36px]"
                      style={{
                        color: "#13c892",
                        fontFamily: "Leckerli One, cursive",
                      }}
                    >
                      Trip
                    </span>
                    <span
                      className="text-[28px] font-normal leading-[17px] tracking-[3.36px]"
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
              <div
                id="collapseMenu"
                className={`${isMenuOpen ? "block" : "hidden"
                  } max-lg:before:fixed max-lg:before:inset-0 max-lg:before:z-50 max-lg:before:bg-black max-lg:before:opacity-50 lg:!block`}
              >
                <button
                  id="toggleClose"
                  className="fixed right-4 top-2 z-[100] rounded-full bg-white p-3 lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 fill-black"
                    viewBox="0 0 320.591 320.591"
                  >
                    <path
                      d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>

                <ul className="z-50 gap-x-5 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-white max-lg:p-6 max-lg:shadow-md lg:flex">
                  <li className="border-gray-300 px-3 max-lg:border-b max-lg:py-3">
                    <a
                      href="#"
                      className="divide block text-[17px] font-medium text-[#007bff] hover:text-[#007bff]"
                    >
                      Trang chủ
                    </a>
                  </li>
                  <li className="border-gray-300 px-3 max-lg:border-b max-lg:py-3">
                    <a
                      href="# "
                      className="text-gray-500 block text-[17px] font-medium hover:text-[#007bff]"
                    >
                      Thịnh hành
                    </a>
                  </li>
                  <li className="border-gray-300 px-3 max-lg:border-b max-lg:py-3">
                    <a
                      href="# "
                      className="text-gray-500 block text-[17px] font-medium hover:text-[#007bff]"
                    >
                      Tính năng
                    </a>
                  </li>
                  <li className="border-gray-300 px-3 max-lg:border-b max-lg:py-3">
                    <a
                      href="# "
                      className="text-gray-500 block text-[17px] font-medium hover:text-[#007bff]"
                    >
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mr-10 flex space-x-3 max-lg:ml-auto">
                <button
                  className="rounded-full border-2 border-[#007bff] bg-[#007bff] px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#007bff]"
                  onClick={handleLoginOpen}
                >
                  Đăng nhập
                </button>
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
                  className="rounded-full border-2 border-[#ff6600] bg-[#FF7324] px-5 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#007bff]"
                  onClick={handleRegister}
                >
                  Đăng kí
                </button>
                {register && (
                  <Register
                    onClose={handleClose}
                    onSwitchToLogin={handleLoginOpen}
                  />
                )}

                <button id="toggleOpen" className="lg:hidden" onClick={handleClick}>
                  <svg
                    className="h-7 w-7"
                    fill="#000"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {isMenuOpen ? "Close Menu" : "Open Menu"}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      {loading && <LoadingSpinner></LoadingSpinner>}
    </div>
  );
};

export default Navbar1;
