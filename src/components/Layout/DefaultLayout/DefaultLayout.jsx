import PropTypes from 'prop-types';
import Header from "../../Layout/components/Header"
import Sidebar from "../../Layout/components/Sidebar"
function DefaultLayout({ children }) {
    return (
        <div className="bg-white">
            <Header></Header>
            <div className="mx-6 bg-bgGray ">
                <div className='flex gap-x-3 w-full'>
                    <Sidebar></Sidebar>
                    <div className="w-4/5">{children}</div>
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;