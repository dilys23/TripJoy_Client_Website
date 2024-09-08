import React from 'react';
import backgroundImage from '../../images/background.jpg';
// import { Container } from './styles';
import image1 from '../../images/image1.png';
import icon from '../../images/iconApple.png';
function Hero() {
  return (
    // <div className="bg-[url('../../images/background.jpg')] bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden">
    <div className="bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden " >
      {/* style={{ backgroundImage: `url(${backgroundImage})` }} */}
      <div className="lg:flex max-w-[1400px] mx-auto justify-between items-center px-3 pt-12">
        <div className='lg:w-2/5'>
          <h2 className='xl:text-[4rem] lg:text-5xl text-4xl lg:text-left text-center font-bold lg:leading-snug mb-5 '>
            {/* Khám phá những<br />  địa điểm xinh đẹp <br /> trên Việt Nam */}
            Explore beautiful place <br />
            in VietNam
          </h2>
          <p className='text-black text-lg leading-normal mb-8'>Trip planning made easy and (almost) as fun as travelling itself! </p>
          <button className='bg-[#FF7324] rounded-full transition-bg shadow h-11 lg:px-10 lg:w-auto w-full outline-none text-white hover:bg-white hover:text-black cursor-pointer text-base hover:border-r hover:border-[#FF7324] mb-12'>
            Start planning now
          </button>
          <div className='flex flex-1 gap-5 '>
            <div>

              <button className='w-32 h-[50px] bg-black rounded-[5px]  transition-bg shadow  lg:px-10 lg:w-auto outline-none text-white hover:bg-white hover:text-black cursor-pointer text-base hover:border hover:border-primary'>
                App Store
              </button>
            </div>
            <button className='w-32 h-[50px] bg-black rounded-[5px]  transition-bg shadow  lg:px-10 lg:w-auto outline-none text-white hover:bg-white hover:text-black cursor-pointer text-base hover:border hover:border-primary'>
              CH Play
            </button>
          </div>
        </div>
        <div className='lg:w-3/5 flex items-center justify-end lg:pt-0 pt-10 lg:-mr-50'>
          <img src={image1} alt="" className='w-[35rem] h-full animate-spin-slow' />
        </div>
      </div>
    </div>
  );
}

export default Hero;