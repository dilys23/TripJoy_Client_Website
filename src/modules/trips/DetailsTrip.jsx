import React, { useEffect, useState } from "react";
import Details from "../../components/Tripdetails/Details";
import ExpenseList from "../../components/ExpenseDetails/ExpenseList";
import List from "../../components/ExpenseDetails/PlaceList";
import Map from "../../components/MapCard/Map";
import FriendList from "../../components/Tripdetails/FriendList";
import ChatBox from "../../components/Tripdetails/ChatBox";

const DetailsTrip = () => {
  const [waypoints, setWaypoints] = useState([
    { lat: 16.467, lng: 107.59 }, // Start (Hue)
    { lat: 16.054, lng: 108.202 }, // End (Da Nang)
  ]);
  return (
    <div className="grid grid-rows-3 mr-4 mx-auto p-4 max-w-[1410px] ">
      {/* Row 1: Map */}
      <div className="row-span-1 flex flex-col h-[90px]">
        <Map   waypoints={waypoints} setWaypoints={setWaypoints} />
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
          <List  waypoints={waypoints}  />
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
