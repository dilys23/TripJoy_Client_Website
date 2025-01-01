import PropTypes from 'prop-types';
import Navbar from "../../Header/Navbar1"
import Sidebar from "../../Sidebar/Sidebar"
import { useState } from 'react';
import Header from '../../Header/Header';
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
                {/* <Navbar></Navbar> */}
                <Header></Header>
                <div className='flex w-full md:px-6 px-0 bg-[#f5f6f7] pt-20 min-h-screen h-full '>

                    {children}

                </div>
            </div>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;