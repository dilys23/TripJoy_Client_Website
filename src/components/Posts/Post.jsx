import PropTypes from 'prop-types';
import { useState } from 'react';
import * as MdIcons from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
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
        <div className="w-full bg-white  lg:h-auto rounded-20 pt-5 mb-10">
            <div className="flex justify-between px-5 ">
                <div className="flex gap-3 text-center cursor-pointer ">
                    <img src={data.avatar} alt="" className='rounded-90 w-[50px] h-[50px]' />
                    <div className='block text-start'>
                        <div className='font-bold md:text-base text-[13px]'>{data.name}</div>
                        <div className='text-[##979797] text-xs italic md:text-base text-[12px]'>{data.time}</div>
                    </div>
                </div>
                <MdIcons.MdMoreHoriz className='text-[#979797] text-xl cursor-pointer' />
            </div>
            <div className="mt-4  whitespace-pre-line md:text-base text-[13px] px-5 " >
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
            {/* <hr className='my-2 text-[#979797]' /> */}
            <div className='flex pt-1 w-full  px-[220px] gap-14'>
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