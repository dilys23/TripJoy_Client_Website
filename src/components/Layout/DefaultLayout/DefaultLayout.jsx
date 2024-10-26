import PropTypes from 'prop-types';
import Navbar from "../../Header/Navbar"
import Sidebar from "../../Sidebar/Sidebar"
import { useState } from 'react';
function DefaultLayout({ children }) {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const isSmOrLarger = () => {
        return window.innerWidth >= 640;
    };
    return (
        <>
            <div className="bg-[#f5f6f7] w-full h-full">
                <Navbar></Navbar>
                <div className='flex w-full md:px-6 px-0 bg-[#f5f6f7] pt-5 min-h-full h-full'>
                    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
                    <div className={`${showSidebar ? 'sm:ml-[270px]' : 'sm:ml-[70px]'}  h-full bg-[#f5f6f7] 
                    `}
                        style={isSmOrLarger() ? { width: `calc(100% - ${showSidebar ? '270px' : '70px'})`, minWidth: '0' } : { width: '100%' }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;