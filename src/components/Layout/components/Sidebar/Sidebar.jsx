import { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem';
import config from '../../../config';

function Sidebar() {
    const [isActive, setIsActive] = useState(0)
    const handleClick = (index) => {
        setIsActive(index);
    };

    return (
        <nav className='bg-white rounded-lg w-1/5 h-[412px] m-3'>
            <SidebarItem
                index={0}
                isActive={isActive}
                onClick={handleClick}
                to={config.routes.network}
                icon={<MdIcons.MdHomeFilled className='w-[38px] h-[36px] text-iconGray' />}
                title='Trang chủ'
            ></SidebarItem>
            <SidebarItem
                index={1}
                isActive={isActive}
                onClick={handleClick}
                to={config.routes.plan}
                icon={<MdIcons.MdCalendarMonth className='w-[38px] h-[36px] text-iconGray' />}
                title='Lịch trình'
            ></SidebarItem>

        </nav>
    );
}

export default Sidebar;