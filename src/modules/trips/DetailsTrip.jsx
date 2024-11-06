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
    <div className="mx-auto  grid max-w-[1410px] grid-rows-3 gap-3 p-4">
  <div className="row-span-1 grid h-[420px] grid-cols-1 md:grid-cols-3 gap-5">
    <div className="col-span-2 items-center">
      <Map waypoints={waypoints} setWaypoints={setWaypoints} />
    </div>

    <div className="col-span-1 overflow-y-auto">
      <List waypoints={waypoints} />
    </div>
  </div>
  
  <div className="row-span-1 grid h-[250px] grid-cols-1 md:grid-cols-3 gap-5">
    <div className="col-span-2 items-center">
      <Details />
    </div>

    <div className="col-span-1">
      <FriendList />
    </div>
  </div>

  <div className="row-span-1 grid h-[530px] grid-cols-1 mt-[-170px]">
    <ExpenseList />
  </div>
</div>

  );
};

export default DetailsTrip;
