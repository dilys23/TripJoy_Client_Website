import { MdClose } from "react-icons/md";
import avatarDefault from "../../assets/images/avatarDefault.png"
import { useEffect, useState } from "react";
import { getMyFriend } from "../../services/friend";
import { getMemberByPlanId, inviteMemberRequest } from "../../services/member";
function ModalInviteMember({ planId, handleClose }) {
    const [listMyFriend, setListMyFriend] = useState([]);
    const [listMember, setListMember] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const listFriend = await getMyFriend();
                const listMember = await getMemberByPlanId(planId);
                setListMyFriend(listFriend.users.data);
                setListMember(listMember.members.data);
                console.log(listFriend.users.data);
            } catch (error) {
                console.log('Error while getting my friend request:', error);
            }
        };
        fetchFriends();
    }, []);
    const handleInviteMember = async (userId) => {
        console.log('day la id', planId, userId);
        try {
            const res = await inviteMemberRequest(planId, userId);
            console.log(res);
        } catch (error) {
            console.log('Error while inviting member:', error);
        }
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative sm:w-[500px] w-4/5 h-[400px] flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col justify-center w-full sm:gap-4 pb-3 gap-3 sm:px-6 px-3 pt-3 ">
                        <span className="sm:text-[20px] text-base font-semibold">Mời bạn bè tham gia</span>
                    </div>
                    <div className="absolute right-5 top-6">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full flex flex-col text-start">
                        <div className="flex flex-col gap-2">
                            {listMyFriend.map((friend) => (
                                <div className="w-full justify-between flex px-5 py-2 ">
                                    <div className="flex gap-3 items-center cursor-pointer">
                                        <img src={friend.avatar || avatarDefault} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                                        <span className="text-[14px] font-semibold">{friend.userName}</span>
                                    </div>
                                    <button
                                        onClick={(e) => handleInviteMember(friend.id)}
                                        className="text-[14px] font-semibold text-[#007AFF] outline-none">Mời tham gia</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ModalInviteMember;