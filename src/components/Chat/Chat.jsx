
import { MdCircle, MdClose } from "react-icons/md";
import avatar from "../../assets/images/avatarDefault.png"
import ReactDOM from 'react-dom';
import { useContext, useEffect, useRef, useState } from "react";
import { getMessageByRoomId, markMessageRead, sendMessages } from "../../services/Chat";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import useInfiniteScroll from "../../hooks/useInfiniteScroll ";
function Chat({ handleClose, currentRoom, friend, groupRoomChat, plan, contact = false }) {
    const [listMessage, setListMessage] = useState([]);
    const { user, connection } = useContext(UserContext);
    const myId = user?.profile.id || '';
    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState('');
    const [members, setMembers] = useState([]);
    // const [isRead, setIsRead] = useState(false);
    // console.log(friend?.avatar?.url)

    const fetchMessage = async () => {
        try {
            if (currentRoom) {
                const res = await getMessageByRoomId(currentRoom.roomId);
                setListMessage(res.messages.data);

            } else if (groupRoomChat) {
                const res = await getMessageByRoomId(groupRoomChat.roomId);
                setMembers(res.members);
                setListMessage(res.messages.data);
            }
        } catch (error) {
            console.log(error);
            // toast.error("Lỗi kết nối");
        }

    }
    const chatContainerRef = useRef(null);
    // const fetchMessage = async (pageIndex = 0, pageSize = 10) => {
    //     try {
    //         if (currentRoom) {
    //             const res = await getMessageByRoomId(currentRoom.roomId, pageIndex, pageSize);
    //             return res.messages.data;
    //         } else if (groupRoomChat) {
    //             const res = await getMessageByRoomId(groupRoomChat.roomId, pageIndex, pageSize);
    //             if (pageIndex === 0) {
    //                 setMembers(res.members);
    //             }
    //             return res.messages.data;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return [];
    //     }
    // };
    // const { dataList, loading, hasMore, observerRef, setDataList, refreshData } = useInfiniteScroll(fetchMessage);
    // useEffect(() => {
    //     // Tải lại tin nhắn khi phòng chat thay đổi
    //     if (currentRoom || groupRoomChat) {
    //         refreshData();
    //     }
    // }, [currentRoom, groupRoomChat, refreshData]);
    useEffect(() => {
        if (currentRoom || groupRoomChat) {
            fetchMessage();
        }
    }, [currentRoom, groupRoomChat]);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [listMessage]);

    useEffect(() => {
        if (currentRoom && connection) {
            const handleReceiveMessage = (receivedMessage) => {
                console.log(receivedMessage);
                setListMessage((prevMessages) => [
                    receivedMessage,
                    ...prevMessages

                ]);
            };
            connection.on("ReceiveMessage", handleReceiveMessage);

            return () => {
                connection.off("ReceiveMessage", handleReceiveMessage);
            };
        }
    }, [currentRoom, connection]);
    useEffect(() => {
        if (groupRoomChat && connection) {
            const handleReceiveMessage = (receivedMessage) => {
                console.log(receivedMessage)
                setListMessage((prevMessages) => [
                    receivedMessage,
                    ...prevMessages

                ]);
            };
            connection.on("ReceiveMessagePlan", handleReceiveMessage);

            return () => {
                connection.off("ReceiveMessagePlan", handleReceiveMessage);
            };
        }
    }, [groupRoomChat, connection]);

    const sendMessage = async () => {
        if (message.trim() && message.length > 0) {
            try {
                if (groupRoomChat && user) {
                    const res = await sendMessages(groupRoomChat.roomId, message);
                    console.log(res);
                    await connection.invoke("SendMessagePlan", groupRoomChat.planId, myId, message, user?.profile?.userName, user?.profile?.avatar?.url);
                    console.log(groupRoomChat.planId, myId);
                } else if (contact) {
                    const res = await sendMessages(currentRoom.roomId, message);
                    await connection.invoke("SendMessage", friend.id, message, friend.userName, friend.avatarUrl);
                } else {
                    const res = await sendMessages(currentRoom.roomId, message);
                    await connection.invoke("SendMessage", friend.userId, message, friend.userName, friend.avatar);
                }
                setMessage('');
                await fetchMessage();
            } catch (error) {
                console.log('fetch mess:', error);
                // toast.error(error);
            }
        } else {
            return;
        }
    };
    // console.log(currentRoom)
    const markMessage = async () => {
        try {
            const res = await markMessageRead(currentRoom.roomId);
            // console.log(res);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }

    }
    useEffect(() => {
        if (currentRoom) {
            markMessage();
        }
    }, [])
    const findUser = (userId, members, friend) => {
        if (friend) {
            return { userName: friend.userName, avatar: friend?.avatar?.url || friend.avatar };
        }

        const member = members.find((m) => m.userId === userId);
        if (member) {
            return { userName: member.userName, avatar: member.avatar };
        }

        return { userName: "Ẩn danh", avatar: avatar };
    };
    // useEffect(() => {
    //     if (chatContainerRef.current) {
    //         console.log('cuon');
    //         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    //     }
    // }, [dataList]);
    // console.log(currentRoom);
    return ReactDOM.createPortal(
        <div ref={chatContainerRef} className="w-[300px] h-[350px] bg-white border border-[#007AFF] rounded-[15px] fixed bottom-5 right-[110px] z-1000 flex flex-col cursor-pointer">
            <div className="w-full h-[50px] flex justify-between px-3 py-2 items-center border-b border-b-[#007AFF]">
                <div className="flex gap-3 ">
                    <img src={friend?.avatar.url || friend?.avatar || plan?.avatar || avatar} alt="" className="rounded-full w-10 h-10"></img>
                    <div className="flex items-center">
                        <span className="text-[14px] font-bold">{friend?.userName || groupRoomChat?.chatRoomName}</span>
                        {/* <span className="text-[#08A879] text-[10px] flex items-center gap-1"><MdCircle />Đang hoạt động</span> */}
                    </div>
                </div>
                <MdClose
                    onClick={handleClose}
                    className="text-[#5686e1] text-[20px] font-extrabold cursor-pointer" />
            </div>

            {/* <div ref={observerRef} className="loading-indicator">
                {loading && <p className="text-[10px] bg-transparent w-full justify-between">Đang tải...</p>}
            </div> */}
            <div className="w-full h-[250px] bg-[#f4f4f4] flex px-2 py-1 overflow-auto custom-scroll flex-col-reverse">
                {listMessage.map((msg, index) => {
                    // Gọi hàm `findUser` để lấy thông tin người dùng
                    const { userName, avatar } = findUser(msg.postedByUser, members, friend);
                    const avatarUrl = typeof avatar === 'object' && avatar?.url ? avatar.url : avatar;
                    if (msg.sendByMe) {
                        return (
                            <div key={index} className="flex flex-col w-full items-end pt-1">
                                <div className="flex flex-col gap-1 w-fit">
                                    <div className="px-3 w-fit min-h-[25px] flex justify-center bg-[#FFD666] rounded-[17px] text-[#575656] text-[13px] leading-3 items-center">
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className="w-full flex gap-2 items-start pt-1">
                            <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
                            <div className="flex flex-col text-start">
                                <span className="text-[10px] font-semibold">{userName}</span>
                                <div className="px-3 w-fit min-h-[25px] flex justify-center bg-[#FF8B4A] rounded-[17px] text-white text-[13px] leading-3 items-center">
                                    {msg.message}
                                </div>
                            </div>
                        </div>
                    );
                })}


            </div>


            <div className="w-full h-[40px] flex justify-between px-3  items-center border-t border-t-[#007AFF]">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    type="text" name="" id="" className="w-8/12 outline-none text-[13px] pl-1" placeholder="Aa"

                />
                <div className="flex w-4/12 text-end justify-end">
                    {/* <Tippy content="Gửi ảnh"><img width="25" height="25" src="https://img.icons8.com/keek/100/image.png" alt="image" /></Tippy> */}
                    <Tippy content="Icon"><img width="25" height="25" src="https://img.icons8.com/emoji/48/smiling-face-with-smiling-eyes.png" alt="smiling-face-with-smiling-eyes" /></Tippy>
                    <Tippy content="Gửi tin nhắn">
                        <img
                            width="25"
                            height="25"
                            src="https://img.icons8.com/arcade/64/sent.png"
                            alt="sent"
                            className="cursor-pointer"
                            onClick={sendMessage}
                        />
                    </Tippy>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Chat;