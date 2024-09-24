import React from 'react';
import { FaBehance, FaClock, FaFacebook, FaInstagram, FaLinkedinIn, FaPhone, FaWhatsapp } from 'react-icons/fa';
import logo from '../../assets/images/logo1.png'
import { FaLocationPin } from 'react-icons/fa6';
import image1 from '../../assets/images/anh1.jpg'
import image2 from '../../assets/images/Danang.jpg'
import image3 from '../../assets/images/anh3.jpg'
import image4 from '../../assets/images/HoiAn1.jpg'
import image5 from '../../assets/images/anh5.jpg'
import image6 from '../../assets/images/HaNoi.jpg'


function Footer() {
    return (
        <footer>

            <div className='bg-white py-16'>


                <div className='max-w-[1400px] mx-auto grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 px-3'>

                    <div>
                        <div className="flex items-center gap-x-2 -mt-[17px]">
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
                        <p className='text-gray py-4 text-lg'>
                            Hãy cùng chúng tôi đơn giản hóa chuyến đi của bạn, việc quản lí các <br /> kế hoạch sẽ không còn là vấn đề <br />khó khăn đối với bạn!
                        </p>
                        <h5 className='font-semibold text-2xl py-4'>Theo dõi chúng tôi </h5>
                        <span className='flex items-center gap-4 px-4'>
                            <FaFacebook size={20} className='hover:text-primary cursor-pointer' />
                            <FaBehance size={20} className='hover:text-primary cursor-pointer' />
                            <FaInstagram size={20} className='hover:text-primary cursor-pointer' />
                            <FaWhatsapp size={20} className='hover:text-primary cursor-pointer' />
                            <FaLinkedinIn size={20} className='hover:text-primary cursor-pointer' />


                        </span>
                    </div>
                    <div>
                        <h5 className='font-semibold text-2xl pb-5'>Tính năng</h5>
                        <ul>
                            <li className='hover:text-primary text-lg leading-8 cursor-pointer'>Lên kế hoạch</li>
                            <li className='hover:text-primary text-lg leading-8 cursor-pointer'>Chia sẻ hành trình </li>
                            <li className='hover:text-primary text-lg leading-8 cursor-pointer'> Tính toán chi phí</li>
                            <li className='hover:text-primary text-lg leading-8 cursor-pointer'>Theo dõi thành viên</li>
                            <li className='hover:text-primary text-lg leading-8 cursor-pointer'>Kết bạn muôn nơi</li>


                        </ul>
                    </div>
                    <div >
                        <h5 className='font-semibold text-2xl pb-8'>Liên lạc</h5>
                        <ul>
                            <span className='text-gray flex items-center pb-2 gap-2 lg:w-4/5'>
                                <FaPhone size={20} />
                                <li> 0768816381</li>
                            </span>
                            <span className='text-gray flex items-center pb-2 gap-2 lg:w-4/5'>
                                <FaClock size={20} />
                                <li> Mon-Fri 09:00-18:00 (except public holidays)</li>
                            </span>
                            <span className='text-gray flex items-center pb-2 gap-2 lg:w-4/5'>
                                <FaLocationPin size={20} />
                                <li> 100 Nguyễn Lương Bằng TP Đà Nẵng</li>
                            </span>
                        </ul>
                    </div>
                    <div>
                        <h5 className='font-semibold text-2xl pb-8'>
                            Tham quan
                        </h5>
                        <div className='grid grid-cols-3 gap-2'>
                            <div className='overflow-hidden my-0 mx-auto rounded-lg w-full'>
                                <img src={image1} alt="" className='rounded-lg w-[90px] h-[90px] box-border hoverImg' />
                            </div>
                            <div className='overflow-hidden my-0 mx-auto rounded-lg w-full'>
                                <img src={image2} alt="" className='rounded-lg w-[90px] h-[90px] box-border hoverImg' />
                            </div>
                            <div className='overflow-hidden my-0 mx-auto rounded-lg w-full'>
                                <img src={image3} alt="" className='rounded-lg w-[90px] h-[90px] box-border hoverImg' />
                            </div>
                            <div className='overflow-hidden my-0 mx-auto rounded-lg w-full'>
                                <img src={image4} alt="" className='rounded-lg w-[90px] h-[90px] box-border hoverImg' />
                            </div>
                            <div className='overflow-hidden my-0 mx-auto rounded-lg w-full'>
                                <img src={image5} alt="" className='rounded-lg w-[90px] h-[90px] box-border hoverImg' />
                            </div>
                            <div className='overflow-hidden my-0 mx-auto rounded-lg w-full'>
                                <img src={image6} alt="" className='rounded-lg w-[90px] h-[90px] box-border hoverImg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-lightGray py-10 flex items-center text-center justify-center'>
                <p className='px-3'>
                    © Copyright 2024 TripJoy. Dilys All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;