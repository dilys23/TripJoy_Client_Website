import { Pie } from '@ant-design/plots';
import { FaBed, FaGasPump } from 'react-icons/fa';
import { FaBowlRice, FaBuildingColumns } from "react-icons/fa6";
import { MdAdd } from 'react-icons/md';
import image from "../../../assets/images/anh1.jpg"
import Hue from "../../../assets/images/Hue.jpg"
import HoiAn from "../../../assets/images/hoian.png"
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import CardExpense from '../../../components/Card/CardExpense';
import { getExpense, getMemberExpense } from '../../../services/budget';
function DetailBudget({ planId }) {
    // const [listMember, setListMember] = useState([]);

    const fetchExpense = async () => {
        const pageIndex = 1;
        const pageSize = 5;
        try {
            const data = await getExpense(planId, pageIndex, pageSize);
            const memberData = await getMemberExpense(planId, pageIndex, pageSize);
            console.log(memberData);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchExpense();
    }, [])
    const [listMember, setListMember] = useState([
        {
            id: 0,
            avatar: image,
            name: 'Bach Duong',
            price: '-750.000 đ'
        },
        {
            id: 1,
            avatar: Hue,
            name: 'Le Nguyen',
            price: '-700.000 đ'
        },
        {
            id: 2,
            avatar: HoiAn,
            name: 'Bao Chau',
            price: '-800.000 đ'
        }
    ])
    const data = [
        { type: 'Category A', value: 40 },
        { type: 'Category B', value: 21 },
    ];


    const config = {
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.6,
        color: ['#557AFF', '#FF7324'],
        label: {
            type: 'outer',
            offset: '20%',
            formatter: (datum) => `${datum.type}: ${datum.value.toLocaleString()} đ`,
        },
        legend: false, // Ẩn phần hiển thị legend
    };
    return (
        <div className="w-full  min-h-[400px]  mt-[-20px] mb-16  flex flex-col gap-6">
            <div className="w-full h-[178px] bg-white shadow-md rounded-[10px] border border-[#CCD0D5] flex">
                <div className="w-1/3 flex flex-col justify-center items-center h-full pl-12">
                    <span className="text-[35px] font-bold"> 2.450.000 đ </span>
                    <span className="font-semibold">Đã chi</span>
                </div>
                <div className='w-1/3 h-full justify-center items-center flex flex-col text-start gap-1'>
                    <div className='flex gap-2 items-center w-[120px]'>
                        <div className='w-[15px] h-[15px] rounded-full bg-[#17A1FA]'></div>
                        <span className='text-[#979797] font-bold'>Tổng quỹ</span>
                    </div>
                    <span className='text-[#282828] nunito-text font-extrabold text-[20px] w-[120px]'> 3.450.000 đ </span>
                    <div className='flex gap-2 items-center w-[120px]'>
                        <div className='w-[15px] h-[15px] rounded-full bg-[#FF7324]'></div>
                        <span className='text-[#979797] font-bold'>Còn lại</span>
                    </div>
                    <span className='text-[#282828] nunito-text font-extrabold text-[20px] w-[120px]'> 1.000.000 đ </span>
                </div>
                <div className='w-1/3 h-full flex'>
                    <Pie
                        colors={['#557AFF', '#FF7324']}
                        {...config} className="w-full" />
                </div>
            </div>
            {/* <div className="w-full h-fit bg-white shadow-md rounded-[10px] border border-[#CCD0D5] flex  px-8 py-3 flex-col gap-2">
                <span className='font-semibold'>Dịch vụ</span>
                <div className='flex items-center gap-5 flex-wrap'>
                    <div className='bg-[#D7FFF1] rounded-[10px] w-[60px] h-[60px] flex justify-center items-center cursor-pointer'>
                        <FaBuildingColumns className='text-[#34A853] text-[30px]' />
                    </div>
                    <div className='bg-[#FFD8C7] rounded-[10px] w-[60px] h-[60px] flex justify-center items-center cursor-pointer'>
                        <FaBowlRice className='text-[#FF7324] text-[30px]' />
                    </div>
                    <div className='bg-[#CDECFF] rounded-[10px] w-[60px] h-[60px] flex justify-center items-center cursor-pointer'>
                        <FaBed className='text-[#4285F4] text-[30px]' />
                    </div>
                    <div className='bg-[#FFEFC0] rounded-[10px] w-[60px] h-[60px] flex justify-center items-center cursor-pointer'>
                        <FaGasPump className='text-[#f7c805] text-[30px]' />
                    </div>
                    <div className='bg-white border border-[#E3E6E8] rounded-[10px] w-[60px] h-[60px] flex justify-center items-center cursor-pointer'>
                        <MdAdd className='text-[#f2cca2] w-[48px] h-[48px]' />
                    </div>
                </div>
            </div> */}
            <div className='w-full flex gap-8'>
                <div className='bg-white shadow-md rounded-[10px] border border-[#CCD0D5] flex w-1/2 h-[300px] flex-col px-3 py-3 gap-2'>
                    <CardExpense

                        icon={
                            <img
                                width="28"
                                height="28"
                                src="https://img.icons8.com/fluency/28/map-pin.png"
                                alt="map-pin"
                            />
                        }
                    />



                </div>
                <div className='bg-white shadow-md rounded-[10px] border border-[#CCD0D5] flex w-1/2 h-[300px] flex-col px-4 py-3 gap-2'>
                    <div className='flex items-center justify-between '>
                        <span className='font-semibold '>Thành viên</span>
                        <a href="#" className='text-[15px] font-semibold text-[#17A1FA] cursor-pointer'>Tất cả</a>
                    </div>
                    <hr className='w-[90%] text-[#CCD0D5] mx-auto' />
                    <div className='w-full max-h-[250px] overflow-y-hidden gap-4 flex flex-col '>
                        {listMember.map((member) =>
                            <div className='w-full flex justify-between items-center'>
                                <div className='flex gap-3 items-center cursor-pointer
                                '>
                                    <Avatar src={member.avatar} className='w-[50px] h-[50px]'></Avatar>
                                    <span className='font-medium text-[14px]'>{member.name}</span>
                                </div>
                                <div className='font-semibold text-[18px]'>{member.price}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBudget;