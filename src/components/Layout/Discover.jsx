import React from 'react';
import background from '../../images/HoiAn1.jpg'
import plane from '../../images/plane.png'
import plane2 from '../../images/plane2.png'
import planegif from '../../images/planegif.gif'

function Discover() {
  return (
    <div>
        <section className='bg-lightGray relative'>
            <div className='max-w-[1400px] mx-auto flex justify-between py-8 px-3 relative'>
                <div className='lg:-ml-52 lg:block-hidden'>
                    <img src={background} alt="" />
                </div>
                <div className='flex flex-col items-center lg:w-1/2 relative z-10'>
                    <img src={background} alt="" />
                    <img src={background} alt="" />
                    <p className='text-gray text-lg lg:w-4/5 py-8'>
                        {""}
                        Conveniently customize proactive web 

                    </p>
                    <div className='flex flex-1 gap-5 w-full'>
                        <button className='bg-primary rounded transition-bg shadow h-16 lg:px-10 lg:w-auto w-full whitespace-pre outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base hover:border hover:border-primary'>
                            Explore
                        </button>
                    </div>
                </div>
                <img src={plane} alt="" className='lg:block hidden absolute bottom-0 right-16' />
                <img src={plane2} alt="" className='lg:block hidden absolute top-0 left-0'/>
                <img src={planegif} alt="" className='lg:block hidden absolute bottom-0 right-0' />
            </div>
        </section>
    </div>
  );
}

export default Discover;