import PropTypes from 'prop-types';
import { useState } from 'react';
import * as MdIcons from "react-icons/md";
function Post({ data }) {
    const numImage = data.image.length
    console.log(numImage)

    // console.log(data.descrip.length)
    const truncatedText = data.descrip.length > 140
        ? `${data.descrip.slice(0, 140)}...`
        : data.descrip;
    return (
        <div className="w-full bg-white  lg:h-[600px] rounded-20 pt-5">
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
                {data.descrip.length > 140 && (
                    <button className='text-[#161823b0] md:[13px] text-[13px] italic'>...xem tiếp</button>
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
                            <img src={data.image[0]} alt="" className="w-full h-full rounded-10 object-cover" />
                            <img src={data.image[1]} alt="" className="w-full h-full rounded-10 object-cover" />
                        </div>
                        <div className="grid grid-cols-3 gap-1 ">
                            <img src={data.image[2]} alt="" className="w-full h-full rounded-10 object-cover" />
                            <img src={data.image[3]} alt="" className="w-full h-full rounded-10 object-cover" />
                            <img src={data.image[4]} alt="" className="w-full h-full rounded-10 object-cover" />
                        </div>
                    </>)
                }

                {data.image.length < 5 && data.image.slice(0, 4).map((img, idx) => (
                    <img key={idx} src={img} alt={`Post image ${idx + 1}`} className={`w-full h-full rounded-10 object-cover 
                      ${numImage === 3 && idx === 0 ? "row-span-2" : ""}
                      ${numImage > 1 ? "rounded-[7px] " : ""}
                      ${numImage === 5 && idx < 2 ? "row-span-1" : ""}`
                    } />
                ))}
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
        image: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};
export default Post;