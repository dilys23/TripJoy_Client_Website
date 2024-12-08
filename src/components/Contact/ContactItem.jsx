import { AiFillMessage } from 'react-icons/ai';
import avatarDefault from "../../assets/images/avatarDefault.png"
function ContactItem({ contact }) {
    return (
        <div className='flex flex-col items-center hover:bg-[#F2F2F2] '>
            <div className="flex justify-between items-center w-full lg:h-[66px] h-[50px] lg:px-4 px-2 py-5">
                <div className='flex gap-3 items-center'>
                    <div className='relative'>
                        <img src={contact?.avatar || avatarDefault} alt="" className='lg:w-[40px] lg:h-[40px] w-[28px] h-[28px] rounded-90 cursor-pointer' />
                        {contact.state && <div className='absolute right-1 bottom-[-2px] rounded-full bg-[#3fbb46] w-[12px] h-[12px]'></div>}
                    </div>
                    <div className='font-medium cursor-pointer lg:text-[14px] text-[10px]'>{contact.userName}</div>

                </div>
                <AiFillMessage className='lg:w-[23px] lg:h-[34px] w-[15px] h-[20px] text-[#29b1eb] cursor-pointer' />
            </div>
            <hr className='border border-[#EFEFEF] w-[90%] ' />
        </div>
    );
}

export default ContactItem;