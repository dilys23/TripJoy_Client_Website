import React from "react";
import CardExpense from "../Card/CardExpense";
const List = () => {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-[#e5e7eb]">
      <div
        aria-label="card"
        className=" w-full h-full bg-white rounded-[10px]  p-4 "
      >
        <div aria-label="header" className="flex items-center space-x-2">
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/color/32/expensive-2--v1.png"
            alt="expensive-2--v1"
          />
          <div className="flex-1 space-y-0.5">
          <p className="text-gray-900 text-base font-medium leading-tight tracking-tight">
              Trò chuyện 
            </p>
          </div>
          <a
            href="/"
            className="inline-flex h-8 mr-[45px] w-8 shrink-0 items-center justify-center rounded-full bg-[#4b5563] text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M17 7l-10 10"></path>
              <path d="M8 7l9 0l0 9"></path>
            </svg>
          </a>
        </div>
        <div
          aria-label="content"
          className=" mt-3 mr-[-10px] grid max-h-56 gap-2.5 overflow-y-auto custom-scroll"
        >
          <CardExpense
            title={"Mỳ Quảng bà Liên"}
            units={"đồng"}
            consumption={"7h00 18/7/2024"}
            icon={
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/fluency/28/map-pin.png"
                alt="map-pin"
              />
            }
          />
          <CardExpense
            title={"Mỳ Quảng bà Liên"}
            units={"đồng"}
            consumption={"7h00 18/7/2024"}
            icon={
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/fluency/28/map-pin.png"
                alt="map-pin"
              />
            }
          />
          {/* <CardExpense
            title={"Mỳ Quảng bà Liên"}
            units={"đồng"}
            consumption={"7h00 18/7/2024"}
            icon={
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/fluency/28/map-pin.png"
                alt="map-pin"
              />
            }
          /> */}
          {/* <CardExpense
            title={"Mỳ Quảng bà Liên"}
            units={"đồng"}
            consumption={"7h00 18/7/2024"}
            icon={
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/fluency/28/map-pin.png"
                alt="map-pin"
              />
            }
          />
          <CardExpense
            title={"Mỳ Quảng bà Liên"}
            units={"đồng"}
            consumption={"7h00 18/7/2024"}
            icon={
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/fluency/28/map-pin.png"
                alt="map-pin"
              />
            }
          /> */}
        </div>
      </div>
    // </div>
  );
};

export default List;
