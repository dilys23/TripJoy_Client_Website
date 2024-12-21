
import PropTypes from 'prop-types';
import AvatarDefault from '../Avatar/AvatarDefault';
import { useNavigate } from 'react-router-dom';
function FriendItem({ info, onAcceptRequest, onDeclineRequest }) {
    const navigate = useNavigate();
    console.log(info)
    const handleToProfile = () => {
        navigate(`/profile/${info.id}`);
        window.location.reload();
    }
    return (
        <div className="w-full h-[100px] bg-white rounded-20 my-3 px-1   border border-[#CCD0D5]">
            <div onClick={handleToProfile} className="flex gap-3 items-center px-2 py-1 ">
                <AvatarDefault src={null} alt="" className="lg:w-[40px] lg:h-[40px] w-[28px] h-[28px] "></AvatarDefault>
                <div>
                    <span className="font-bold  lg:text-base md:text-[13px] cursor-pointer">{info.userName}</span>
                    <span className=' lg:text-base md:text-[13px]'> đã gửi yêu cầu kết bạn</span>
                </div>
            </div>
            <div className='flex gap-3 justify-center px-2'>
                <button
                    onClick={onAcceptRequest}
                    className='bg-[#FF8744] text-white rounded-20 lg:w-[111px] lg:h-[30px] w-[80px] h-[25px] lg:text-base text-[13px] font-bold'>Chấp nhận</button>
                <button
                    onClick={onDeclineRequest}
                    className='border border-[#CCD0D5] text-[#0F3E4A] rounded-20 lg:w-[93px] lg:h-[30px] w-[80px] h-[25px] lg:text-base text-[13px] font-bold'>Xoá</button>
            </div>
        </div>
    );
}
FriendItem.propTypes = {

};

export default FriendItem;