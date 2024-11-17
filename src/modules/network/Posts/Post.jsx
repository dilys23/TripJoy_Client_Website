import PropTypes from 'prop-types';
import { useState } from 'react';
import * as MdIcons from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaMoneyCheckDollar } from "react-icons/fa6";
function Post({ data }) {
    const numImage = data.image.length
    // console.log(numImage)
    const [showFullText, setShowFullText] = useState(false)
    const truncatedText = data.descrip.length > 80 && !showFullText
        ? `${data.descrip.slice(0, 80)}...`
        : data.descrip;

    const [isLiked, setIsLike] = useState(data.isLiked);
    const [numLikes, setNumLikes] = useState(data.numLikes);
    const handleUnLiked = () => {
        setIsLike(false);
        setNumLikes(numLikes - 1)
    }
    const handleLikes = () => {
        setIsLike(true);
        setNumLikes(numLikes + 1)
    }

    return (
        <div className="w-full bg-white  lg:h-auto rounded-20 pt-5 mb-16">
            <div className='w-full flex md:flex-row flex-col'>
                <div className='w-full'>
                    <div className="flex justify-between px-5 ">
                        <div className="flex gap-3 text-center cursor-pointer items-center">
                            <div className='flex flex-col'>
                                <div className='nunito-text md:text-[24px] text-[16px] md:leading-[32px] leading-[18px] font-extrabold text-start'>Hai ngày một đêm ở Hà Giang</div>
                                <div className='flex gap-2 items-center'>
                                    <img src={data.avatar} alt="" className='rounded-90 w-[40px] h-[40px]' />
                                    <div className='block text-start'>
                                        <div className='font-bold md:text-base text-[12px] nunito-text leading-4'>{data.name}</div>
                                        <div className='text-[#979797] text-xs italic leading-4'>{data.time}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4  whitespace-pre-line md:text-base text-[13px] px-5 " >
                        <div className='font-bold text-[20px]'>{data.title}</div>
                        {truncatedText}
                        {data.descrip.length > 80 && !showFullText && (
                            <button
                                onClick={() => setShowFullText(!showFullText)}
                                className='text-[#161823b0] md:[13px] text-[13px] italic'>...xem tiếp</button>
                        )}


                    </div>
                    <div className={`grid w-full h-[250px] gap-1 mt-3
                     ${numImage < 3 ? (numImage === 1 ? "grid-cols-1" : "grid-cols-2") : "grid-cols-4"}
                    `}>
                        {data.image.length === 1 && (
                            <img src={data.image[0]} alt="Post image 1"
                                className="w-full h-[250px] rounded-[7px] object-cover cursor-pointer" />
                        )}

                        {data.image.length === 2 && (
                            <>
                                <img src={data.image[0]} alt="Post image 1"
                                    className="w-full h-[250px] rounded-[7px] object-cover cursor-pointer" />
                                <img src={data.image[1]} alt="Post image 2"
                                    className="w-full  h-[250px] rounded-[7px] object-cover cursor-pointer" />
                            </>
                        )}
                        {data.image.length >= 3 && (
                            <>
                                <img src={data.image[0]} alt="Post image 1"
                                    className="w-full h-[250px] col-span-1 rounded-[7px] object-cover cursor-pointer" />
                                <img src={data.image[1]} alt="Post image 2"
                                    className="w-full h-[250px] col-span-1 rounded-[7px] object-cover cursor-pointer" />
                                {data.image.length > 3 ? (
                                    <div className="relative w-full h-[250px] col-span-2 cursor-pointer">
                                        <img src={data.image[2]} alt="Post image 3"
                                            className="w-full h-[250px] rounded-[7px] object-cover" />
                                        <div className="absolute top-0 left-0 w-full h-[250px] bg-black bg-opacity-25 flex items-center justify-center rounded-[7px]">
                                            <span className="text-white text-[24px] font-bold">+{data.image.length - 3}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <img src={data.image[2]} alt="Post image 3"
                                        className="w-full h-[250px] col-span-2 rounded-[7px] object-cover cursor-pointer" />
                                )}
                            </>
                        )}

                    </div>


                </div>

            </div>
            <div className='flex pt-3 px-2 justify-around'>
                <div className='flex gap-2'>
                    <MdIcons.MdLocationOn className='text-[40px] text-[#134563]' />
                    <div>
                        <div className='font-medium text-[14px]'>Địa điểm</div>
                        <div className='text-[14px]'>Hà Giang</div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <MdIcons.MdCalendarMonth className='text-[40px] text-[#134563]' />
                    <div>
                        <div className='font-medium text-[14px]'>Thời gian</div>
                        <div className='text-[14px]'>20/12 đến 25/12</div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <MdIcons.MdFlight className='text-[40px] text-[#134563]' />
                    <div>
                        <div className='font-medium text-[14px]'>Phương tiện</div>
                        <div className='text-[14px]'>Xe máy</div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <FaMoneyCheckDollar className='text-[40px] text-[#134563]' />
                    <div>
                        <div className='font-medium text-[14px]'>Kinh phí</div>
                        <div className='text-[14px]'>1.500.000đ</div>
                    </div>
                </div>
            </div>
            <hr className='my-2 text-[#979797] w-[90%] mx-auto mt-2' />
            <div className='flex  w-full justify-center gap-14'>
                <div className='flex gap-2 items-center w-[100px]'>
                    {isLiked ?
                        <AiFillHeart
                            onClick={handleUnLiked}
                            className="text-[#eb3223] text-[20px] cursor-pointer"></AiFillHeart>
                        : <AiOutlineHeart
                            onClick={handleLikes}
                            className="text-[#3a3a3a] text-[20px] cursor-pointer"></AiOutlineHeart>}
                    <span className={`${isLiked ? 'text-[#eb3223]' : 'text-[#3a3a3a]'}`}>{numLikes || 0}</span>
                </div>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <FaRegComment className='text-[#3a3a3a]' />
                    <span className='text-[#3a3a3a]'>{data.numComments || 0}</span>
                </div>
            </div>
        </div >
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