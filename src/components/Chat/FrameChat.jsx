import { useEffect, useState } from "react";
import { createRoomChatPrivate, getRecentConversation } from "../../services/Chat";
import useInfiniteScroll from "../../hooks/useInfiniteScroll ";
import AvatarDefault from "../Avatar/AvatarDefault";
import { MdCircle } from "react-icons/md";
import Chat from "./Chat";

function FrameChat({ createRoomChat }) {

    const fetchConversation = async (pageIndex, pageSize) => {
        try {
            const res = await getRecentConversation(pageIndex, pageSize);
            return res.conversations.data || [];
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    const { dataList, loading, hasMore, observerRef, refreshData } = useInfiniteScroll(fetchConversation);

    // console.log(dataList);

    return (
        <>
            <div className="absolute right-0 z-10 mt-2 w-80  py-2 bg-white shadow-md rounded-lg   border border-[#CCD0D5] dark:bg-gray-800 h-[400px]">

                <div className="w-full justify-between flex px-4">
                    <span className="font-bold text-[18px]">Đoạn chat</span>
                    <button onClick={refreshData} className="text-blue-500 mb-2 text-[13px] font-medium">
                        Làm mới
                    </button>
                </div>
                {loading && <p className="text-center text-gray-500">Đang tải...</p>}
                <div>
                    <ul className="overflow-y-auto h-[350px]">
                        {dataList?.map((chat, index) => (
                            <li
                                onClick={() => createRoomChat(chat)}
                                key={index} className="py-2 flex items-center justify-between w-full cursor-pointer hover:bg-[#F2F2F2] px-4">
                                <div className="flex gap-2 items-center">
                                    <AvatarDefault src={chat.avatar} alt="" className="w-12 h-12"></AvatarDefault>
                                    <div className="flex flex-col w-full gap-[2px]">
                                        <span className="font-medium text-[14px]">{chat.userName}</span>
                                        <span className="text-[11px] text-gray">{chat.sendByMe ? 'Bạn: ' : ''}{chat.lastMessage}</span>
                                    </div>
                                </div>
                                {!chat.isRead && <MdCircle className="text-blue-500 text-[14px]" />}

                            </li>
                        ))}
                    </ul>


                    {/* Observer */}
                    <div ref={observerRef} />
                </div>

            </div>
        </>
    );
}

export default FrameChat;