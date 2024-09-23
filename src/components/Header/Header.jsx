import * as MdIcons from 'react-icons/md';
import logo from '../../../../images/logo.png';
import ava from '../../../../images/ava.jpg'
function Header() {
    return (
        <div className="flex justify-between px-8 py-2">
            <div className='flex gap-x-2 cursor-pointer'>
                <img src={logo} alt="logo" className="w-[35px] h-[34px] sm:w-[45px] sm:h-[44px]" />
                <div className="w-[166px] h-[35px] flex">
                    <span
                        className="text-[28px] sm:text[38px] font-normal leading-[37.63px] tracking-[3.36px]"
                        style={{ color: '#13c892', fontFamily: 'Leckerli One, cursive' }}
                    >
                        Trip
                    </span>
                    <span
                        className="text-[28px] sm:text[38px] font-normal leading-[37.63px] tracking-[3.36px]"
                        style={{ color: '#ff7224', fontFamily: 'Leckerli One, cursive' }}
                    >
                        Joy
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-x-3'>
                <MdIcons.MdNotifications className='text-iconGray w-[23.74px] h-[30px] sm:w-[30.74px] sm:h-[40px] cursor-pointer' />
                <div className='flex items-center gap-x-1.5 cursor-pointer'>
                    <img src={ava} alt="Avatar-user" className='w-[42px] h-[41px] sm:w-[52px] sm:h-[51px] rounded-90' />
                    <h3 className='sm:block font-medium text-base'>Bach Duong</h3>
                    <MdIcons.MdExpandMore className='text-iconGray w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]' />
                </div>
            </div>
        </div>
    );
}

export default Header;