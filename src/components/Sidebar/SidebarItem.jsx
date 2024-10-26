import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function SidebarItem({ index, isActive, onClick, icon, title, to, backIcon, showSidebar }) {
    return (
        <div className='relative'>
            <NavLink to={to} className={`flex items-center w-full sm:h-[64px] h-[45px]  gap-3 pl-[2px] ${index != 5 ? 'border-bottom' : ''} ${isActive === index ? 'bg-bgGray  transition duration-300 ease-in-out' : ''}`}
                onClick={() => onClick(index)}>
                <span className={`w-[3px] h-full rounded-[26px] ${isActive === index ? 'bg-[#007AFF]  transition duration-300 ease-in-out' : 'bg-transparent'}`}></span>
                {icon}
                <span className={`text-center lg:text-base text-[13px] ${showSidebar ? "block" : "hidden"} md:justify-normal justify-center`}>{title}</span>
            </NavLink>
            {isActive === index && <button className='absolute right-3 top-6'>{backIcon}</button>}
        </div>
    );
}
SidebarItem.propTypes = {
    index: PropTypes.number.isRequired,
    isActive: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string
};


export default SidebarItem;