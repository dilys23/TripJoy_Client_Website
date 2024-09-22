import React from 'react';

// import { Container } from './styles';

function Register() {
    return (
        <div id="login-popup" tabindex="-1"
            className="bg-black/65 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div className="relative w-full max-w-lg h-full md:h-auto">

                <div className="relative bg-white rounded-lg shadow ">
                    {/* / w-[674px] h-[883px] bg-white rounded-[20px] shadow border border-[#d6d6d6] */}
                    <button type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close">
                        <svg
                            aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                cliprule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close popup</span>
                    </button>

                    <div className="p-5">
                        <h3 className="text-2xl mb-0.5 font-medium"></h3>
                        <p className="mb-4 text-sm font-normal text-gray-800"></p>

                        <div className="text-center">
                            <p className="mb-3 text-2xl font-semibold leading-7 text-slate-900">
                                Tạo tài khoản mới và bắt đầu <br />hành trình của bạn!                            </p>
                            {/* <p className="mt-2 text-sm leading-4 text-slate-600">
                                You must be logged in to perform this action.
                            </p> */}
                        </div>

                        <div className="mt-7 flex flex-col gap-3 px-3">

                            <button
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                    className="h-[18px] w-[18px] " />Đăng kí với Google
                            </button>

                            <button
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                                    src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="GitHub"
                                    className="h-[18px] w-[18px] " />
                                Đăng kí với Facebook
                            </button>

                        </div>

                        <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600 px-3">
                            <div className="h-px w-full bg-slate-200 "></div>
                            OR
                            <div className="h-px w-full bg-slate-200"></div>
                        </div>


                        <form className="w-full px-3">
                            {/* <label for="email" className="sr-only">Email address</label> */}
                            <div className='flex  space-x-3 mb-4 '>
                                <input name="lastname" type="text" autocomplete="text" required=""
                                    className="w-[268px] h-[40px] px-2 bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]"
                                    placeholder="Họ " value="" />
                                {/* <label for="email" className="sr-only">Email address</label> */}
                                <input name="firstname" type="text" autocomplete="text" required=""
                                    className=" w-[300px] h-[40px]  px-3   bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]"
                                    placeholder="Tên" value="" />
                                {/* <label for="email" className="sr-only">Email address</label> */}
                            </div>

                            <input name="email" type="email" autocomplete="email" required=""
                                className="w-full h-[40px]  px-3 mb-4  bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]"
                                placeholder="Tên Đăng nhập" value="" />
                            {/* <label for="email" className="sr-only">Email address</label> */}
                            <input name="email" type="email" autocomplete="email" required=""
                                className="w-full h-[40px]  px-3 mb-4  bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]"
                                placeholder="Email " value="" />
                            {/* <label for="password" className="sr-only">Password</label> */}
                            <input name="phoneNumber" type="number" autocomplete="current-password" required=""
                                className="w-full h-[40px]  px-3 mb-4  bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]"
                                placeholder="Số điện thoại" value="" />
                            <input name="password" type="password" autocomplete="current-password" required=""
                                className="w-full h-[40px]  px-3 mb-4  bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]"
                                placeholder="Mật khẩu" value="" />
                            <div className="flex space-x-[164px]">
                                <label for="email" className="text-[#0F3E4A]">Ngày sinh</label>
                                <label for="email" className="text-[#0F3E4A]">Giới tính</label>
                            </div>

                            <div className="flex space-x-4">
                                <input name="birthday" type="date" autocomplete="date" required=""
                                    className="w-full h-[40px] px-3 mb-4 bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]"
                                    value="" />
                                <select name="sex" required=""
                                    className="w-full h-[40px] px-3 mb-4 bg-[#f5f6f7] rounded-[5px] shadow border border-[#ccd0d5]">
                                    <option value="" disabled selected>Chọn giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>

                            </div>
                            <div className="flex  w-full">

                                <p className="mb-3 mt-4 text-sm text-gray-500">
                                    <a href="/forgot-password" className="text-blue-800 text-base hover:text-blue-600">Tôi đã có tài khoản!</a>
                                </p>
                                <button type="submit"
                                    className="w-[134px] h-[45px]  bg-[#ff7224] rounded-[5px] shadow border border-[#ccd0d5] ml-[170px]  mt-3 text-sm font-medium text-white  focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                                    Đăng kí
                                </button>
                            </div>
                        </form>
                        {/* 
                        <div className="mt-6 text-center text-sm text-slate-600">
                            Don't have an account?
                            <a href="/signup" className="font-medium text-[#4285f4]">Sign up</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;