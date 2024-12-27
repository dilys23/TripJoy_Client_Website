import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { getUserLikePost, getUserLikePostByIcon } from "../../services/interactPost";
import avatarDefault from "../../assets/images/avatarDefault.png"
function ModalUserLikePost({ handleClose, postId }) {
    // console.log(postId);
    const emotions = [
        { emoji: "👍", label: "0" },
        { emoji: "❤️", label: "1" },
        { emoji: "😢", label: "2" },
        { emoji: "😂", label: "3" },
        { emoji: "😮", label: "4" },
        { emoji: "😡", label: "5" },
    ]

    const [emotionCount, setEmotionCount] = useState([]);
    const [tab, setTab] = useState('all');
    const [userLikePost, setUserLikePost] = useState([]);
    const [userLikePostByIcon, setUserLikePostByIcon] = useState([]);
    const fetchReactionsByIcon = async (emotionLabel) => {
        try {
            // console.log(emotionLabel)
            const res = await getUserLikePostByIcon(postId, emotionLabel);
            setUserLikePostByIcon(res.users.data);
            console.log(res)
        } catch (error) {
            console.error("Error fetching reactions by icon:", error);
        }
    };
    useEffect(() => {
        const fetchReactions = async () => {
            try {
                const res = await getUserLikePost(postId);
                setEmotionCount(res.emotionCount);
                setUserLikePost(res.users.data);

            } catch (error) {
                console.error("Error fetching reactions:", error);
            }
        };
        fetchReactions();
    }, [postId]);
    const handleTabClick = (tabName, emotionLabel) => {
        setTab(tabName);
        if (tabName !== 'all') {
            fetchReactionsByIcon(emotionLabel);
        }
    };
    return (
        <>

            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative sm:w-[450px] w-4/5 min-h-[300px] pb-5 flex bg-white  border-2 border-none rounded-xl shadow-xl stroke-2  stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="absolute top-5 right-5">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1 pt-3 px-3">
                        <div className="flex w-full gap-5 items-center">
                            <span
                                onClick={() => handleTabClick('all')}
                                className={`sm:text-[16px] px-3 text-[14px] cursor-pointer font-semibold ${tab === 'all' ? 'border-b-2 border-[#007AFF] text-[#007AFF]' : ''
                                    }`}>
                                Tất cả
                            </span>
                            <div className="flex gap-5 items-center">
                                {emotionCount.map((emotionData) => {
                                    const emotion = emotions.find((e) => e.label === emotionData.emotion.toString());
                                    if (!emotion) return null;
                                    return (
                                        <div
                                            onClick={() => handleTabClick(emotion.label, emotion.label)}
                                            key={emotion.label}
                                            className={`flex px-3 items-center gap-2 ${tab === emotion.label ? 'border-b-2 border-[#007AFF] text-[#007AFF]' : ''
                                                }`}>
                                            <span className="sm:text-[16px] text-[14px] cursor-pointer">
                                                {emotion.emoji}
                                                {emotionData.count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {tab === 'all' &&
                            userLikePost.map((user) => (
                                <div className="w-full justify-between flex  py-2 ">
                                    <div className="flex gap-3 items-center cursor-pointer">
                                        <img src={user?.url || avatarDefault} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                                        <span className="text-[14px] font-semibold">{user.userName}</span>
                                    </div>

                                </div>
                            ))
                        }
                        {tab !== 'all' &&
                            userLikePostByIcon.map((user) => (
                                <div key={user.id} className="w-full justify-between flex py-2">
                                    <div className="flex gap-3 items-center cursor-pointer">
                                        <img src={user.url || avatarDefault} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                                        <span className="text-[14px] font-semibold">{user.userName}</span>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalUserLikePost;