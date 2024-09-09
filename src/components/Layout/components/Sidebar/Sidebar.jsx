import { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem';
import config from '../../../../config';

function Sidebar() {
    const [isActive, setIsActive] = useState(0)
    const handleClick = (index) => {
        setIsActive(index);
    };

    return (
        <div className='w-1/6 h-full m-3'>
            <nav className='bg-white rounded-lg sm:h-[390px] h-[270px] items-center py-1'>
                <SidebarItem
                    index={0}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.network}
                    icon={<MdIcons.MdHomeFilled className='sm:w-[35px] sm:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Trang chủ'
                ></SidebarItem>
                <SidebarItem
                    index={1}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdCalendarMonth className='sm:w-[35px] sm:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Lịch trình'
                ></SidebarItem>
                <SidebarItem
                    index={2}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlinePeopleAlt className='sm:w-[35px] sm:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Bạn bè'
                ></SidebarItem>
                <SidebarItem
                    index={3}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdGroups className='sm:w-[35px] sm:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Nhóm'
                ></SidebarItem>
                <SidebarItem
                    index={4}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlinePerson lendarMonth className='sm:w-[35px] sm:h-[30px] w-[28px] h-[24px] text-iconGray' />}
                    title='Tài khoản'
                ></SidebarItem>
                <SidebarItem
                    index={5}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlineSettings className='sm:w-[38px] sm:h-[34px] w-[28px] h-[24px] text-iconGray' />}
                    title='Cài đặt'
                ></SidebarItem>
            </nav>
            <div className='mt-2'>
                <span className='text-base text-[#AEAEAE] font-bold'>LỜI MỜI</span>
            </div>
        </div>
    );
}

export default Sidebar;