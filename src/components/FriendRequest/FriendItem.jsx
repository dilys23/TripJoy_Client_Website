import PropTypes from 'prop-types';
function FriendItem({ info }) {
    return (
        <div className="w-full h-[100px] bg-white rounded-20 my-3 px-2 ">
            <div className="flex gap-3 items-center px-2 py-1 ">
                <img src={info.ava} alt="" className="lg:w-[40px] lg:h-[40px] w-[28px] h-[28px] rounded-90 cursor-pointer" />
                <div>
                    <span className="font-bold  lg:text-base md:text-[13px] cursor-pointer">{info.name}</span>
                    <span className=' lg:text-base md:text-[13px]'> đã gửi yêu cầu kết bạn</span>
                </div>
            </div>
            <div className='flex gap-3 justify-center'>
                <button className='bg-[#007AFF] text-white rounded-20 lg:w-[111px] lg:h-[33px] w-[80px] h-[28px] lg:text-base text-[13px] font-bold'>Chấp nhận</button>
                <button className='border border-[#CCD0D5] text-[#0F3E4A] rounded-20 lg:w-[93px] lg:h-[33px] w-[80px] h-[28px] lg:text-base text-[13px] font-bold'>Xoá</button>
            </div>
        </div>
    );
}
FriendItem.propTypes = {
    info: PropTypes.shape({
        ava: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

export default FriendItem;