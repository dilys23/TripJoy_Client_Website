import PropTypes from 'prop-types';
function FriendItem({ info }) {
    return (
        <div className="w-full h-[100px] bg-white rounded-20 my-3 ">
            <div className="flex gap-3 items-center px-2 py-1 ">
                <img src={info.ava} alt="" className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-90 cursor-pointer" />
                <div>
                    <span className="font-bold  md:text-base text-[13px] cursor-pointer">{info.name}</span>
                    <span className=' md:text-base text-[13px]'> đã gửi yêu cầu kết bạn</span>
                </div>
            </div>
            <div className='flex gap-3 justify-center'>
                <button className='bg-[#007AFF] text-white rounded-20 w-[111px] h-[33px] font-bold'>Chấp nhận</button>
                <button className='border border-[#CCD0D5] text-[#0F3E4A] rounded-20 w-[93px] h-[33px] font-bold'>Xoá</button>
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