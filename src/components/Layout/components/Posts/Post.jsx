import ava from '../../../../images/ava.jpg'
import * as MdIcons from "react-icons/md";
function Post() {
    return (
        <div className="w-full bg-white mb-6 sm:h-[453px] h-[300px] rounded-20 p-5">
            <div className="flex justify-between ">
                <div className="flex gap-3 text-center cursor-pointer ">
                    <img src={ava} alt="" className='rounded-90 w-[50px] h-[50px]' />
                    <div className='block text-center'>
                        <div className='font-bold text-base'>Le Nguyen</div>
                        <div className='text-[##979797] text-xs italic'>12 tieng truoc</div>
                    </div>
                </div>
                <MdIcons.MdMoreHoriz className='text-[#979797] text-xl cursor-pointer' />
            </div>
            <div className='mt-4 px-2 whitespace-pre-line'>Măng Đen hôm đó nhiều mây.
                Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt.
                Và nó tuyệt với mìn thật.
            </div>
            <div>

            </div>
        </div>
    );
}

export default Post;