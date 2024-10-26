import React from "react";

const PlaceList = () => {
  return (
    <div
      aria-label="card"
      className="w-full h-full bg-white rounded-[10px] px-4 flex flex-col space-y-4"
    >
      <div aria-label="header" className="flex items-center justify-between ">
        {/* <div className="flex items-center space-x-2">
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/color/32/expensive-2--v1.png"
            alt="expensive-2--v1"
          />
         
        </div> */} 
        <div className="flex-1 space-y-0.5 mt-3 mb-[-7px]">
            <p className="text-gray-900 text-base font-medium leading-tight tracking-tight">
              Danh sách địa điểm
            </p>
            
          </div>
      </div>

      {/* Body: chia cột giữa ảnh và danh sách địa điểm */}
      <div className="flex space-x-4 flex-1 max-h-[80%]">
        <div className="w-[180px] h-[90%] flex items-center rounded-[10px] overflow-hidden">
          <img
            src="https://lh5.googleusercontent.com/proxy/wyG_LljX3QV2RZjPMpns6tn1rIpke_-6AWZgk2gMw2brKy4xz75JSSXCvh_XGMT7Lh668oomHjmz2zkjZVS5ZMhRQjR-zu53x4GZ6OMQ0eTE_aypLgC0jo4nF3LvrkwIL43cSP2vLRxQOiFDbMghutJcUiKsaGijTP478e6qrqA"
            alt="Hoi An - Quang Nam"
            className="w-full h-full object-cover"
          />
        </div>

        <ul
          role="list"
          className="flex flex-col space-y-4 flex-1 max-h-full overflow-y pr-2"
        >
           <li>
      <div class="relative pb-3  ">
        <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-black" aria-hidden="true"></span>
        <div class="relative flex space-x-3">
          <div>
            <span class="h-8 w-8 rounded-full bg-[#71B0F6] flex items-center justify-center ring-8 ring-white">
            <img className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                src="https://img.icons8.com/arcade/44/marker.png" />
            
            </span>
          </div>
          <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
              <p class="text-sm text-gray-500">packing at <a href="#" class="font-medium text-gray-900">France</a></p>
            </div>
            <div class="whitespace-nowrap text-right text-sm text-gray-500">
              <time datetime="2020-09-20">Sep 20</time>
            </div>
          </div>
        </div>
      </div>
    </li>
     <li>
      <div class="relative pb-3 ">
        <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-black" aria-hidden="true"></span>
        <div class="relative flex space-x-3">
          <div>
            <span class="h-8 w-8 rounded-full bg-[#71B0F6]  flex items-center justify-center ring-8 ring-white">
            <img className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                src="https://img.icons8.com/arcade/44/marker.png" />
            
            </span>
          </div>
          <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
              <p class="text-sm text-gray-500">with driver </p>
            </div>
            <div class="whitespace-nowrap text-right text-sm text-gray-500">
              <time datetime="2020-09-22">Sep 22</time>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div className="relative ">
        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-black" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-[#46E8A5] flex items-center justify-center ring-8 ring-white">
              <img className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                src="https://img.icons8.com/arcade/44/marker.png" />
            
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
              <p className="text-sm text-gray-500">Hội An</p>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <time datetime="2020-09-28">Sep 28</time>
            </div>
          </div>
        </div>
      </div>
    </li>
        </ul>
      </div>
    </div>
  );
};

export default PlaceList;
