import React from "react";
import Avatar from "../Avatar/Avatar";
const Details = ({className, username}) => {
  return (
    // <div className="ml-10 ">
      <div className=" h-full w-full rounded-[10px] border bg-white">
        <div className="w-44 mt-2 text-center font-['Arial'] text-base font-bold text-black ">
          Chi tiết hành trình
        </div>
        <Avatar
          name="Jane Doe"
          image="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
          className=" ml-5 w-[30px] h-[51px]  rounded-[66px] hover:opacity-80"
          onClick={() => alert("Jane Doe clicked!")}
        />
        <div className=" w-[80%]  h-[100px] relative ml-5">
          <div className="absolute left-0 top-0 h-full w-full rounded-[17px] border border-[#ccd0d5] bg-white">
          <img class="w-[26px] h-[15px]" src="https://via.placeholder.com/26x15" />
          </div>
          <div className="absolute left-[195.90px] top-[1px] h-[0px] w-[98px] origin-top-left rotate-90 border border-[#ccd0d5]"></div>
          <div className="absolute left-[397.70px] top-[1px] h-[0px] w-[98px] origin-top-left rotate-90 border border-[#ccd0d5]"></div>
        </div>
      </div> 
    // </div>
  );
};

export default Details;
