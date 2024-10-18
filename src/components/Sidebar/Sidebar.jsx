import { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem';
import config from '../../config';
import TripInvites from '../TripInvite/TripInvites';

function Sidebar({ showSidebar, toggleSidebar }) {
    const [isActive, setIsActive] = useState(0)

    const handleClick = (index) => {
        setIsActive(index);
    };
    console.log("helo", showSidebar);

    return (
        <div
            onMouseDown={toggleSidebar}
            className={`fixed ${showSidebar ? "w-[257px] " : "w-[60px]"} h-[86vh] hidden md:block transition-width`}>
            <nav className={`bg-white rounded-lg ${showSidebar ? "lg:h-[390px] h-[270px]" : ""}  items-center py-1`}>
                <SidebarItem
                    index={0}
                    isActive={isActive}
                    onClick={handleClick}
                    showSidebar={showSidebar}
                    to={config.routes.network}
                    icon={<MdIcons.MdHomeFilled className=' w-[28px] h-[24px] text-iconGray' />}
                    // backIcon={<MdIcons.MdChevronLeft className="w-6 h-6" />}
                    title='Trang chủ'
                ></SidebarItem>
                <SidebarItem
                    index={1}
                    isActive={isActive}
                    onClick={handleClick}
                    showSidebar={showSidebar}
                    to={config.routes.plan}
                    icon={<MdIcons.MdCalendarMonth className=' w-[28px] h-[24px] text-iconGray' />}
                    title='Lịch trình'
                ></SidebarItem>
                <SidebarItem
                    index={2}
                    isActive={isActive}
                    onClick={handleClick}
                    showSidebar={showSidebar}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlinePeopleAlt className='] w-[28px] h-[24px] text-iconGray' />}
                    title='Bạn bè'
                ></SidebarItem>
                <SidebarItem
                    index={3}
                    isActive={isActive}
                    onClick={handleClick}
                    showSidebar={showSidebar}
                    to={config.routes.plan}
                    icon={<MdIcons.MdGroups className=' w-[28px] h-[24px] text-iconGray' />}
                    title='Nhóm'
                ></SidebarItem>
                <SidebarItem
                    index={4}
                    isActive={isActive}
                    showSidebar={showSidebar}
                    onClick={handleClick}
                    to={config.routes.plan}
                    icon={<MdIcons.MdOutlinePerson className=' w-[28px] h-[24px] text-iconGray' />}

                    title='Tài khoản'
                ></SidebarItem>
                <SidebarItem
                    index={5}
                    isActive={isActive}
                    onClick={handleClick}
                    to={config.routes.plan}
                    showSidebar={showSidebar}
                    icon={<MdIcons.MdOutlineSettings className=' w-[28px] h-[24px] text-iconGray' />}
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