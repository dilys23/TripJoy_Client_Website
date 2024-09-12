import PropTypes from 'prop-types';
import * as MdIcon from "react-icons/md";
function ContactItem({ contact }) {
    return (
        <div className='flex flex-col items-center hover:bg-[#F2F2F2] '>
            <div className="flex justify-between w-full h-[66px] px-4 py-5">
                <div className='flex gap-3 items-center'>
                    <img src={contact.ava} alt="" className='w-[40px] h-[40px] rounded-90 cursor-pointer' />
                    <div className='font-bold cursor-pointer md:text-base text-[13px]'>{contact.name}</div>
                </div>
                <MdIcon.MdMoreHoriz className='w-[23px] h-[34px] text-[#AEAEAE] cursor-pointer' />
            </div>
            <hr className='border border-[#EFEFEF] w-[90%]' />
        </div>
    );
}
ContactItem.propTypes = {
    contact: PropTypes.shape({
        ava: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};
export default ContactItem;