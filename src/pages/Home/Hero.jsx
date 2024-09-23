import React, { useState } from "react";
import backgroundImage from "../../assets/images/background.jpg";
import image1 from "../../assets/images/image1.png";
import icon from "../../assets/images/iconApple.png";
import plane from "../../assets/images/plane.png";
import plane2 from "../../assets/images/plane2.png";
import planegif from "../../assets/images/planegif.gif";
import Login from "../../modules/auth/Login";
function Hero() {
  return (
    // <div className="bg-[url('../../images/background.jpg')] bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden">
    <div className="relative z-10 overflow-x-hidden bg-cover bg-center bg-no-repeat pb-32">
      {/* style={{ backgroundImage: `url(${backgroundImage})` }} */}
      {/* <img src={plane} alt="" className='lg:block hidden absolute bottom-0 right-16' />
      <img src={plane2} alt="" className='lg:block hidden absolute top-0 left-0' /> */}
      <div className="mx-auto max-w-[1400px] items-center justify-between px-3 pt-12 lg:flex">
        <div className="lg:w-2/5">
          <h2 className="mb-5 text-center text-4xl font-bold lg:text-left lg:text-5xl lg:leading-snug xl:text-[4rem]">
            Khám phá những
            <br /> địa điểm xinh đẹp <br /> trên Việt Nam
          </h2>
          <p className="mb-8 text-lg leading-normal text-black">
            Lên kế hoạch và tận hưởng chuyến đi của bạn một cách trọn vẹn{" "}
          </p>
          <button className="transition-bg mb-12 h-11 w-full cursor-pointer rounded-full bg-[#FF7324] text-center text-base text-white shadow outline-none hover:border-r hover:border-[#FF7324] hover:bg-white hover:text-black lg:w-auto lg:px-10">
            Bắt đầu kế hoạch
          </button>

          <div className="flex flex-1 gap-5">
            <div>
              <button
                type="button"
                className="dark:focus:ring-gray-600 mb-2 me-2 inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/80 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/40"
              >
                <svg
                  className="-ms-1 me-2 h-8 w-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                App Store
              </button>
            </div>
            <button
              type="button"
              className="dark:focus:ring-gray-600 mb-2 me-2 inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/80 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4db6ac"
                  d="M7.705,4.043C7.292,4.15,7,4.507,7,5.121c0,1.802,0,18.795,0,18.795S7,42.28,7,43.091c0,0.446,0.197,0.745,0.5,0.856l20.181-20.064L7.705,4.043z"
                ></path>
                <path
                  fill="#dce775"
                  d="M33.237,18.36l-8.307-4.796c0,0-15.245-8.803-16.141-9.32C8.401,4.02,8.019,3.961,7.705,4.043l19.977,19.84L33.237,18.36z"
                ></path>
                <path
                  fill="#d32f2f"
                  d="M8.417,43.802c0.532-0.308,15.284-8.825,24.865-14.357l-5.601-5.562L7.5,43.947C7.748,44.038,8.066,44.004,8.417,43.802z"
                ></path>
                <path
                  fill="#fbc02d"
                  d="M41.398,23.071c-0.796-0.429-8.1-4.676-8.1-4.676l-0.061-0.035l-5.556,5.523l5.601,5.562c4.432-2.559,7.761-4.48,8.059-4.653C42.285,24.248,42.194,23.5,41.398,23.071z"
                ></path>
              </svg>
              Google Play
            </button>
            <img
              src={planegif}
              alt=""
              className="absolute bottom-20 left-[390px] hidden h-[12rem] w-[15rem] lg:block"
            />
          </div>
        </div>
        <div className="lg:-mr-50 flex items-center justify-end pt-10 lg:w-3/5 lg:pt-0">
          <img src={image1} alt="" className="h-full w-[35rem]" />
          {/* animate-spin-slow */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
