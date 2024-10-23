import React from "react";
import { useState } from "react";
const CardExpense = ({ title, units, consumption, icon }) => {
  return (
    <a href="#">
      <div className="flex items-center space-x-4 w-[90%] h-[60px] bg-white rounded-[10px] border border-[#aeaeae] p-3.5">
        <span className="text-gray-900 flex h-8 w-10 shrink-0 items-center justify-center rounded-full bg-white">
        
          {icon}
        </span>
        <div className="flex flex-1 flex-col">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="divide-gray-200 mt-auto divide-x">
            <span className="text-gray-400 inline-block px-3 text-xs font-normal leading-none first:pl-0">
             {units} 
            </span>
            <span className="text-gray-400 inline-block px-3 text-xs font-normal leading-none first:pl-0">
             {consumption}
            </span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </div>
    </a>
  );
};

export default CardExpense;
