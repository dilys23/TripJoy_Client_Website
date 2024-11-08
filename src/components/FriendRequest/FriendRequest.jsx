import { useEffect, useState } from "react";
import ava1 from "../../assets/images/ava1.png"
import ava2 from "../../assets/images/ava2.png"
import { getListFriendRequest } from "../../services/getListFriendRequest";
import FriendItem from "./FriendItem";
function FriendRequest() {
    const [listFriend, setListFriend] = useState([])
    const info = [
        { ava: ava1, name: "Hong Nhung" },
        { ava: ava2, name: "Bao Chau" }
    ];
    const getListFriend = async () => {
        const dataFriendRequest = await getListFriendRequest();
        setListFriend(dataFriendRequest.users.data);
        console.log(dataFriendRequest.users.data);
    }
    useEffect(() => {
        getListFriend();
    }, [])
    const handleAcceptRequest = async (userId) => {
        console.log(userId);
        // const  res = 
    }
    const handleDeclineRequest = () => {

    }
    return (
        <div className="w-full">
            <div className="flex w-full justify-between">
                <span className="text-[#aeaeae] lg:text-base text-[13px] font-bold ">YÊU CẦU</span>
                <span className="rounded-90 bg-[#007AFF] text-white font-bold lg:w-[22px] w-[15px] lg:h-[22px] h-[15px] lg:text-[14px] text-[12px] text-center cursor-pointer ">2</span>
            </div>
            <div className="w-full h-[215px]">
                {listFriend.map((item, index) => (
                    <FriendItem key={index} info={item} onAcceptRequest={() => handleAcceptRequest(item.id)} onDeclineRequest={handleDeclineRequest}></FriendItem>
                ))}
            </div>
        </div>
    );
}

export default FriendRequest;