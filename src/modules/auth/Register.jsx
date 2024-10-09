import React, { useEffect, useState } from "react";
import axios from "axios";
import InputButton from "../../components/Input/InputButton";
import InputField from "../../components/Input/InputField";
import { useAuthStore } from "../../services/authUser";
import { sendOTP, register1 } from "../../services/authAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
function Register({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { register, isRegister, user } = useAuthStore();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    console.log({ email: formData.email });
    try {
      const result = await sendOTP({ email: formData.email });
      console.log(result);
      console.log("gửi otp đến email thành công ", result);
    } catch (error) {
      console.error("Lỗi khi gửi OTP:", error.message);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await register1({
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        name: formData.name,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        otp: formData.otp,
      });
      console.log("Đăng kí thành công  ", result);
      onSwitchToLogin();
    } catch (error) {
      console.error("Lỗi khi gửi thông tin:", error.message);
    }
  };
  const validateName = (value) => {
    if (!value) return "Tên không được để trống ";
    return "";
  };
  const validateEmail = (value) => {
    if (!value) return "Email không được để trống ";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email không hợp lệ";
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
  const validateOTP = (value) => {
    if (!value) return "OTP không được để trống";
    if (value.length !== 6) return "OTP phải đủ 6 số";
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
                value={formData.name}
                onChange={handleInputChange}
                validate={validateName}
                placeholder="Tên"
                required={true}
              />
              <InputField
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                validate={validateEmail}
                placeholder="Email"
                required={true}
              />
              {/* <InputButton /> */}
              <form
                className="mx-auto flex max-w-lg items-center gap-5"
                onSubmit={handleSendOTP}
              >
                <InputField
                  name="otp"
                  type="text"
                  value={formData.otp}
                  onChange={handleInputChange}
                  placeholder="OTP"
                  required={true}
                  validate={validateOTP}
                  className="w-full"
                  inputClassName="h-[40px] w-full rounded-[5px] border border-[#fffff] bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none" // Class cho input
                />

                <button
                  className="mb-4 inline-flex h-[40px] w-[40%] items-center rounded-[5px] border border-blue-700 bg-blue-700 px-5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                  onClick={handleSendOTP}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    size="1x"
                    className="ml-[-2px] px-2"
                    color="white"
                  />
                  Gửi OTP
                </button>
              </form>
              <InputField
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                validate={validatePhoneNumber}
                placeholder="Số điện thoại"
                required={true}
              />
              <InputField
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                validate={validatePassword}
                placeholder="Mật khẩu"
                required={true}
              />
              <InputField
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                validate={validateConfirmPassword}
                placeholder="Xác nhận mật khẩu"
                required={true}
              />
              <div className="flex w-full">
                <p className="text-gray-500 mb-3 mt-4 text-sm">
                  <a
                    className="text-base text-blue-800 hover:text-blue-600"
                    onClick={() => onSwitchToLogin()}
                  >
                    Tôi đã có tài khoản!
                  </a>
                </p>
                <button
                  className="disabled:bg-gray-400 ml-[170px] mt-3 h-[45px] w-[134px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none"
                // disabled={isRegister}
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
