import React, { useState } from "react";
import axios from 'axios'
// import { useNavigate} from "react-router-dom"
import { Input } from "./components/Input/Input";
// import { Container } from './styles';

function Register({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleApi = (e) => {
    e.preventDefault(); // Ngăn form tải lại trang và gửi dữ liệu qua URL
  
    console.log({ email, phoneNumber, name, password });
    axios.post('https://localhost:7100/api/v1/Account/register', {
      email: email,
      phoneNumber: phoneNumber,
      name: name,
      password: password,
      confirmPassword: confirmPassword
    })
      .then(result => {
        if (result.data.success)
        {
          console.log(result);
        const verifyUrl = result.data.data.url;
          navigate('/otp-confirmation', {state: {verifyUrl}})
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
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
              <p className="mb-3 text-2xl font-semibold leading-7 text-slate-900">
                Tạo tài khoản mới và bắt đầu <br />
                hành trình của bạn!{" "}
              </p>
              {/* <p className="mt-2 text-sm leading-4 text-slate-600">
                                You must be logged in to perform this action.
                            </p> */}
            </div>
{/* <Input/> */}
            <div className="mt-7 flex flex-col gap-3 px-3">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black focus:outline-none focus:border-blue-400">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Đăng kí với Google
              </button>

              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black focus:outline-none focus:border-blue-400">
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

            <form className="w-full px-3">
              {/* <label for="email" className="sr-only">Email address</label> */}
              {/* <div className="mb-4 flex space-x-3">
                <input
                  name="lastname"
                  type="text"
                  autocomplete="text"
                  onChange={(e) => setLastname(e.target.value)}
                  required=""
                  className="h-[40px] w-[268px] rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-2 shadow focus:outline-none focus:border-blue-400"
                  placeholder="Họ "
                /> */}
                {/* <label for="email" className="sr-only">Email address</label> */}
                {/* <input
                  name="firstname"
                  type="text"
                  autocomplete="text"
                  // onChange={(e) => setFirstname(e.target.value)}
                  required=""
                  className="h-[40px] w-[213px] rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
                  placeholder="Tên"
                  
                 
                />
               </div> */}

              <input
                name="name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                required=""
                className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
                placeholder="Tên "
                autocomplete="off"
              />
              <input
                name="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required=""
                autocomplete="off"
                className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
                placeholder="Email "
              />
              <input
                name="phoneNumber"
                type="number"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                required=""
                className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
                placeholder="Số điện thoại"
              />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
                autocomplete="off"
                className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
                placeholder="Mật khẩu"
              />
                <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required=""
                autocomplete="off"
                className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
                placeholder="Xác nhận mật khẩu"
              />
              {/* <div className="flex space-x-[164px]">
                <label for="email" className="text-[#0F3E4A]">
                  Ngày sinh
                </label>
                <label for="email" className="text-[#0F3E4A]">
                  Giới tính
                </label>
              </div> */}
{/* 
              <div className="flex space-x-4">
                <input
                  name="birthday"
                  type="date"
                  autocomplete="date"
                  required=""
                  className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
             
                />
                <select
                  name="gender"
                  required=""
                  className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:outline-none focus:border-blue-400"
                >
                  <option value="" disabled selected>
                    Chọn giới tính
                  </option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div> */}
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
                  type="submit"
                  className="disabled:bg-gray-400 ml-[170px] mt-3 h-[45px] w-[134px] rounded-[5px] border border-[#ccd0d5] bg-[#ff7224] text-sm font-medium text-white shadow focus:outline-none focus:border-blue-400 "
                  onClick={handleApi}
                >
                  Đăng kí
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
