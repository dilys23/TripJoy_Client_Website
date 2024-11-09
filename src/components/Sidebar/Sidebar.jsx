import { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem';
import config from '../../config';
import TripInvites from '../TripInvite/TripInvites';
import { useLocation } from 'react-router-dom';

function Sidebar({ showSidebar, toggleSidebar }) {
    const [isActive, setIsActive] = useState(0)
    const location = useLocation();
    const handleClick = (index) => {
        setIsActive(index);
    };
    // console.log("helo", showSidebar);
    const getActiveIndex = () => {
        if (location.pathname === config.routes.network) setIsActive(0);
        else if (location.pathname === config.routes.plan) setIsActive(1);
        else setIsActive(0);
        // if (location.pathname === config.routes.profile) setIsActive(4);
        // return 0;
    };
    useEffect(() => {
        getActiveIndex();
    }, [location.pathname])
    return (
        <div
            className={`fixed ${showSidebar ? "w-[230px]" : "w-[60px]"} h-[86vh] transition-width ${showSidebar ? "hidden md:block" : ""} hidden md:block ${showSidebar ? "w-0 sm:w-[230px]" : "w-0 sm:w-[60px]"}`}>
            <nav className={`bg-white rounded-lg ${showSidebar ? "h-[455px]" : ""}  items-center py-1`}>
                <SidebarItem
                    index={0}
                    showSidebar={showSidebar}
                    onClick={toggleSidebar}
                    icon={!showSidebar ? <MdIcons.MdArrowForwardIos className=' w-[28px] h-[24px] text-iconGray' /> : <MdIcons.MdArrowBackIosNew className=' w-[28px] h-[24px] text-iconGray'></MdIcons.MdArrowBackIosNew>}
                    title='Thu gọn'
                ></SidebarItem>
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
                    isActive={location.pathname === config.routes.plan}
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
                    to={config.routes.profile}
                    icon={<MdIcons.MdOutlinePerson className=' w-[28px] h-[24px] text-iconGray' />}
                    title='Tài khoản'
                ></SidebarItem>
                <SidebarItem
                    index={5}
                    isActive={location.pathname === config.routes.nework}
                    onClick={handleClick}
                    to={config.routes.plan}
                    showSidebar={showSidebar}
                    icon={<MdIcons.MdOutlineSettings className=' w-[28px] h-[24px] text-iconGray' />}
                    title='Cài đặt'
                ></SidebarItem>
            </nav>
            <div className='mt-2'>
                {/* <span className='lg:text-base text-[13px] text-[#AEAEAE] font-bold'>LỜI MỜI</span>
                <TripInvites></TripInvites> */}
            </div>
        </div>
    );
}

export default Sidebar;