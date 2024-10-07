import PropTypes from 'prop-types';
import Navbar from "../../Header/Navbar"
import Sidebar from "../../Sidebar/Sidebar"
function DefaultLayout({ children }) {
    return (
        <>
            <div className="bg-[#f5f6f7] w-full h-full">
                <Navbar></Navbar>
                <div className='flex w-full px-6 bg-[#f5f6f7] pt-5 min-h-full h-full'>
                    <Sidebar></Sidebar>
                    <div className=" lg:ml-[270px] md:ml-[160px]  w-full h-full">
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