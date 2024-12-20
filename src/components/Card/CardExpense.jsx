import React from "react";
import { useState } from "react";
const CardExpense = ({ icon }) => {

  return (
    <>

      <div className="flex items-center space-x-4 w-[90%] h-[60px] bg-white rounded-[10px] border border-[#aeaeae] p-3.5">
        {/* <span className="text-gray-900 flex h-8 w-10 shrink-0 items-center justify-center rounded-full bg-white">

        </span> */}
        <div className="flex flex-1 flex-col text-start gap-2">
          <h3 className="text-sm font-medium flex"><span className="w-[20px] h-[20px]">{icon}</span>Mỳ Quảng bà Liên</h3>
          <div className=" flex items-center">
            <span className="flex px-3 text-xs font-normal leading-none">
              7h00 23/12/2024
            </span>
            <span className="flex px-3 text-xs items-center  font-normal leading-none gap-1">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/office/40/money-bag.png"
                alt="scooter"
                className="w-[20px] h-[20px]"
              />
              300.000đ
            </span>
          </div>
        </div>

      </div>
    </>
  );
};

export default CardExpense;
