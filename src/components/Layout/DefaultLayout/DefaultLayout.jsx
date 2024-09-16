import PropTypes from 'prop-types';
import Header from "../../Layout/components/Header"
import Sidebar from "../../Layout/components/Sidebar"
function DefaultLayout({ children }) {
    return (
        <div className="bg-white">
            <Header></Header>
            <div className="mx-6 bg-bgGray ">
                <div className='flex md:gap-x-15 lg:gap-x-28 gap-x-0 w-full'>
                    <Sidebar></Sidebar>
                    <div className="w-5/6">{children}</div>
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;