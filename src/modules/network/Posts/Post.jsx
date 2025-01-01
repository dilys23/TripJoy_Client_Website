import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import AvatarDefault from '../../../components/Avatar/AvatarDefault';
import Emotion from '../../../components/Emotion';
import { likePost, revokePost } from '../../../services/interactPost';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { commentPost, deleteComment, editComment, getCommentByPostId, likeComment, replyComment } from '../../../services/commentPost';
import CommentItem from '../../../components/CommentItem';
import { MdAddLocationAlt, MdMoreVert } from 'react-icons/md';
import { Dropdown } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import gifadd from "../../../assets/gif/icons8-add.gif"
import ModalDetailRouting from '../../../components/Modal/ModalDetailRouting';
import { UserContext } from '../../../contexts/UserContext';
import ModalClonePlan from '../../../components/Modal/ModalClonePlan';
import { toast } from 'react-toastify';
function Post({ data, onDelete, onShowUserLike, mySelf }) {
    const [post, setPost] = useState(data);
    // console.log(data);
    const [showFullText, setShowFullText] = useState(false);
    const truncatedText =
        post?.content?.length > 230 && !showFullText
            ? `${post.content.slice(0, 230)}...`
            : post?.content || 'No content available';

    const [visible, setVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState({});
    const [showComment, setShowComment] = useState(false);
    const [isLiked, setIsLike] = useState(data.emotionByMe);
    const [inputComment, setInputComment] = useState('');
    const [listComment, setListComment] = useState([]);
    const handleShow = () => setVisible(true);
    const handleHide = () => {
        setTimeout(() => setVisible(false), 4000);
    };
    const [clonePlan, setClonePlan] = useState(false);
    const { user } = useContext(UserContext);
    const tippyRef = useRef(null);
    const emotionRef = useRef(null);
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => handleHide();
    const [showRouting, setShowRouting] = useState(false);
    const emotions = useMemo(() => [
        { emoji: "👍", label: "0", title: 'Đã thích' },
        { emoji: "❤️", label: "1", title: 'Yêu thích' },
        { emoji: "😢", label: "2", title: 'Buồn' },
        { emoji: "😂", label: "3", title: 'Haha' },
        { emoji: "😮", label: "4", title: 'Wow' },
        { emoji: "😡", label: "5", title: 'Phẫn nộ' },
    ], []);
    const items = [
        { label: 'Chỉnh sửa', key: '1' },
        { label: 'Xoá', key: '2' }
    ];

    const fetchComment = async () => {
        try {
            const res = await getCommentByPostId(data.postId)
            // console.log(res.comments.data);
            setListComment(res.comments.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setPost(data);
    }, []);
    useEffect(() => {
        if (showComment) {
            fetchComment();
        }
    }, [showComment]);
    const handleRevoke = useCallback(
        async () => {
            console.log(post.emotionByMe);
            try {
                if (isLiked === null) {
                    const likeData = {
                        LikePost: {
                            Emotion: 0,
                        }
                    };
                    const res = await likePost(post?.postId, likeData);
                    // console.log(res);
                    setIsLike(0);
                    setPost(prevPost => ({
                        ...prevPost,
                        likeCount: prevPost.likeCount + 1
                    }));

                } else {
                    const res = await revokePost(post?.postId);
                    setIsLike(null);
                    setPost(prevPost => ({
                        ...prevPost,
                        likeCount: prevPost.likeCount > 0 ? prevPost.likeCount - 1 : prevPost.likeCount // Giảm số lượt thích
                    }));
                }
            } catch (error) {
                toast.error("Lỗi kết nối", error);
                console.log(error);
            }
        }
        , [post])
    const handleLike = useCallback(
        async (emotion) => {
            if (post) {
                const likeData = {
                    LikePost: {
                        Emotion: Number(emotion),
                    }
                };
                try {
                    if (isLiked === null) {

                        const res = await likePost(post?.postId, likeData);
                        setIsLike(emotion);
                        setPost(prevPost => ({
                            ...prevPost,
                            likeCount: prevPost.likeCount + 1
                        }));
                    } else if (isLiked !== emotion) {

                        const res = await likePost(post?.postId, likeData);
                        setIsLike(emotion);
                    } else {

                        console.log("Emotion không thay đổi.");
                    }
                    handleHide();
                } catch (error) {
                    toast.error("Lỗi kết nối", error);
                }

            }
        }
        , [post])
    const handleSendComment = async () => {
        if (inputComment.length === 0) return;
        try {
            const commentData = {
                "Comment": {
                    "Content": inputComment
                }
            }
            const res = await commentPost(post?.postId, commentData);
            setInputComment('');
            fetchComment();
            setPost((prevPost) => ({
                ...prevPost,
                commentCount: prevPost.commentCount + 1,
            }));
        } catch (error) {
            toast.error("Lỗi kết nối", error);
        }
    }
    const handleEmotionClick = async (commentId, label) => {
        const commentData = {
            "LikeComment": {
                "Emotion": Number(label)
            }
        }
        try {
            const res = await likeComment(commentId, commentData);
            fetchComment();
        } catch (error) {
            toast.error("Lỗi kết nối", error);
        }
    };
    const handleDelete = async (commentId) => {
        try {
            // console.log(commentId)
            const res = await deleteComment(commentId);
            fetchComment();
            setPost((prevPost) => ({
                ...prevPost,
                commentCount: prevPost.commentCount > 0 ? prevPost.commentCount - 1 : 0,
            }));
        } catch (error) {
            toast.error("Lỗi kết nối", error);
        }
    }
    const handleSendReply = async (commentId, replyText) => {
        try {
            const commentData = {
                "Comment": {
                    "Content": replyText
                }
            }
            const res = await replyComment(commentId, commentData);
            fetchComment();
        } catch (error) {
            toast.error("Lỗi kết nối", error);
        }
    }

    const handleMenuClick = (e) => {
        // console.log('Clicked item:', e.key);
        if (e.key === '1') {
            console.log(data.postId)
        } else if (e.key === '2') {
            onDelete(data.postId);
        }
    };
    const updateComment = (commentId, updatedData) => {
        setListComment((prevComments) =>
            prevComments.map((comment) =>
                comment.commentId === commentId
                    ? { ...comment, ...updatedData }
                    : comment
            )
        );
    };
    const handleShowUserLike = () => {
        onShowUserLike(data.postId);
    }
    const formatPlanDateRange = (planStartDate, planEndDate) => {
        const formatDate = (isoString) => {
            const date = new Date(isoString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            return `${day}/${month}`;
        };

        return `${formatDate(planStartDate)} đến ${formatDate(planEndDate)}`;
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount) + 'đ';
    };
    const handleEditComment = async (commentId, replyText) => {
        // console.log(commentId, replyText);
        const commentData = {
            "Comment": {
                "Content": replyText
            }
        }
        try {
            const res = await editComment(commentId, commentData);
            // console.log(res);
            setListComment(prevComments =>
                prevComments.map(comment =>
                    comment.commentId === commentId
                        ? { ...comment, content: replyText }
                        : comment
                )
            );
        } catch (error) {
            toast.error("Lỗi kết nối", error);
            console.log('error', error)
        }
    }
    // console.log(data);
    // console.log(user.profile.id);
    // console.log(post.userPosted.userId)
    // console.log(data.planPost.postPlanLocations);
    return (
        <div className="w-full bg-white border border-[#CCD0D5] lg:h-auto rounded-20 pt-5 mb-2 pb-3 px-1">
            {
                clonePlan &&
                <ModalClonePlan plan={data.planPost} open={() => setClonePlan(true)} handleClose={() => setClonePlan(false)}></ModalClonePlan>
            }
            {showRouting && <ModalDetailRouting routing={data.planPost.postPlanLocations} handleClose={() => setShowRouting(false)} name={post?.userPosted.userName}></ModalDetailRouting>}
            <div className='w-full flex md:flex-row flex-col'>
                <div className='w-full'>
                    <div className="flex justify-between px-5 items-center">
                        <div className='flex gap-2 items-center'>
                            <AvatarDefault src={post?.userPosted?.avatar} alt={post?.userPosted?.avatar} className="md:w-[50px] md:h-[50px] w-[30px] h-[30px]"></AvatarDefault>

                            <div className='block text-start'>
                                <div className='font-bold md:text-base text-[12px] nunito-text leading-4'>{post?.userPosted.userName}</div>
                                <div className='text-[#979797] text-[13px]  leading-4'>{formatDistanceToNow(
                                    new Date(new Date(post?.createdAt).setHours(new Date(post?.createdAt).getHours() + 7)),
                                    { addSuffix: true, locale: vi }
                                )}</div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            {
                                post?.postType !== 0 && post?.planPost
                                &&
                                <div
                                    onClick={() => setShowRouting(true)}
                                    className='flex gap-1 items-center cursor-pointer'>
                                    <span className='text-[12px] text-[#007AFF] font-bold'>Xem lộ trình</span>
                                    <img width="23" height="23" src="https://img.icons8.com/color/48/worldwide-location.png" alt="worldwide-location" />
                                </div>
                            }
                            {
                                mySelf.id === post.userPosted.userId
                                &&
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick: handleMenuClick,
                                    }}
                                    placement="bottomRight"
                                >
                                    <MdMoreVert className="cursor-pointer text-[20px]" />
                                </Dropdown>
                            }
                        </div>
                    </div>
                    <div className="sm:mt-4 mt-1 whitespace-pre-line  text-[15px] px-5 " >
                        {truncatedText}
                        {post?.content?.length > 230 && !showFullText && (
                            <button
                                onClick={() => setShowFullText(!showFullText)}
                                className='text-[#161823b0] md:[13px] text-[13px] italic'>...xem tiếp</button>
                        )}


                    </div>

                    {
                        post?.postImages.length > 0 && (
                            <div className="w-full md:h-[250px] h-[120px] mt-3 px-5">
                                {post?.postImages.length <= 3 ? (
                                    <div
                                        className={`grid w-full md:h-[250px] h-[120px] gap-3 
    ${post?.postImages.length === 1 ? "grid-cols-1" :
                                                post?.postImages.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                                    >
                                        {post?.postImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.url}
                                                alt={`Post image ${index + 1}`}
                                                className="w-full md:h-[250px] h-[120px] rounded-[7px] object-cover cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        slidesPerView={3}
                                        spaceBetween={10}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop={true}
                                        className='max-w-[600px] your-slider-class'

                                    >
                                        {post?.postImages.slice(0, 3).map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={image.url}
                                                    alt={`Post image ${index + 1}`}
                                                    className="w-full md:h-[250px] h-[120px] rounded-[7px] object-cover cursor-pointer"
                                                />
                                            </SwiperSlide>
                                        ))}
                                        {post?.postImages.length > 3 && (
                                            <SwiperSlide>
                                                <div className="relative w-full md:h-[250px] h-[120px] cursor-pointer">
                                                    <img
                                                        src={post?.postImages[2].url}
                                                        alt="Post image 3"
                                                        className="w-full md:h-[250px] h-[120px] rounded-[7px] object-cover"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
            {
                post?.postType !== 0
                &&
                <div className='flex pt-3 px-2 justify-around'>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <img width="45" height="30" src="https://img.icons8.com/color/48/map-pin.png" alt="marker" className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]" />
                        <div>
                            <div className='font-medium sm:text-[14px] text-[8px]'>Địa điểm</div>
                            <div className='sm:text-[14px] text-[8px]'>{post?.planPost.provinceEnd.provinceName}</div>
                        </div>
                    </div>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <img width="48" height="48" src="https://img.icons8.com/emoji/48/tear-off-calendar-emoji.png" alt="tear-off-calendar-emoji" className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]" />
                        {/* <FcCalendar className='sm:text-[35px] text-[23px] text-[#134563]' /> */}
                        <div>
                            <div className='font-medium sm:text-[14px] text-[8px]'>Thời gian</div>
                            <div className='sm:text-[14px] text-[8px]'>{formatPlanDateRange(post?.planPost.planStartDate, post?.planPost.planEndDate)}</div>
                        </div>
                    </div>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <img width="48" height="48" src="https://img.icons8.com/color/48/fiat-500--v1.png" alt="fiat-500--v1" className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]" />
                        {/* <FcAutomotive className='sm:text-[35px] text-[25px] text-[#134563]' /> */}
                        <div>
                            <div className='font-medium sm:text-[14px] text-[8px]'>Phương tiện</div>
                            <div className='sm:text-[14px] text-[8px]'>
                                {(() => {
                                    switch (post.planPost.vehicle) {
                                        case 0:
                                            return "Xe máy";
                                        case 1:
                                            return "Ô tô";
                                        case 2:
                                            return "Tàu hoả";
                                        case 3:
                                            return "Máy bay";
                                        case 4:
                                            return "Tàu thuỷ";
                                        default:
                                            return "Khác";
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <img
                            width="48"
                            height="48"
                            src="https://img.icons8.com/color/48/money-bag.png"
                            alt="scooter"
                            className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                        />
                        <div>
                            <div className='font-medium sm:text-[14px] text-[8px]'>Kinh phí</div>
                            <div className='sm:text-[14px] text-[8px]'>{formatCurrency(post?.planPost.budget)}</div>
                        </div>
                    </div>
                </div>
            }
            <div className='flex justify-between w-full px-5 pt-2'>
                <span
                    onClick={handleShowUserLike}
                    className='text-[13px] flex items-center cursor-pointer'>👍{post?.likeCount} lượt thích</span>
                <span className='text-[13px] flex items-center cursor-pointer'>{post?.commentCount} bình luận</span>
            </div>
            <hr className='my-2 text-[#979797] w-[90%] mx-auto mt-2' />
            <div className='flex  w-full justify-center gap-14'>

                <div
                    className='flex gap-2 items-center w-1/3  justify-center cursor-pointer transition-all duration-150 py-1 md:text-[16px] text-[12px]'
                >
                    <Tippy
                        onClickOutside={handleHide}
                        visible={visible}
                        interactive={true}
                        placement="top"
                        render={(attrs) => (
                            <div className="w-[200px] items-start flex" tabIndex="-1" {...attrs}>
                                <Emotion onEmotionClick={handleLike} />
                            </div>
                        )}

                        ref={tippyRef}
                    >
                        <div
                            onClick={handleRevoke}
                            onMouseEnter={handleShow}
                            onMouseLeave={handleMouseLeave}
                            className="w-fit flex"
                            ref={emotionRef}
                        >
                            {isLiked === null ? (
                                <div className="flex gap-2">
                                    <img
                                        className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] "
                                        src="https://img.icons8.com/wired/64/facebook-like.png"
                                        alt="facebook-like"
                                    />
                                    <span className="sm:text-[15px] text-[13px]">Thích</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span
                                        role="img"
                                        aria-label="current-emotion"
                                        className="sm:text-[22px] text-[18px]"
                                    >
                                        {emotions.find((emotion) => emotion.label === String(isLiked))?.emoji}
                                    </span>
                                    <span className="text-blue-500 sm:text-[15px] text-[13px]">
                                        {emotions.find((emotion) => emotion.label === String(isLiked))?.title || 'Đã thích'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Tippy>
                </div>
                <div
                    onClick={() => setShowComment((prev) => (!prev))}
                    className='flex gap-2 items-center w-1/3  justify-center cursor-pointer transition-all duration-150 py-1 md:text-[16px] text-[12px]'>
                    <img
                        className='w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]'
                        src="https://img.icons8.com/ios/50/speech-bubble.png"
                        alt="speech-bubble"
                    />
                    <span className='text-[#3a3a3a] sm:text-[15px] text-[13px]'>Bình luận </span>
                </div>
                {
                    post.userPosted.userId !== user.profile.id
                    &&
                    <div
                        onClick={() => {
                            console.log("Đã nhấn vào Tạo chuyến đi");
                            setClonePlan(true);
                        }}
                        className='flex gap-1 items-center w-1/3  justify-center text-[#056649] font-medium cursor-pointer transition-all duration-150 py-1 md:text-[14px] text-[12px]'>
                        <img src={gifadd} alt="" className='w-8 h-8' />
                        Tạo chuyến đi
                    </div>
                }


            </div>

            {
                showComment &&

                <>
                    <div className='w-full px-5 flex flex-col gap-2'>
                        {
                            listComment.slice(0, 2).map((item) => (
                                <CommentItem
                                    key={item.commentId}
                                    onDelete={handleDelete}
                                    commentVisible={commentVisible}
                                    onSendReply={handleSendReply}
                                    item={item}
                                    emotions={emotions} handleEmotionClick={handleEmotionClick}
                                    updateComment={updateComment}
                                    onEditComment={handleEditComment}
                                ></CommentItem>
                            ))
                        }
                    </div>
                    <div className='md:h-[60px] h-[60px] px-5 py-1 w-full flex gap-2'>
                        <AvatarDefault src={user?.profile?.avatar?.url} alt={post?.userPosted.avatar} className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"></AvatarDefault>
                        <div className='w-11/12 bg-[#f0f2f5] h-full rounded-lg py-3 px-2 flex'>
                            <input
                                value={inputComment}
                                onChange={(e) => setInputComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendComment();
                                    }
                                }}
                                type="text" placeholder='Viết bình luận...'
                                className='bg-transparent w-full outline-none text-[14px]' />
                            <img
                                onClick={handleSendComment}
                                width="30"
                                height="30"
                                src="https://img.icons8.com/arcade/64/sent.png"
                                alt="sent"
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                </>

            }
        </div>
    );
}

export default Post;