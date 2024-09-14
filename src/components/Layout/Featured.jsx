import React, { useState } from 'react';
import { FaPlaneDeparture } from "react-icons/fa";
import { FaCar, FaShip, FaHotel } from "react-icons/fa6";
// import { Container } from './styles';
import Danang from "../../images/Danang.jpg";
import HaNoi from "../../images/HaNoi.jpg";
import HaGiang from "../../images/HaGiang.jpg";

function Fetured() {
    const [active, setActive] = useState(false);
    const Card = ({ image, country, amount, rows }) => {
        const [divColor, setDivColor] = useState(
            {
                bgColor: "",
                textColor: "",
            }
        );
        return (
            <div className='relative overflow-hidden my-0 mx-auto rounded-2x1'
                style={{ gridRow: `span${rows} / span${rows}` }}
                onMouseEnter={() => setDivColor({ bgColor: "#17A1FA", textColor: "white" })}
                onMouseLeave={() => setDivColor({ bgColor: 'white', textColor: "#17A1FA" })}>
                <div className='bg-white text-primary h-12 px-4 rounded-md absolute top-4 right-4 z-0 font-bold flex flex-col items-center justify-center text-lg'
                    style={{ backgroundColor: `${divColor.bgColor}`, color: `${divColor.textColor}` }}
                >Khám phá</div>
                <img src={image} alt="" className='h-full w-full rounded-2x1 hoverImg' />
                <div className='absolute bottom-4 left-4'>
                    <h2 className='text-white text-4xl font-bold'>{country}</h2>
                    <p className='text-white'>
                        {amount}
                    </p>
                </div>

            </div>
        )

    };
    return (
        <div className='max-w-[1400px] mx-auto relative mt-14'>
            <div className='w-full h-full'>
                <p className='xl:text-[30rem] lg:text-[20rem] absolute top-0 left-0 w-full text-center z-[-1] text-slate-300 font-semibold opacity-15'>
                    Travel
                </p>
            </div>
            <div className='px-3 lg:mt-0 mt-12'>
                <div className='bg-white shadow-xl py-10 relative -top-16 z-0'>
                    <div className='flex lg:gap-x-4 gap-x-2 absolute -top-14'>
                        <button onClick={() => setActive('Hotel')} className={`rounded-sm flex gap-x-2 items-center justify-center 
                            focus:outline-none shadow-sm border-none h-14 lg:w-40 px-4 text-base cursor-pointer ${active === "Hotel" ? "bg-primary text-white" : "bg-white"}`}>
                            <FaHotel size={20} className='lg:block hidden' />
                            Nơi ở 
                        </button>
                        <button onClick={() => setActive('Flight')} className={`rounded-sm flex gap-x-2 items-center justify-center 
                            focus:outline-none shadow-sm border-none h-14 lg:w-40 px-4 text-base cursor-pointer ${active === "Flight" ? "bg-primary text-white" : "bg-white"}`}>
                            <FaPlaneDeparture size={20} className='lg:block hidden' />
                            Phương tiện
                        </button>
                        {/* <button onClick={() => setActive('Car')} className={`rounded-sm flex gap-x-2 items-center justify-center 
                            focus:outline-none shadow-sm border-none h-14 lg:w-40 px-4 text-base cursor-pointer ${active === "Car" ? "bg-primary text-white" : "bg-white"}`}>
                            <FaCar size={20} className='lg:block hidden' />
                            Hotel
                        </button> */}
                        {/* <button onClick={() => setActive('Ship')} className={`rounded-sm flex gap-x-2 items-center justify-center 
                            focus:outline-none shadow-sm border-none h-14 lg:w-40 px-4 text-base cursor-pointer ${active === "Ship" ? "bg-primary text-white" : "bg-white"}`}>
                            <FaShip size={20} className='lg:block hidden' />
                            Hotel
                        </button> */}
                    </div>
                    <div className='flex flex-wrap items-end justify-between px-8 gap-4 '>
                        <span className='flex flex-col gap-4'>
                            <p className='font-semibold text-lg '>Địa điểm </p>
                            <input type="text" placeholder='VietNam' className='bg-white text-gray shadow border-none outline-none h-14 w-50 px-3 text-left text-base ' />
                        </span>
                        <span className='flex flex-col gap-4'>
                            <p className='font-semibold text-lg '>Thời gian bắt đầu</p>
                            <input type="text" placeholder='23/12/2024' className='bg-white text-gray shadow border-none outline-none h-14 w-50 px-4 text-left text-base ' />
                        </span>
                        <span className='flex flex-col gap-4'>
                            <p className='font-semibold text-lg '>Thời gain kết thúc</p>
                            <input type="text" placeholder='23/12/2024' className='bg-white text-gray shadow border-none outline-none h-14 w-50 px-4 text-left text-base ' />
                        </span>
                        <span className='flex flex-col gap-4'>
                            <p className='font-semibold text-lg '>Kinh phí</p>
                            <input type="text" placeholder='1.000.000đ' className='bg-white text-gray shadow border-none outline-none h-14 w-50 px-4 text-left text-base ' />
                        </span>
                        <span className='flex flex-col gap-4'>
                            <button className='bg-primary rounded transition-bg shadow h-14 px-10 outline-none text-white hover:bg-white hover:text-primary cursor'>Book Now</button>
                        </span>
                    </div>
                </div>
                <div>
                    <span className='flex flex-col items-center my-20'>
                        <p className='text-primary font-bold capitalize tracking-[0.15em]'>Featured Tours</p>
                        <h2 className='text-4xl text-center font-bold capitalize my-4'>Khám phá những địa điểm mới lạ </h2>
                    </span>
                    <div className='flex lg:flex-1 lg:flex-row flex-col gap-8 my-12'>
                        <Card amount="Đà Nẵng" country='Cầu Vàng' image={Danang} row="2" />
                        <div className='flex flex-col gap-5  '>
                            <Card amount="Hà Nội" country='Hồ Gươm' image={HaNoi} row="1" />
                            <Card amount="Đà Nẵng" country='Cầu Vàng' image={Danang} row="1" />
                        </div>
                        <Card amount="Hà Giang" country='Tà Xùa' image={HaGiang} row="2" />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Fetured;