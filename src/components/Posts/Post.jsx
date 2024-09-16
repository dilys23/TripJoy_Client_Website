import PropTypes from 'prop-types';
import * as MdIcons from "react-icons/md";
function Post({ data }) {
    // const images = { data.image }
    console.log(data.image.length)
    return (
        <div className="w-full bg-white mb-6 sm:h-[453px] h-[300px] rounded-20 p-5">
            <div className="flex justify-between ">
                <div className="flex gap-3 text-center cursor-pointer ">
                    <img src={data.avatar} alt="" className='rounded-90 w-[50px] h-[50px]' />
                    <div className='block text-start'>
                        <div className='font-bold md:text-base text-[13px]'>{data.name}</div>
                        <div className='text-[##979797] text-xs italic md:text-base text-[12px]'>{data.time}</div>
                    </div>
                </div>
                <MdIcons.MdMoreHoriz className='text-[#979797] text-xl cursor-pointer' />
            </div>
            <div className='mt-4 px-2 whitespace-pre-line md:text-base text-[13px]'>
                {data.descrip}
            </div>

            <div className='grid grid-cols-2 w-full gap-2 mt-3'>
                {data.image.map((img, idx) => (
                    <img key={idx} src={img} alt={`Post image ${idx + 1}`} className="w-full h-full rounded-10 object-cover" />
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