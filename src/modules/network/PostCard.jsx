import noImage from "../../assets/images/noImages.jpg"
function PostCard({ post }) {
    return (
        <div className="w-[662px] h-[140px] border border-[#ccd0d5] shadow-sm rounded-[15px] flex">
            <img src={post.image || noImage} alt="" className="h-full w-[140px] rounded-[15px]" />
            <div className="w-full py-3 flex flex-col gap-3">
                <div className="flex justify-between w-full px-5">
                    <div className="flex gap-2">
                        <img src={post.avatar || noImage} alt="" className="w-[46px] h-[46px] rounded-[90px]" />
                        <div className="flex flex-col">
                            <span className="text-base font-bold">{post.name}</span>
                            <span className="text-[10px] font-normal text-[#aeaeae] leading-3 text-start">{post.date}</span>
                        </div>
                    </div>
                    {post.state ? (
                        <div className="w-[115px] h-[28px] bg-[#ff2424] text-white flex items-center justify-center text-[14px] px-2 py-2 rounded-[5px]">Đã hoàn thành</div>
                    ) : (
                        <div className="w-[115px] h-[28px] bg-[#46e8a5] text-white flex items-center justify-center text-[14px] px-2 py-2 rounded-[5px]">Đang diễn ra</div>
                    )}
                </div>
                <div className="flex gap-3 justify-between px-5">
                    <div className="text-[24px] font-bold leading-7">{post.title}</div>
                    <button className="text-[14px] px-2 py-1 rounded-[5px] bg-[#ff7324] text-white">Chia sẻ</button>
                </div>
            </div>
        </div>
    );
}

export default PostCard;