import { useEffect, useState } from "react";
import ava1 from "../../assets/images/ava1.png"
import ava2 from "../../assets/images/ava2.png"
import { getListFriendRequest } from "../../services/getListFriendRequest";
import FriendItem from "./FriendItem";
import { acceptFriendRequest, declineFriendRequest } from "../../services/friend";
function FriendRequest() {
    const [listFriend, setListFriend] = useState([]);
    const [countFriendRequest, setCountFriendRequest] = useState(0);
    const getListFriend = async () => {
        const dataFriendRequest = await getListFriendRequest();
        setCountFriendRequest(dataFriendRequest.users.count);
        setListFriend(dataFriendRequest.users.data);
        console.log(dataFriendRequest.users.data);
    }
    useEffect(() => {
        getListFriend();
    }, [])
    const handleAcceptRequest = async (userId) => {
        console.log(userId);
        try {
            const res = await acceptFriendRequest(userId);
            console.log(res);
            setListFriend(prevList => {
                const updatedList = prevList.filter(friend => friend.id !== userId);
                return updatedList;
            });
        } catch {
            throw console.error();

        }
    }
    const handleDeclineRequest = async (userId) => {
        console.log(userId);
        try {
            const res = await declineFriendRequest(userId);
            console.log(res);
            setListFriend(prevList => {
                const updatedList = prevList.filter(friend => friend.id !== userId);
                return updatedList;
            });
        } catch {
            throw console.error();

        }
    }
    return (
        <div className="w-full">
            <div className="flex w-full justify-between">
                <div className="flex gap-2">
                    <span className="text-[#aeaeae] lg:text-base text-[13px] font-bold ">LỜI MỜI KẾT BẠN</span>
                    <span className="rounded-90 bg-[#007AFF] text-white font-bold lg:w-[22px] w-[15px] lg:h-[22px] h-[15px] lg:text-[14px] text-[12px] text-center cursor-pointer ">{countFriendRequest}</span>
                </div>
                <a href="#" className="text-[#aeaeae] cursor-pointer">Tất cả</a>
            </div>
            <div className="w-full h-[215px]">
                {listFriend.map((item, index) => (
                    <FriendItem key={index} info={item} onAcceptRequest={() => handleAcceptRequest(item.id)} onDeclineRequest={() => handleDeclineRequest(item.id)}></FriendItem>
                ))}
            </div>
        </div>
    );
}

export default FriendRequest;