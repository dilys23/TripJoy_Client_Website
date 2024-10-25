import React from "react";
import Details from "../../components/Tripdetails/Details";
import ExpenseList from "../../components/ExpenseDetails/ExpenseList";
import List from "../../components/ExpenseDetails/PlaceList";
import Map from "../../components/MapCard/Map";
import FriendList from "../../components/Tripdetails/FriendList";
import ChatBox from "../../components/Tripdetails/ChatBox";

const DetailsTrip = () => {
  return (
    <div className="grid grid-rows-3 mr-4 mx-auto p-4 max-w-[1410px] bg-[#E5E5E5]">
    {/* Row 1: Map */}
    <div className="row-span-1 flex flex-col h-[90px]">
      <Map />
    </div>
  
    <div className=" row-span-1 grid grid-cols-3 gap-5 h-[220px] ">
   
      <div className="col-span-2 items-center">
        <Details />
      </div>
  
      <div className="col-span-1">

        <FriendList />
      </div>
    </div>
  
    <div className="row-span-1 grid grid-cols-6 gap-4 h-[230px]">
  {/* Cột đầu tiên: tăng kích thước */}
  <div className="col-span-2 mr-[65px]">
    <ExpenseList />
  </div>

  <div className="col-span-2 ml-[-65px]">
    <List />
  </div>

  {/* Cột thứ ba: giữ nguyên */}
  <div className="col-span-2">
  <ChatBox />
  </div>
</div>


  </div>
  
  );
};

export default DetailsTrip;
