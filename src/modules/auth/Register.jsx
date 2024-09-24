import React, { useEffect, useState } from "react";
import axios from "axios";
import InputButton from "../../components/Input/InputButton";
import InputField from "../../components/Input/InputField";
import { useAuthStore } from "../../services/authUser";
function Register({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, isRegister, user } = useAuthStore();
  const handleRegister = (e) => {
    e.preventDefault();
    register({ email, phoneNumber, name, password, confirmPassword });
    console.log(isRegister);
  };
  const validateName = (value) => {
    if (!value) return "Tên không được để trống ";
     return "";
  };
  const validateEmail = (value) => {
    if (!value) return "Email không được để trống ";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email khong hop le";
    return "";
  };
  const validatePhoneNumber = (value) => {
    if (!value) return "Số điện thoại không được để trống ";
    if (!/^\d{10}$/.test(value)) return "Số điện thoại không hợp lệ";
    return "";
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
  return (
    <div
      id="login-popup"
      // tabindex="-1"
      className="fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/65"
      onClick={onClose}
    >
      <div
        className="relative h-full w-full max-w-lg md:h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg bg-white shadow">
          {/* / w-[674px] h-[883px] bg-white rounded-[20px] shadow border border-[#d6d6d6] */}
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 popup-close absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            <h3 className="mb-0.5 text-2xl font-medium"></h3>
            <p className="text-gray-800 mb-4 text-sm font-normal"></p>

            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-7 text-slate-900">
                Tạo tài khoản mới và bắt đầu <br />
                hành trình của bạn!{" "}
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 px-3">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black focus:border-blue-400 focus:outline-none">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Đăng kí với Google
              </button>

              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black focus:border-blue-400 focus:outline-none">
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="GitHub"
                  className="h-[18px] w-[18px]"
                />
                Đăng kí với Facebook
              </button>
            </div>

            <div className="flex w-full items-center gap-2 px-3 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form className="w-full px-3" onSubmit={handleRegister}>
              
              <InputField
                name="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                validate={validateName}
                placeholder="Tên"
                required={true}
              />
              <InputField
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validate={validateEmail}
                placeholder="Email"
                required={true}
              />
              <InputButton />
              <InputField
                name="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                validate={validatePhoneNumber}
                // errorMessage="Mat khau khong hop le"
                placeholder="Số điện thoại"
                required={true}
              />
              <InputField
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validate={validatePassword}
                // errorMessage="Mat khau khong hop le"
                placeholder="Mật khẩu"
                required={true}
              />
              <InputField
                name="validateConfirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                validate={validateConfirmPassword}
                placeholder="Xác nhận mật khẩu"
                required={true}
              />
              <div className="flex w-full">
                <p className="text-gray-500 mb-3 mt-4 text-sm">
                  <a
                    href="/forgot-password"
                    className="text-base text-blue-800 hover:text-blue-600"
                  >
                    Tôi đã có tài khoản!
                  </a>
                </p>
                <button
                  className="disabled:bg-gray-400 ml-[170px] mt-3 h-[45px] w-[134px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none"
                  disabled={isRegister}
                >
                  {isRegister ? "Đang đăng kí..." : "Đăng kí"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
