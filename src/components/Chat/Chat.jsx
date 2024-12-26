
import { MdCircle, MdClose } from "react-icons/md";
import avatar from "../../assets/images/avatarDefault.png"
import ReactDOM from 'react-dom';
import { useContext, useEffect, useRef, useState } from "react";
import { getMessageByRoomId, sendMessages } from "../../services/Chat";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { UserContext } from "../../contexts/UserContext";
function Chat({ handleClose, currentRoom, friend, groupRoomChat, plan }) {
    const [listMessage, setListMessage] = useState([]);
    const { user, connection } = useContext(UserContext);
    const myId = user?.profile.id || '';
    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState('');

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const fetchMessage = async () => {
        try {
            if (currentRoom) {
                const res = await getMessageByRoomId(currentRoom.roomId);
                setListMessage(res.messages.data);
            } else if (groupRoomChat) {
                const res = await getMessageByRoomId(groupRoomChat.roomId);
                setListMessage(res.messages.data);
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (currentRoom) {
            fetchMessage()
        }
    }, [])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [listMessage]);

    useEffect(() => {
        if (currentRoom && connection) {
            const handleReceiveMessage = (receivedMessage) => {
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
    const sendMessage = async () => {
        if (message.trim() && message.length() > 0) {
            try {
                if (currentRoom) {
                    const res = await sendMessages(currentRoom.roomId, message);
                    await connection.invoke("SendMessage", friend.id, message, friend.userName, friend.avatarUrl);
                    setMessage('');
                    await fetchMessage();
                }else{
                    
                }
            } catch (error) {
                console.log('fetch mess:', error);
            }
        } else {
            return;
        }
    };

    // console.log(currentRoom);
    return ReactDOM.createPortal(
        <div className="w-[300px] h-[320px] bg-white border border-[#007AFF] rounded-[15px] fixed bottom-5 right-[110px] z-1000 flex flex-col cursor-pointer">
            <div className="w-full h-[50px] flex justify-between px-3 py-2 items-center border-b border-b-[#007AFF]">
                <div className="flex gap-3 ">
                    <img src={avatar} className="rounded-full w-10 h-10"></img>
                    <div className="flex items-center">
                        <span className="text-[14px] font-bold">{friend?.userName || groupRoomChat?.chatRoomName}</span>
                        {/* <span className="text-[#08A879] text-[10px] flex items-center gap-1"><MdCircle />Đang hoạt động</span> */}
                    </div>
                </div>
                <MdClose
                    onClick={handleClose}
                    className="text-[#5686e1] text-[20px] font-extrabold cursor-pointer" />
            </div>


            <div className="w-full h-[230px] bg-[#f4f4f4] flex px-2 py-1 overflow-auto custom-scroll flex-col-reverse">
                {listMessage.map((msg, index) => (
                    msg.postedByUser === myId ? (
                        // Tin nhắn của người dùng hiện tại
                        <div key={index} className="flex flex-col w-full items-end pt-1">
                            <div className="flex flex-col gap-1 w-fit">
                                <div className="px-3 w-fit min-h-[25px] flex justify-center bg-[#FFD666] rounded-[17px] text-[#575656] text-[13px] leading-3 items-center">
                                    {msg.message}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Tin nhắn của người khác
                        <div key={index} className="w-full flex gap-2 items-start">
                            <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                            <div className="flex flex-col text-start">
                                <span className="text-[10px] nunito-text font-semibold">{friend?.userName}</span>
                                <div className="flex flex-col gap-1">
                                    <div className="px-3 w-fit min-h-[25px] flex justify-center bg-[#FF8B4A] rounded-[17px] text-white text-[13px] leading-3 items-center">
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>


            <div className="w-full h-[40px] flex justify-between px-3  items-center border-t border-t-[#007AFF]">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    type="text" name="" id="" className="w-8/12 outline-none text-[13px] pl-1" placeholder="Aa"

                />
                <div className="flex w-4/12 text-end justify-end">
                    <Tippy content="Gửi ảnh"><img width="25" height="25" src="https://img.icons8.com/keek/100/image.png" alt="image" /></Tippy>
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
        </div >,
        document.body
    );
}

export default Chat;