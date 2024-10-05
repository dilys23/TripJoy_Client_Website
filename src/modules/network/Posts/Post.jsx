import PropTypes from 'prop-types';
import { useState } from 'react';
import * as MdIcons from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaMapMarkedAlt, FaCalendarDay, FaMoneyCheckAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import imgmap from "../../../assets/images/map.png"
function Post({ data }) {
    const numImage = data.image.length
    console.log(numImage)
    const [showFullText, setShowFullText] = useState(false)
    const truncatedText = data.descrip.length > 140 && !showFullText
        ? `${data.descrip.slice(0, 140)}...`
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
                <div className='md:w-3/5'>
                    <div className="flex justify-between px-5 ">
                        <div className="flex gap-3 text-center cursor-pointer items-center">
                            <img src={data.image[0]} alt="" className='w-[60px] h-[60px] object-cover' />
                            <div className='flex flex-col'>
                                <div className='nunito-text md:text-[24px] text-[16px] md:leading-[32px] leading-[18px] font-extrabold text-start'>Hai ngày một đêm ở Hà Giang</div>
                                <div className='flex gap-2 items-center'>
                                    <img src={data.avatar} alt="" className='rounded-90 w-[40px] h-[40px]' />
                                    <div className='block text-start'>
                                        <div className='font-bold md:text-base text-[12px] nunito-text leading-4'>{data.name}</div>
                                        <div className='text-[##979797] text-xs italic md:text-base text-[12px] leading-4'>{data.time}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4  whitespace-pre-line md:text-base text-[13px] px-5 " >
                        <div className='font-bold text-[20px]'>{data.title}</div>
                        {truncatedText}
                        {data.descrip.length > 140 && !showFullText && (
                            <button
                                onClick={() => setShowFullText(!showFullText)}
                                className='text-[#161823b0] md:[13px] text-[13px] italic'>...xem tiếp</button>
                        )}


                    </div>


                    <div className={`grid w-full h-[430px] gap-1 mt-3
                    ${numImage === 1 ? "grid-cols-1" :
                            numImage === 2 ? "grid-cols-2" :
                                numImage === 3 ? "grid-cols-2 grid-rows-2" :
                                    numImage === 4 ? "grid-cols-2 grid-rows-2" : ""}
                        }`}>
                        {data.image.length >= 5 && (
                            <>
                                <div className="grid grid-cols-2 gap-1">
                                    <img src={data.image[0]} alt="" className="w-full h-full rounded-10 object-cover cursor-pointer" />
                                    <img src={data.image[1]} alt="" className="w-full h-full rounded-10 object-cover cursor-pointer" />
                                </div>
                                <div className="grid grid-cols-3 gap-1 ">
                                    <img src={data.image[2]} alt="" className="w-full h-full rounded-10 object-cover cursor-pointer" />
                                    <img src={data.image[3]} alt="" className="w-full h-full rounded-10 object-cover cursor-pointer" />
                                    {data.image.length > 5 ?
                                        <div className='relative w-full h-full cursor-pointer'>
                                            <div className='absolute w-full h-full bg-opacity-50 bg-black items-center flex justify-center'>
                                                <span className=' text-white text-[30px]'>+{data.image.length - 5}</span>
                                            </div>
                                            <img src={data.image[4]} alt="" className="w-full h-full rounded-10 object-cover" />
                                        </div> :
                                        <img src={data.image[4]} alt="" className="w-full h-full rounded-10 object-cover" />
                                    }
                                </div>
                            </>)
                        }

                        {data.image.length < 5 && data.image.slice(0, 3).map((img, idx) => (
                            <img key={idx} src={img} alt={`Post image ${idx + 1}`} className={`w-full h-full max-h-[430px] rounded-10 object-cover cursor-pointer
                              ${numImage === 3 && idx === 0 ? "row-span-2" : ""}
                              ${numImage > 1 ? "rounded-[7px] " : ""}
                              ${numImage === 5 && idx < 2 ? "row-span-1" : ""}`
                            } />
                        ))}
                    </div>
                </div>
                <div className='md:w-2/5 md:px-5 flex md:flex-col flex-row '>
                    <div className='justify-end md:flex hidden'><MdIcons.MdMoreHoriz className='text-[#979797] text-xl cursor-pointer' /></div>
                    <div className='flex flex-col gap-4 px-5 md:mt-0 mt-4'>
                        <div className='flex gap-3 items-center'>
                            <FaMapMarkedAlt className='md:w-[35px] md:h-[28px] w-[25px] h-[18px] text-red-500 text-[27px]'></FaMapMarkedAlt>
                            <p className='nunito-text font-bold md:text-[15px] text-[13px]'>Lủng Cú, Hà Giang </p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <FaCalendarDay className='md:w-[35px] md:h-[28px] w-[25px] h-[18px] text-[#4979d1] text-[27px]'></FaCalendarDay>
                            <p className='nunito-text font-bold md:text-[15px] text-[13px] '>13/7 - 20/7/2024</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <FaMoneyCheckAlt className='md:w-[35px] md:h-[28px] w-[25px] h-[18px] text-[#96c362] text-[27px]'></FaMoneyCheckAlt>
                            <p className='nunito-text font-bold md:text-[15px] text-[13px] text-[#e48055]'>1.500.000 đ</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <MdGroups className='md:w-[35px] md:h-[28px] w-[25px] h-[18px] text-[#4979d1] text-[27px]'></MdGroups>
                            <p className='flex gap-1 nunito-text font-medium md:text-[15px] text-[13px] '>
                                <p>3</p>
                                <p>thành viên</p>
                            </p>
                        </div>
                    </div>
                    <div className='w-full md:h-[400px] mt-3'>
                        <img src={imgmap} alt="" className='md:w-full md:h-full w-full h-[250px] object-cover' />
                    </div>
                </div>
            </div>
            {/* <hr className='my-2 text-[#979797]' /> */}
            <div className='flex py-3 w-full justify-center gap-14'>
                <div className='flex gap-2 items-center w-[100px]'>
                    {isLiked ?
                        <AiFillLike
                            onClick={handleUnLiked}
                            className="text-[#0566ff] text-[20px] cursor-pointer"></AiFillLike>
                        : <AiOutlineLike
                            onClick={handleLikes}
                            className="text-[#3a3a3a] text-[20px] cursor-pointer"></AiOutlineLike>}
                    <span className={`${isLiked ? 'text-[#0566ff]' : 'text-[#3a3a3a]'}`}>{numLikes || 0}</span>
                </div>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <FaRegComment className='text-[#3a3a3a]' />
                    <span className='text-[#3a3a3a]'>{data.numComments || 0}</span>
                </div>
            </div>
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