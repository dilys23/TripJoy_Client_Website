import ContactItem from "./ContactItem";
import { useContext, useEffect, useState } from "react"
import { getMyFriend } from "../../services/friend"
import { UserContext } from "../../contexts/UserContext";
import { createRoomChatPrivate } from "../../services/Chat";
import Chat from "../Chat/Chat";
function Contact() {
    const [listMyFriend, setListMyFriend] = useState([]);
    const { onlineFriends } = useContext(UserContext);
    // const [openChatRoom, setOpenChatRoom] = useState(false);
    // const [currentRoom, setCurrentRoom] = useState(null);
    // const [friend, setFriend] = useState(null);
    const [chatRooms, setChatRooms] = useState([]);
    // console.log(onlineFriends);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const listFriend = await getMyFriend();
                setListMyFriend(listFriend.users.data);
                // console.log(listFriend.users.data)
            } catch (error) {
                console.log('Error while getting my friend request:', error);
            }
        };

        fetchFriends();
    }, []);


    const createRoomChat = async (friend) => {
        try {
            const res = await createRoomChatPrivate(friend.id);
            console.log(friend.id);
            setChatRooms((prevRooms) => [
                ...prevRooms,
                { room: res.room, friend: friend }
            ]);
        } catch (error) {
            console.log('Error while creating room chat:', error);
        }
    }

    return (
        <>

            {chatRooms.map((room, index) => (
                <Chat
                    key={index}
                    handleClose={() => setChatRooms((prevRooms) => prevRooms.filter((_, i) => i !== index))}
                    currentRoom={room.room}
                    modePrivate={true}
                    friend={room.friend}
                    contact
                />
            ))}

            {/* {openChatRoom && <Chat handleClose={() => setOpenChatRoom(false)} currentRoom={currentRoom} modePrivate={true} friend={friend}></Chat>} */}
            <div className="w-full">
                <div className="text-[#aeaeae] lg:text-base text-[12px] font-bold my-3">LIÊN HỆ</div>
                <div className="w-full h-auto bg-white rounded-20 border border-[#CCD0D5] min-h-[200px]">
                    {listMyFriend.map((item, index) => (
                        <ContactItem
                            key={index}
                            contact={item}
                            onlineFriends={onlineFriends}
                            onClick={() => createRoomChat(item)}
                        ></ContactItem>
                    )
                    )}
                </div>
            </div>
        </>
    );
}

export default Contact;