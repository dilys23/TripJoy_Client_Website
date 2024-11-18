import PropTypes from 'prop-types';
import { AiFillMessage } from 'react-icons/ai';
function ContactItem({ contact }) {
    return (
        <div className='flex flex-col items-center hover:bg-[#F2F2F2] '>
            <div className="flex justify-between items-center w-full lg:h-[66px] h-[50px] px-4 py-5">
                <div className='flex gap-3 items-center'>
                    <img src={contact.ava} alt="" className='lg:w-[40px] lg:h-[40px] w-[28px] h-[28px] rounded-90 cursor-pointer' />
                    <div className='font-medium cursor-pointer lg:text-[14px] text-[12px]'>{contact.name}</div>
                </div>
                <AiFillMessage className='lg:w-[23px] lg:h-[34px] w-[18px] h-[25px] text-[#29b1eb] cursor-pointer' />
            </div>
            <hr className='border border-[#EFEFEF] w-[90%] ' />
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