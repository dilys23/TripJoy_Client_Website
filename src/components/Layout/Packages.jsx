
import React from 'react';
import { HiStar } from 'react-icons/hi';
import Danang from "../../images/Danang.jpg";
import package1 from "../../images/package1.png";

import package2 from "../../images/package2.png";
import package3 from "../../images/package3.png";
import package4 from "../../images/package4.png";
import package5 from "../../images/package5.png";
function Packages() {
    const Card = ({ image, text1, text2  }) => {
        return (
            <div>
                <div className='overflow-hidden my-0 mx-auto rounded-2xl'>
                    <img src={image} alt="" className='rounded-2xl w-[410px] h-[240px] mx-auto  ' />
                </div>
                <h5 className='text-2xl py-4 font-semibold text-center '>{text1}</h5>
                <p className=' text-center'> {text2}</p>
                {/* <span className='flex items-center justify-between'>
                    <div className='bg-white text-gray shadow rounded-sm w-16 p-2 flex items-center gap-1'>
                        <HiStar className='text-2xl text-yellow-500' />
                    </div>
                    <p>(2.5k Review)</p>
                    <div className='bg-primary text-white text-lg text-center w-20 p-1 rounded-md transition-bg hover:bg-white hover:text-primary'>$1200</div>
                </span> */}
            </div>
        );
    };
    return (
        <div className='bg-lightGray my-16 py-16 relative'>
        <div className='max-w-[1400px] mx-auto px-3'>
            <span className='flex flex-col items-center '>
                <p className='text-primary font-bold capitalize tracking-[0.15em]'>Popular Packages</p>
                <h2 className='text-4xl text-center font-bold capitalize my-4'>Đầy đủ tính năng và cá nhân hóa</h2>
            </span>
            <div className='grid grid-cols-1 gap-10 my-15 relative z-10 mt-20 xl:grid-cols-3'>
                <Card image={package1} text1="Lên kế hoạch chi tiết" text2="Trip planning made easy and (almost) as fun as travelling itself! "/>
                <Card image={package2} text1="Chia sẻ hành trình" text2="Trip planning made easy and (almost) as fun as travelling itself! "/>
                <Card image={package3} text1="Tính toán kinh phí" text2="Trip planning made easy and (almost) as fun as travelling itself! "/>
            </div>
            <div className='grid grid-cols-1 gap-15 my-15 relative mt-20 mx-12 xl:grid-cols-2'>
                <Card image={package4} text1="Theo dõi thành viên" text2="Trip planning made easy and (almost) as fun as travelling itself! "/>
                <Card image={package5} text1="Kết bạn muôn phương" text2="Trip planning made easy and (almost) as fun as travelling itself! "/>
            </div>
        </div>
    </div>
    
    );
}

export default Packages;