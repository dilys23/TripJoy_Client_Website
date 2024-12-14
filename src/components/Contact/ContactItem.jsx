import { AiFillMessage } from 'react-icons/ai';
import avatarDefault from "../../assets/images/avatarDefault.png"
import { useEffect, useState } from 'react';
import { getUserById } from '../../services/getUserById';
function ContactItem({ contact }) {
    const [user, setUser] = useState();
    const fetchUser = async () => {
        try {
            const data = await getUserById(contact);
            setUser(data.user);
            // console.log(data.user);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div className='flex flex-col items-center hover:bg-[#F2F2F2] '>
            <div className="flex justify-between items-center w-full lg:h-[66px] h-[50px] lg:px-4 px-2 py-5">
                <div className='flex gap-3 items-center'>
                    <div className='relative'>
                        <img src={user?.avatar || avatarDefault} alt="" className='lg:w-[40px] lg:h-[40px] w-[28px] h-[28px] rounded-90 cursor-pointer' />

                        <div className='absolute right-1 bottom-[-2px] rounded-full bg-white w-[12px] h-[12px] flex justify-center items-center'>
                            <div className='w-[10px] h-[11px] rounded-full bg-[#3fbb46] '></div>
                        </div>
                    </div>
                    <div className='font-medium cursor-pointer lg:text-[14px] text-[10px]'>{user?.userName}</div>

                </div>
                <AiFillMessage className='lg:w-[23px] lg:h-[34px] w-[15px] h-[20px] text-[#29b1eb] cursor-pointer' />
            </div>
            <hr className='border border-[#EFEFEF] w-[90%] ' />
        </div>
    );
}

export default ContactItem;