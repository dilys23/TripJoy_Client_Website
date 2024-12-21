import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FcAutomotive, FcCalendar } from "react-icons/fc";
import { getUserById } from '../../../services/getUserById';
import AvatarDefault from '../../../components/Avatar/AvatarDefault';
import Emotion from '../../../components/Emotion';
import { likePost, revokePost } from '../../../services/interactPost';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { commentPost, getCommentByPostId } from '../../../services/commentPost';
function Post({ data }) {
    // console.log(data);
    const [post, setPost] = useState(data);
    useEffect(() => {
        setPost(data);
    }, [data])

    const [showFullText, setShowFullText] = useState(false)
    const truncatedText =
        post?.content?.length > 80 && !showFullText
            ? `${post.content.slice(0, 80)}...`
            : post?.content || 'No content available';

    const [user, setUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState({});
    const [showComment, setShowComment] = useState(false);
    const [isLiked, setIsLike] = useState(data.emotionByMe);
    const [inputComment, setInputComment] = useState('');
    const [listComment, setListComment] = useState([]);
    const handleShow = useCallback(() => setVisible(true), []);
    const handleHide = useCallback(() => setVisible(false), []);
    const emotions = [
        { emoji: "👍", label: "0", title: 'Đã thích' },
        { emoji: "❤️", label: "1", title: 'Yêu thích' },
        { emoji: "😢", label: "2", title: 'Buồn' },
        { emoji: "😂", label: "3", title: 'Haha' },
        { emoji: "😮", label: "4", title: 'Wow' },
        { emoji: "😡", label: "5", title: 'Phẫn nộ' },
    ];
    const fetchUser = async () => {
        try {
            const res = await getUserById(post.userId)
            // console.log(res);
            setUser(res.user);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchComment = async () => {
        try {
            const res = await getCommentByPostId(post.postId)
            console.log(res.comments.data);
            setListComment(res.comments.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
        fetchComment();
    }, []);
    const handleRevoke = async () => {
        try {
            if (post?.emotionByMe === null) {
                const likeData = {
                    LikePost: {
                        Emotion: 0,
                    }
                };
                const res = await likePost(post?.postId, likeData);
                setIsLike(0);
            } else {
                // console.log('unlike')
                const res = await revokePost(post?.postId);
                setIsLike(null);
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleLike = async (emotion) => {
        if (post) {
            const likeData = {
                LikePost: {
                    Emotion: Number(emotion),
                }
            };
            try {
                // console.log(likeData)
                const res = await likePost(post?.postId, likeData);
                // console.log(res);
                setIsLike(emotion);
                handleHide();

            } catch (error) {
                console.log(error);
            }

        }
    }
    const handleSendComment = async () => {
        if (inputComment.length === 0) return;
        try {
            const commentData = {
                "Comment": {
                    "Content": inputComment
                }
            }
            const res = await commentPost(post?.postId, commentData);
            // console.log(res);
            setInputComment('');
            fetchComment();
        } catch (error) {
            console.log(error);
        }
    }
    const handleEmotionClick = (commentId) => {
        setCommentVisible((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    return (
        <div className="w-full bg-white border border-[#CCD0D5] lg:h-auto rounded-20 pt-5 mb-2 pb-3 px-1">
            <div className='w-full flex md:flex-row flex-col'>
                <div className='w-full'>
                    <div className="flex justify-between px-5 ">
                        <div className="flex gap-3 text-center cursor-pointer items-center">
                            <div className='flex flex-col'>
                                {/* <div className='nunito-text lg:text-[24px] md:text-[20px] text-[16px] md:leading-[32px] leading-[18px] font-extrabold text-start'>Hai ngày một đêm ở Hà Giang</div> */}
                                <div className='flex gap-2 items-center'>
                                    <AvatarDefault src={user?.avatar} alt={user?.avatar} className="md:w-[50px] md:h-[50px] w-[30px] h-[30px]"></AvatarDefault>

                                    <div className='block text-start'>
                                        <div className='font-bold md:text-base text-[12px] nunito-text leading-4'>{user?.userName}</div>
                                        <div className='text-[#979797] text-xs italic leading-4'>{post?.time}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:mt-4 mt-1 whitespace-pre-line  text-[15px] px-5 " >
                        {truncatedText}
                        {post?.content.length > 80 && !showFullText && (
                            <button
                                onClick={() => setShowFullText(!showFullText)}
                                className='text-[#161823b0] md:[13px] text-[13px] italic'>...xem tiếp</button>
                        )}


                    </div>
                    {
                        post?.postImages.length > 0 &&
                        <div className={`grid w-full md:h-[250px] h-[120px] gap-3 mt-3 px-5
                     ${post?.postImages.length < 3 ? (post?.postImages.length === 1 ? "grid-cols-1" : "grid-cols-2") : "grid-cols-4"}
                    `}>
                            {post?.postImages.length === 1 && (
                                <img src={post?.image[0]} alt="Post image 1"
                                    className="w-full md:h-[250px] h-[120px] rounded-[7px] object-cover cursor-pointer" />
                            )}

                            {post?.postImages.length === 2 && (
                                <>
                                    <img src={post?.image[0]} alt="Post image 1"
                                        className="w-full md:h-[250px] h-[120px] rounded-[7px] object-cover cursor-pointer" />
                                    <img src={post?.image[1]} alt="Post image 2"
                                        className="w-full  md:h-[250px] h-[120px] rounded-[7px] object-cover cursor-pointer" />
                                </>
                            )}
                            {post?.postImages.length >= 3 && (
                                <>
                                    <img src={post?.postImages[0]} alt="Post image 1"
                                        className="w-full md:h-[250px] h-[120px] col-span-1 rounded-[7px] object-cover cursor-pointer" />
                                    <img src={post?.postImages[1]} alt="Post image 2"
                                        className="w-full md:h-[250px] h-[120px] col-span-1 rounded-[7px] object-cover cursor-pointer" />
                                    {post?.postImages.length > 3 ? (
                                        <div className="relative w-full md:h-[250px] h-[120px] col-span-2 cursor-pointer">
                                            <img src={post?.postImages[2]} alt="Post image 3"
                                                className="w-full md:h-[250px] h-[120px] rounded-[7px] object-cover" />
                                            <div className="absolute top-0 left-0 w-full md:h-[250px] h-[120px] bg-black bg-opacity-25 flex items-center justify-center rounded-[7px]">
                                                <span className="text-white text-[24px] font-bold">+{post?.image.length - 3}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={post?.postImages[2]} alt="Post image 3"
                                            className="w-full md:h-[250px] h-[120px] col-span-2 rounded-[7px] object-cover cursor-pointer" />
                                    )}
                                </>
                            )}
                        </div>
                    }
                </div>
            </div>
            {
                post?.postType !== 0
                &&
                <div className='flex pt-3 px-2 justify-around'>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <img width="45" height="30" src="https://img.icons8.com/arcade/64/marker.png" alt="marker" className="w-[25px] h-[25px] sm:w-[30px] sm:h-[35px] lg:w-[35px] lg:h-[40px]" />
                        <div>
                            <div className='font-medium sm:text-[14px] text-[10px]'>Địa điểm</div>
                            <div className='sm:text-[14px] text-[10px]'>Hà Giang</div>
                        </div>
                    </div>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <FcCalendar className='sm:text-[40px] text-[23px] text-[#134563]' />
                        <div>
                            <div className='font-medium sm:text-[14px] text-[10px]'>Thời gian</div>
                            <div className='sm:text-[14px] text-[10px]'>20/12 đến 25/12</div>
                        </div>
                    </div>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <FcAutomotive className='sm:text-[40px] text-[25px] text-[#134563]' />
                        <div>
                            <div className='font-medium sm:text-[14px] text-[10px]'>Phương tiện</div>
                            <div className='sm:text-[14px] text-[10px]'>Xe máy</div>
                        </div>
                    </div>
                    <div className='flex sm:gap-2 gap-[2px] items-center'>
                        <img
                            width="48"
                            height="48"
                            src="https://img.icons8.com/office/40/money-bag.png"
                            alt="scooter"
                            className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px]"
                        />
                        <div>
                            <div className='font-medium sm:text-[14px] text-[10px]'>Kinh phí</div>
                            <div className='sm:text-[14px] text-[10px]'>1.500.000đ</div>
                        </div>
                    </div>
                </div>

            }

            <hr className='my-2 text-[#979797] w-[90%] mx-auto mt-2' />
            <div className='flex  w-full justify-center gap-14'>
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
                >
                    <div
                        onClick={handleRevoke}
                        onMouseEnter={handleShow}
                        className='flex gap-2 items-center w-1/2  justify-center cursor-pointer transition-all duration-150 py-1 md:text-[16px] text-[12px]'
                    >
                        {isLiked === null ? (
                            <>
                                <img
                                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] "
                                    src="https://img.icons8.com/wired/64/facebook-like.png"
                                    alt="facebook-like"
                                />
                                <span>Thích</span>
                            </>
                        ) : (
                            <div className='flex items-center justify-center gap-2'>
                                <span role="img" aria-label="current-emotion" className="text-[25px] md:text-[30px]">
                                    {emotions.find((emotion) => emotion.label === String(isLiked))?.emoji}
                                </span>
                                <span className="text-blue-500 text-[14px]">
                                    {emotions.find((emotion) => emotion.label === String(isLiked))?.title || 'Đã thích'}
                                </span>
                            </div>
                        )}


                    </div>
                </Tippy>
                <div
                    onClick={() => setShowComment((prev) => (!prev))}
                    className='flex gap-2 items-center w-1/2  justify-center cursor-pointer transition-all duration-150 py-1 md:text-[16px] text-[12px]'>
                    <img
                        className='w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] '
                        src="https://img.icons8.com/ios/50/speech-bubble.png"
                        alt="speech-bubble"
                    />
                    <span className='text-[#3a3a3a] text-[14px]'>Bình luận </span>
                </div>

            </div>
            {
                showComment &&

                <>
                    <div className='w-full px-5 flex flex-col gap-2'>
                        {
                            listComment.map((item) => (
                                <div className='w-full h-fit flex gap-3'>
                                    <AvatarDefault src="" className=" w-[30px] h-[30px]"></AvatarDefault>
                                    <div className='flex flex-col'>
                                        <div className='flex flex-col bg-[#f0f2f5] w-fit px-2 py-1 rounded-xl'>
                                            <span className='text-[13px] font-semibold'>{item.userName}</span>
                                            <span className='text-[12px]'>{item.content}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <span className='text-[9px]'>{formatDistanceToNow(
                                                new Date(new Date(item.createdAt).setHours(new Date(item.createdAt).getHours() + 7)),
                                                { addSuffix: true, locale: vi }
                                            )}</span>
                                            <Tippy
                                                visible={commentVisible[item.id]}
                                                // onClickOutside={handleHide}
                                                // visible={visible}
                                                interactive={true}
                                                placement="top"
                                                render={(attrs) => (
                                                    <div className="w-[200px] items-start flex" tabIndex="-1" {...attrs}>
                                                        <Emotion onEmotionClick={() => handleEmotionClick(item.id)} />
                                                    </div>
                                                )}
                                            >
                                                <span className='underline text-[9px] cursor-pointer'>Thích</span>
                                            </Tippy>

                                            <span className='underline text-[9px] cursor-pointer'>Phản hồi</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='md:h-[60px] h-[60px] px-5 py-1 w-full flex gap-2'>
                        <AvatarDefault src={user?.avatar} alt={user?.avatar} className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"></AvatarDefault>
                        <div className='w-11/12 bg-[#f0f2f5] h-full rounded-lg py-3 px-2 flex'>
                            <input
                                value={inputComment}
                                onChange={(e) => setInputComment(e.target.value)}
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
Post.propTypes = {
    data: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        descrip: PropTypes.string.isRequired,
        image: PropTypes.arrayOf(PropTypes.string).isRequired,
        isLiked: PropTypes.bool.isRequired,
        numLikes: PropTypes.number.isRequired,
        numComments: PropTypes.number.isRequired
    }).isRequired
};
export default Post;