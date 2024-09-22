import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import logo from "../../images/logo1.png";
import Login from "../Layout/Login";
import Register from "../Layout/Register";
import VerifyAccount from "../Layout/VerifyAccount";
import * as MdIcons from "react-icons/md";
import ava from "../../images/ava.jpg";
import { useAuthStore } from "../../store/authUser";

// import { Container } from './styles';
function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  var { isRegister, isVerifyAccount, userVerify } = useAuthStore();
  const showDropdown = () => {
    setDropdown(!dropdown);
  };
  const [login, setLogin] = useState(false);
  var [register, setRegister] = useState(false);
  const [isVerifyAccountOpen, setIsVerifyAccountOpen] = useState(false);

  const handleLogin = () => {
    setLogin(true);
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

  return (
    <nav className="sticky top-0 z-20 flex h-24 w-full flex-col items-center justify-center bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between lg:px-3">
        <div
          className={`${currentUser ? "" : "mx-auto w-11/12 lg:w-full"} flex h-full items-center justify-between`}
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
        {currentUser ? (
          <div className="flex items-center gap-x-3">
            <MdIcons.MdNotifications className="h-[30px] w-[23.74px] cursor-pointer text-iconGray sm:h-[40px] sm:w-[30.74px]" />
            <div className="flex cursor-pointer items-center gap-x-1.5">
              <img
                src={ava}
                alt="Avatar-user"
                className="rounded-90 h-[41px] w-[42px] sm:h-[51px] sm:w-[52px]"
              />
              <h3 className="text-base font-medium sm:block">Bach Duong</h3>
              <MdIcons.MdExpandMore className="h-[18px] w-[18px] text-iconGray sm:h-[20px] sm:w-[20px]" />
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
              onClick={handleLogin}
            >
              Đăng nhập
            </a>
            {login && <Login onClose={handleClose}></Login>}
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
      {login && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Login onClose={handleClose} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
