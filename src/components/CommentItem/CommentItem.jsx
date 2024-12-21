import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MdArrowRightAlt, MdMoreHoriz } from "react-icons/md";
import Tippy from '@tippyjs/react/headless';
import AvatarDefault from '../Avatar/AvatarDefault';
import Emotion from '../Emotion';
import { useEffect, useRef, useState } from 'react';
import { getReplyComment, likeComment } from '../../services/commentPost';

function CommentItem({
    commentVisible,
    item,
    emotions,
    handleEmotionClick,
    onDelete,
    onSendReply
}) {
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [listReplyComment, setListReplyComment] = useState([]);
    const [visibleReplies, setVisibleReplies] = useState({});
    // const [replyEmotion, setReplyEmotion] = useState({});  // Store emotions for replies
    const dropdownRef = useRef(null);
    const moreButtonRef = useRef(null);

    const handleDropdownToggle = (id) => {
        if (activeDropdownId === id) {
            setActiveDropdownId(null);
        } else {
            setActiveDropdownId(id);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                moreButtonRef.current && !moreButtonRef.current.contains(event.target)
            ) {
                setActiveDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdownId]);

    const dropdownPosition = moreButtonRef.current
        ? moreButtonRef.current.getBoundingClientRect()
        : { top: 0, left: 0 };

    const handleDelete = () => {
        onDelete(item.commentId);
        handleDropdownToggle(item.commentId);
    };

    const handleReplyClick = () => {
        setIsReplyVisible(!isReplyVisible);
    };
    const fetchReplies = async (itemId, commentId) => {

        setVisibleReplies(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));


        if (!visibleReplies[itemId] && commentId) {
            try {
                const res = await getReplyComment(commentId);
                console.log(res.comments.data);
                setListReplyComment(res.comments.data);
            } catch (error) {
                console.log(error);
            }
        }
    };


    const handleSendReply = () => {
        if (replyText.trim()) {
            onSendReply(item.commentId, replyText);
            setReplyText("");
            setIsReplyVisible(false);

            fetchReplies();
        }
    };

    const handleEmotionSelect = async (emotion, replyId) => {

        const likeData = {
            LikeComment: {
                Emotion: Number(emotion),
            }
        };
        try {
            const res = await likeComment(replyId, likeData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className='w-full h-fit flex gap-3'>
            <AvatarDefault src="" className="w-[30px] h-[30px]" />
            <div className='flex flex-col w-full'>
                <div className='flex gap-2 items-center'>
                    <div className='flex flex-col bg-[#f0f2f5] w-fit px-2 py-1 rounded-xl'>
                        <span className='text-[13px] font-semibold'>{item.userName}</span>
                        <span className='text-[12px]'>{item.content}</span>
                    </div>
                    <div className='relative'>
                        <MdMoreHoriz
                            className='cursor-pointer'
                            onClick={() => handleDropdownToggle(item.commentId)}
                            ref={moreButtonRef}
                        />
                        {activeDropdownId === item.commentId && (
                            <div
                                className="absolute bg-white shadow-lg rounded-md mt-1 w-[100px]"
                                style={{
                                    top: `${dropdownPosition.top + dropdownPosition.height + 5}px`,
                                    left: `${dropdownPosition.left}px`
                                }}
                            >
                                <ul>
                                    <li className="text-[12px] cursor-pointer p-2 hover:bg-[#f4f2f2] transition-all duration-200">Chỉnh sửa</li>
                                    <li
                                        onClick={handleDelete}
                                        className="text-[12px] cursor-pointer p-2 hover:bg-[#f4f2f2] transition-all duration-200">Xóa</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <span className='text-[9px]'>{formatDistanceToNow(
                        new Date(new Date(item.createdAt).setHours(new Date(item.createdAt).getHours() + 7)),
                        { addSuffix: true, locale: vi }
                    )}</span>

                    <Tippy
                        visible={commentVisible[item.id]}
                        interactive={true}
                        placement="top"
                        render={(attrs) => (
                            <div className="w-[200px] items-start flex" tabIndex="-1" {...attrs}>
                                <Emotion
                                    onEmotionClick={(label) => handleEmotionClick(item.commentId, label)}
                                />
                            </div>
                        )}
                    >
                        {
                            item.emotionByMe === null ?
                                <span className='hover:underline text-[9px] cursor-pointer'>Thích</span>
                                :
                                <span role="img" aria-label="current-emotion" className="text-[13px] cursor-pointer">
                                    {emotions.find((emotion) => emotion.label === String(item.emotionByMe))?.emoji}
                                </span>
                        }
                    </Tippy>

                    <span
                        onClick={handleReplyClick}
                        className='hover:underline text-[9px] cursor-pointer'>Phản hồi</span>
                </div>

                {item.replyCount > 0 && (
                    <div
                        onClick={() => fetchReplies(item.id, item.commentId)}
                        className='text-[10px] pt-2 pl-3 flex items-center hover:underline cursor-pointer'>
                        <img width="12" height="12" src="https://img.icons8.com/material-two-tone/24/reply-arrow.png" alt="reply-arrow" className="transform rotate-180" />
                        có {item.replyCount} phản hồi</div>
                )}

                {visibleReplies[item.id] && listReplyComment.length > 0 && (
                    <div className='pt-2'>
                        {listReplyComment.map((reply) => (
                            <div key={reply.commentId} className='flex gap-3 pb-2 px-5'>
                                <AvatarDefault src="" className="w-[30px] h-[30px]" />
                                <div className='flex flex-col'>
                                    <div className='flex flex-col bg-[#f0f2f5] w-fit px-2 py-1 rounded-xl'>
                                        <span className='text-[13px] font-semibold'>{reply.userName}</span>
                                        <span className='text-[12px]'>{reply.content}</span>
                                    </div>
                                    <Tippy
                                        visible={listReplyComment[reply.commentId]}
                                        interactive={true}
                                        placement="top"
                                        render={(attrs) => (
                                            <div className="w-[200px] items-start flex" tabIndex="-1" {...attrs}>
                                                <Emotion
                                                    onEmotionClick={(label) => handleEmotionSelect(label, reply.commentId)}
                                                />
                                            </div>
                                        )}
                                    >
                                        {reply.emotionByMe ? (
                                            <span className="text-[13px] cursor-pointer">
                                                {emotions.find((emotion) => emotion.label === String(reply.emotionByMe))?.emoji}
                                            </span>
                                        ) : (
                                            <span className='hover:underline text-[9px] cursor-pointer'>Thích</span>
                                        )}
                                    </Tippy>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isReplyVisible && (
                    <div className='h-[50px] px-5 py-1 w-full flex gap-2'>
                        <AvatarDefault src="" className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]" />
                        <div className='w-11/12 bg-[#f0f2f5] h-full rounded-lg py-3 px-2 flex'>
                            <input
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                type="text" placeholder='Viết phản hồi...'
                                className='bg-transparent w-full outline-none text-[10px]' />
                            <img
                                onClick={handleSendReply}
                                width="20"
                                height="20"
                                src="https://img.icons8.com/arcade/64/sent.png"
                                alt="sent"
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
