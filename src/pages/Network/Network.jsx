import ava from '../../images/ava.jpg'
import * as MdIcons from "react-icons/fa";
import Posts from '../../components/Layout/components/Posts';
import FriendRequest from '../../components/Layout/components/FriendRequest';
function Network() {
    return (
        <div className="flex w-full px-3 my-3">
            <div className=" w-3/4">
                <div className="bg-white w-full flex items-center px-4 h-[71px] justify-between rounded-20">
                    <div className='flex gap-3 items-center cursor-pointer'>
                        <img src={ava} alt="" className='sm:w-[52px] sm:h-[51px] w-[42px] h-[41px] rounded-90' />
                        <span className='text-[11px] sm:text-[14px] text-[#979797]'>Có gì mới không? Bach Duong</span>
                    </div>
                    <div className='flex cursor-pointer border-none bg-[#007AFF] sm:w-[105px] sm:h-[31px] w-[40px] h-[30px] gap-3 pl-2 items-center  rounded-20 '>
                        <MdIcons.FaLink className='text-white text-sm' />
                        <span className='text-white sm:block hidden'>Chia sẻ</span>
                    </div>
                </div>
                <Posts></Posts>
            </div>
            <div className="w-1/4 px-6">
                <FriendRequest></FriendRequest>

            </div>
        </div>
    );
}

export default Network;