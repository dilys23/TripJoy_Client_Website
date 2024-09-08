import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function SidebarItem({ index, isActive, onClick, icon, title, to }) {
    return (
        <NavLink to={to} className={`flex items-center w-full h-[70px] gap-3 my-1 pl-[2px] border-bottom ${isActive === index} ? 'bg-bgGray' : ''}`}
            onClick={() => onClick(index)}>
            <span className={`w-[3px] h-full rounded-[26px] ${isActive === index ? 'bg-[#007AFF]' : 'bg-transparent'}`}></span>
            {icon}
            <span className='text-base text-center font-normal'>{title}</span>
        </NavLink>
    );
}
SidebarItem.propTypes = {
    index: PropTypes.number.isRequired,
    isActive: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};


export default SidebarItem;