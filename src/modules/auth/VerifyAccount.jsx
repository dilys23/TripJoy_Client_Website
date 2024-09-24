import React, { useState } from "react";
import axios from "axios";
// import { Input } from "./components/Input/Input";
// import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../services/authUser";

function Register({ onClose }) {
  const { user, verifyAccount } = useAuthStore();
  console.log(user?.data?.url);
  const [otp, setOtp] = useState("");
  //  const location = useLocation();
  const verifyUrl = user?.data?.url;
  const handleApi = (e) => {
    e.preventDefault();
    verifyAccount({ verifyUrl, otp });

    // console.log({ otp });
    // if (verifyUrl) {
    //   axios
    //     .post(verifyUrl, { otp })
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   console.error("No verification URL provided");
    // }
  };

  return (
    <div
      id="login-popup"
      className="fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/65"
      onClick={onClose}
    >
      <div
        className="relative h-full w-full max-w-lg md:h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg bg-white shadow">
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
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                cliprule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            <h3 className="mb-0.5 text-2xl font-medium"></h3>
            <p className="text-gray-800 mb-4 text-sm font-normal"></p>

            <div className="text-center">
              <p className="mb-5 text-2xl font-semibold leading-7 text-slate-900">
                Kiểm tra email và nhập OTP !{" "}
              </p>
            </div>
            {/* <Input/> */}

            <form className="w-full px-3" onSubmit={handleApi}>
              <input
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required=""
                autocomplete="off"
                className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none"
                placeholder="Nhập OTP"
              />

              <div className="flex w-full">
                <p className="text-gray-500 mb-3 ml-1 mt-4 text-sm">
                  <a
                    href="/resend-OTP"
                    className="text-base text-blue-800 hover:text-blue-600"
                  >
                    Gửi lại OTP !
                  </a>
                </p>
                <button
                  type="submit"
                  className="disabled:bg-gray-400 ml-[220px] mt-3 h-[45px] w-[134px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:border-blue-400 focus:outline-none"
                >
                  Xác nhận
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
