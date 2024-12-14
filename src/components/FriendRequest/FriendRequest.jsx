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
    }
    useEffect(() => {
        getListFriend();
    }, [])
    const handleAcceptRequest = async (userId) => {
        try {
            const res = await acceptFriendRequest(userId);

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
            <div className="flex w-full justify-between items-center">
                <div className="flex lg:gap-2 gap-1 items-center">
                    <span className="text-[#aeaeae] lg:text-base text-[12px] font-bold ">LỜI MỜI KẾT BẠN</span>
                    <span className="rounded-90 bg-[#007AFF] flex items-center justify-center lg:w-[20px] lg:h-[20px] md:w-[15px] md:h-[15px] text-white font-bold p-1 lg:text-[13px] text-[10px] text-center cursor-pointer ">{countFriendRequest}</span>
                </div>
                <a href="#" className="text-[#aeaeae] cursor-pointer lg:text-base text-[10px]">Tất cả</a>
            </div>
            <div className="w-full h-[210px]">
                {listFriend.slice(0, 2).map((item, index) => (
                    <FriendItem key={index} info={item} onAcceptRequest={() => handleAcceptRequest(item.id)} onDeclineRequest={() => handleDeclineRequest(item.id)}></FriendItem>
                ))}
            </div>
        </div>
    );
}

export default FriendRequest;