import { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem';
import config from '../../config';
import TripInvites from '../TripInvite/TripInvites';

function Sidebar() {
    const [isActive, setIsActive] = useState(0)
    const handleClick = (index) => {
        setIsActive(index);
    };

    return (
        <div className='lg:w-[257px] md:w-[160px] w-[86px] h-full '>
            <nav className='bg-white rounded-lg sm:h-[390px] h-[270px] items-center py-1'>
                <SidebarItem
                    index={0}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.home}
                    icon={<MdIcons.MdHomeFilled className='lg:w-[35px] lg:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Trang chủ'
                ></SidebarItem>
                <SidebarItem
                    index={1}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdCalendarMonth className='lg:w-[35px] lg:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Lịch trình'
                ></SidebarItem>
                <SidebarItem
                    index={2}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlinePeopleAlt className='lg:w-[35px] lg:h-[30px]] w-[28px] h-[24px] text-iconGray' />}
                    title='Bạn bè'
                ></SidebarItem>
                <SidebarItem
                    index={3}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdGroups className='lg:w-[35px] lg:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Nhóm'
                ></SidebarItem>
                <SidebarItem
                    index={4}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlinePerson className='lg:w-[35px] lg:h-[30px] w-[28px] h-[24px] text-iconGray' />}

                    title='Tài khoản'
                ></SidebarItem>
                <SidebarItem
                    index={5}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlineSettings className='lg:w-[35px] lg:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Cài đặt'
                ></SidebarItem>
            </nav>
            <div className='mt-2'>
                <span className='lg:text-base text-[13px] text-[#AEAEAE] font-bold'>LỜI MỜI</span>
                <TripInvites></TripInvites>
            </div>
        </div>
    );
}

export default Sidebar;