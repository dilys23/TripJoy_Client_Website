import React from "react";
import Avatar from "../Avatar/Avatar";
const Details = ({ className, username }) => {
  return (
    // <div className="ml-10 ">
    <div className="box-border h-full w-full rounded-[10px] border border-slate-300 bg-white">
      <div className="w-74 mt-2 flex gap-3 text-center font-['Arial'] text-sm font-bold">
        <h1 className="ml-5 text-black">Chi tiết hành trình</h1>
      </div>

      <Avatar
        name="Jane Doe"
        image="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
        className="ml-5 h-[51px] w-[30px] rounded-[66px] hover:opacity-80"
        onClick={() => alert("Jane Doe clicked!")}
      />
      <div className="w-74 mb-2 mt-1 flex gap-3 text-center font-['Arial'] text-sm font-bold">
        <h1 className="ml-5 text-black">Hai ngày một đêm ở Hà Giang</h1>
      </div>

      <div className="relative ml-[80px] h-[90px] w-[80%]">
        <div className="absolute left-0 top-0 flex h-full w-full rounded-[17px] border border-[#ccd0d5] bg-white">
          {/* <img class="w-[26px] h-[15px]" src="https://via.placeholder.com/26x15" /> */}
          <div className="ml-5 mt-2">
            <h3 className="text-sm text-black">Thời gian</h3>
            <div className="flex">
            <div className="h-[0px] w-[150px] border border-[#9f9f9f]">
            <circle className="h-[13px] w-[13px] bg-[#3c8ff8]" />
            <circle className="h-[13px] w-[13px] bg-[#3c8ff8]" />

            <div className="h-[13px] w-[13px] rounded-full bg-[#ff7224]" />
            <div className="h-[13px] w-[13px] rounded-full bg-[#d22929]" />
            <div className="h-[15px] w-16 rounded-[21px] bg-[#ff7224]" /></div>
            <div className="w-[75px] text-center font-['Arial'] text-[11px] font-normal text-white">
              16/7/2024
            </div>
            <div className="w-[75px] text-center font-['Arial'] text-[11px] font-normal text-black">
              13/7/2024
            </div>
            <div className="w-[51px] text-center font-['Arial'] text-[11px] font-normal text-black">
              18/7/2024
            </div>
            </div>
          </div>

          {/* <div>
            <div className="h-[0px] w-[222px] border border-[#9f9f9f]"></div>
            <div className="h-[13px] w-[13px] rounded-full bg-[#3c8ff8]" />
            <div className="h-[13px] w-[13px] rounded-full bg-[#ff7224]" />
            <div className="h-[13px] w-[13px] rounded-full bg-[#d22929]" />
            <div className="h-[15px] w-16 rounded-[21px] bg-[#ff7224]" />
            <div className="w-[75px] text-center font-['Arial'] text-[11px] font-normal text-white">
              16/7/2024
            </div>
            <div className="w-[75px] text-center font-['Arial'] text-[11px] font-normal text-black">
              13/7/2024
            </div>
            <div className="w-[51px] text-center font-['Arial'] text-[11px] font-normal text-black">
              18/7/2024
            </div>
          </div> */}
          <div className="ml-[140px] mt-2">
            <h3 className="text-sm text-black">Kinh phí</h3>
          </div>
          <div className="ml-[150px] mt-2">
            <h3 className="text-sm text-black">Thời gian</h3>
          </div>
        </div>
        <div className="absolute left-[200px] top-[1px] h-[0px] w-[89px] origin-top-left rotate-90 border border-[#ccd0d5]"></div>

        <div className="absolute left-[410px] top-[1px] h-[0px] w-[89px] origin-top-left rotate-90 border border-[#ccd0d5]"></div>
      </div>
    </div>
    // </div>
  );
};

export default Details;
