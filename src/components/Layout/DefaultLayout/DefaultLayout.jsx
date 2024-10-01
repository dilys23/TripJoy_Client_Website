import PropTypes from 'prop-types';
import Navbar from "../../Header/Navbar"
import Sidebar from "../../Sidebar/Sidebar"
function DefaultLayout({ children }) {
    return (
        <>
            <div className="bg-[#f5f6f7] w-full">
                <Navbar></Navbar>
                <div className='flex md:gap-x-15 lg:gap-x-[40px] gap-x-15 w-full px-6 bg-[#f5f6f7] pt-5'>
                    <Sidebar></Sidebar>
                    <div className=" lg:w-[calc(100%-257px)] md:w-[calc(100%-160px)] w-[calc(100%-86px)]">
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