import * as MdIcons from 'react-icons/md';
import logo from '../../../../images/logo.png';
import ava from '../../../../images/ava.jpg'
function Header() {
    return (
        <div className="">
            <div className='flex'>
                <img src={logo} alt="logo" className="w-[45px] h-[44px]" />
                <div className="w-[166px] h-[35px] flex">
                    <span
                        className="text-[28px] font-normal leading-[37.63px] tracking-[3.36px]"
                        style={{ color: '#13c892', fontFamily: 'Leckerli One, cursive' }}
                    >
                        Trip
                    </span>
                    <span
                        className="text-[28px] font-normal leading-[37.63px] tracking-[3.36px]"
                        style={{ color: '#ff7224', fontFamily: 'Leckerli One, cursive' }}
                    >
                        Joy
                    </span>
                </div>
            </div>
            <div className='flex'>
                <MdIcons.MdNotifications />
                <div className='flex'>
                    <img src={ava} alt="Avatar-user" className='w-[52px] h-[51px] rounded-90' />
                    <h3>Bach Duong</h3>
                </div>
            </div>
        </div>
    );
}

export default Header;