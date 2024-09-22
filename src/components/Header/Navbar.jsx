import React, { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import logo from '../../images/logo1.png';
import Login from '../Layout/Login';
import Register from '../Layout/Register';
import * as MdIcons from 'react-icons/md';
import ava from '../../images/ava.jpg'

// import { Container } from './styles';
function Navbar() {
    const [dropdown, setDropdown] = useState(false)
    const showDropdown = () => {
        setDropdown(!dropdown);
    }
    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)
    const handleLogin = () => {
        setLogin(true);
    }
    const handleRegister = () => {
        setRegister(true);
    }
    const handleClose = () => {
        setLogin(false)
    }
    const currentUser = false

    return (
        <nav className="w-full h-24 flex flex-col justify-center items-center sticky top-0 z-20 bg-white">
            <div className="max-w-[1400px] mx-auto lg:px-3 w-full flex justify-between items-center">
                <div className={`${currentUser ? "" : "lg:w-full w-11/12 mx-auto"}  h-full flex justify-between items-center`}>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-2">
                            <img src={logo} alt="Logo" className='w-[5em]' />
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
                    </div>
                </div>
                {currentUser ? (
                    <div className='flex items-center gap-x-3'>
                        <MdIcons.MdNotifications className='text-iconGray w-[23.74px] h-[30px] sm:w-[30.74px] sm:h-[40px] cursor-pointer' />
                        <div className='flex items-center gap-x-1.5 cursor-pointer'>
                            <img src={ava} alt="Avatar-user" className='w-[42px] h-[41px] sm:w-[52px] sm:h-[51px] rounded-90' />
                            <h3 className='sm:block font-medium text-base'>Bach Duong</h3>
                            <MdIcons.MdExpandMore className='text-iconGray w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]' />
                        </div>
                    </div>
                )
                    : (
                        <ul className='flex items-center xl:gap-12 gap-x-4 max-lg:hidden'>
                            <a href="#" className='leading-normal no-underline text-black font-bold text-lg hover:text-primary w-[6em]'>Trang chủ</a>
                            <a href="#" className='leading-normal no-underline text-black font-bold text-lg hover:text-primary w-[6rem]'>Liên hệ</a>
                            <a href="#" className='leading-normal no-underline text-black font-bold text-lg hover:text-primary w-[8rem] ' onClick={handleLogin}>Đăng nhập</a>
                            {login && <Login onClose={handleClose}></Login>}
                            <button className='w-32 h-[39px] bg-[#ff7224] rounded-[20px]  shadow  px-13 outline-none hover:bg-white hover:text-primary cursor-pointer  transition-bg hover:border hover:border-primary text-white text-base font-semibold ' onClick={handleRegister}>Đăng kí</button>
                            { register && <Register onClose = {handleClose}></Register>}
                        </ul>
                    )
                }
                {
                    dropdown ? (
                        <div onClick={showDropdown} className='lg:hidden text-[22px] cursor-pointer text-black'>
                            <MdClose />
                        </div>
                    ) : (
                        <div onClick={showDropdown} className='lg:hidden text-[22px] cursor-pointer text-black'>
                            <HiMenuAlt3 />
                        </div>
                    )
                }
            </div>
            {dropdown && (
                <div className='lg:hidden w-full fixed top-24 bg-primary transition-all'>
                    <div className='w-full flex flex-col items-baseline gap-4 '>
                        <ul className='flex flex-col justify-center w-full'>
                            <a href="#" className='px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text'>Trang chủ</a>
                            <a href="">Tours</a>
                            <a href="">Pages</a>
                            <a href="">Contact</a>
                        </ul>
                    </div>
                </div>
            )}
            {
                login && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <Login onClose={handleClose} />
                    </div>
                )
            }
        </nav>
    );
}

export default Navbar;