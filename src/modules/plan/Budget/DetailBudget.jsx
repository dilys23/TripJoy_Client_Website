// import { Pie } from '@ant-design/plots';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Avatar, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import CardExpense from '../../../components/Card/CardExpense';
import { getExpense, getMemberExpense } from '../../../services/budget';
import AvatarDefault from '../../../components/Avatar/AvatarDefault';
function DetailBudget({ planId }) {
    const [listMyExpense, setListMyExpense] = useState([])
    const [listMember, setListMember] = useState([]);
    const [loading, setLoading] = useState(false);
    const [overView, setOverView] = useState();
    const fetchExpense = async () => {
        const pageIndex = 0;
        const pageSize = 5;
        try {
            setLoading(true);
            const data = await getExpense(planId, pageIndex, pageSize);
            const memberData = await getMemberExpense(planId, pageIndex, pageSize);
            console.log(data);
            setOverView(data);
            setListMyExpense(data.detailExpense.data);
            setListMember(memberData.members.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchExpense();
    }, [])

    const data = [
        { type: 'Chi phí cả nhóm', value: overView?.totalExpense },
        { type: 'Đã chi', value: overView?.expense },
    ];
    const COLORS = ['#557AFF', '#FF7324'];

    return (
        <div className="w-full  min-h-[400px]  mt-[-20px] mb-16  flex flex-col gap-6">
            <div className="w-full h-[178px] bg-white shadow-md rounded-[10px] border border-[rgb(204,208,213)] flex">
                <div className="w-1/3 flex flex-col justify-center items-center h-full sm:pl-12">
                    <span className="sm:text-[35px] text-[18px] font-bold">{Math.round(overView?.expense).toLocaleString('vi-VN')} đ </span>
                    <span className="font-semibold">Đã chi</span>
                </div>
                <div className='w-1/3 h-full justify-center items-center flex flex-col text-start gap-1 sm:pl-0 pl-5'>
                    <div className='flex gap-2 items-center w-[120px] sm:text-base text-[10px]'>
                        <div className='w-[15px] h-[15px] rounded-full bg-[#17A1FA]'></div>
                        <span className='text-[#979797] font-bold'>Cả nhóm</span>
                    </div>
                    <span className='text-[#282828] nunito-text font-extrabold sm:text-[20px] w-[120px]'>{Math.round(overView?.totalExpense).toLocaleString('vi-VN')} đ</span>
                    <div className='flex gap-2 items-center w-[120px] sm:text-base text-[10px]'>
                        <div className='w-[15px] h-[15px] rounded-full bg-[#FF7324]'></div>
                        <span className='text-[#979797] font-bold'>Số dư</span>
                    </div>
                    <span className='text-[#282828] nunito-text font-extrabold  sm:text-[20px w-[120px]'> {Math.round(overView?.excess).toLocaleString('vi-VN')} đ</span>
                </div>
                <ResponsiveContainer
                    style={{ width: '30%', height: 'auto' }}
                    className='h-full flex items-center'>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius="80%"
                            innerRadius="60%"
                            label={({ value }) => `${Math.round(value).toLocaleString('vi-VN')} đ`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} đ`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='w-full flex sm:flex-row flex-col gap-8'>
                <div className='bg-white shadow-md rounded-[10px] border border-[#CCD0D5] flex sm:w-1/2 w-full h-[300px] flex-col px-3 py-3 gap-2'>
                    <div className='flex items-center justify-between '>
                        <span className='font-semibold '>Cá nhân</span>
                        <a href="#" className='text-[15px] font-semibold text-[#17A1FA] cursor-pointer'>Tất cả</a>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            loading ? <Skeleton active /> :

                                (
                                    listMyExpense.map((expense) => (
                                        <CardExpense
                                            key={expense.order}
                                            icon={
                                                <img
                                                    width="28"
                                                    height="28"
                                                    src="https://img.icons8.com/fluency/28/map-pin.png"
                                                    alt="map-pin"
                                                />
                                            }
                                            expense={expense}
                                        />
                                    ))
                                )
                        }

                    </div>
                </div>
                <div className='bg-white shadow-md rounded-[10px] border border-[#CCD0D5] flex sm:w-1/2 w-full h-[300px] flex-col px-4 py-3 gap-2'>
                    <div className='flex items-center justify-between '>
                        <span className='font-semibold '>Thành viên</span>
                        <a href="#" className='text-[15px] font-semibold text-[#17A1FA] cursor-pointer'>Tất cả</a>
                    </div>
                    <hr className='w-[90%] text-[#CCD0D5] mx-auto' />
                    <div className="w-full max-h-[250px] overflow-y-hidden gap-4 flex flex-col">
                        {loading ? (
                            <>
                                <Skeleton active />
                            </>
                        ) : (
                            listMember.map((member) => (
                                <div key={member.userName} className="w-full flex justify-between items-center">
                                    <div className="flex gap-3 items-center cursor-pointer">
                                        <AvatarDefault src={member.url} className="w-[40px] h-[40px]" />
                                        <span className="font-medium text-[14px]">{member.userName}</span>
                                    </div>
                                    <div className="font-semibold text-[18px]"> {Math.round(member.excess).toLocaleString('vi-VN')} đ</div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetailBudget;