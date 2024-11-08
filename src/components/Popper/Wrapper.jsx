import PropTypes from 'prop-types';
function Wrapper({ children }) {
    return (
        <div className="w-full min-h-[100px] rounded-lg shadow-xl bg-white mt-[-10px] flex-col flex border border-[#16182333]">
            {children}
        </div>
    );
}
Wrapper.prototype = {
    children: PropTypes.node.isRequired
}

export default Wrapper;