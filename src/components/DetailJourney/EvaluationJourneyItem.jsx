import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdGroups, MdOutlinePeopleOutline } from "react-icons/md";
import RatingStar from "../../assets/Rate";
import ava from "../../assets/images/ava.jpg";
import ava1 from "../../assets/images/anh2.jpg";
import ava2 from "../../assets/images/anh3.jpg";
function EvaluationJourneyItem({ journey }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState); // Toggle dropdown state
    };

    const colorBorder = journey.status === 0
        ? '#FF7324'
        : journey.status === 1
            ? '#46E8A5'
            : '#007AFF';
    const dashStyle = journey.status === 0
        ?
        'linear-gradient(to bottom, #FF7324 40%, transparent 40%)'
        : journey.status === 1 ?
            'linear-gradient(to bottom, #46E8A5 40%, transparent 40%)'
            : 'linear-gradient(to bottom, #007AFF 40%, transparent 40%)';
    return (
        <div className="w-full flex h-[177px] pt-1 px-[1px]">
            <div
                className="w-[25px] h-1/2 flex items-center relative border-dashed border-b-[1px] overflow-hidden "
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 50%)',
                    borderColor: colorBorder,

                }}
            >
                <div
                    className="absolute left-1/2 w-[1px] h-full  border-dashed"
                    style={{
                        backgroundImage: dashStyle,
                        backgroundSize: '1px 10px'
                    }}
                ></div>

            </div>
            <div className="w-[200px] flex items-center">
                <div
                    className="w-full border-t-[1px] border-dashed justify-center"
                    style={{
                        borderColor: colorBorder,
                        backgroundImage: dashStyle,
                        backgroundSize: '1px 10px'
                    }}
                ></div>
            </div>
            <div
                style={{ borderColor: colorBorder, borderWidth: '1px' }}
                className="w-full h-full border bg-white rounded-lg shadow-md flex">
                <div className="w-3/5 h-full flex flex-col px-5 py-4 gap-2">
                    <div className="flex gap-3 items-center">
                        <MdGroups className="text-[#34A853] text-[30px]" />
                        <span className="text-[16px] text-[#333333] font-medium w-[70px]">Tham gia</span>
                        <div className=" relative h-[30px]">
                            <button
                                onClick={toggleDropdown}
                                className="shadow w-[130px] h-full rounded-[20px] border border-[#CCD0D5] text-[14px]"
                                type="button"
                            >
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="z-10 absolute mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-md border border-[#CCD0D5] dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <div className="flex items-center">
                                                <input
                                                    checked
                                                    id="checkbox-item-1"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label htmlFor="checkbox-item-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center">
                                                <input

                                                    id="checkbox-item-2"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label htmlFor="checkbox-item-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Le Nguyen</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-item-3"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label htmlFor="checkbox-item-3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hong Nhung</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex relative cursor-pointer">
                            <img src={ava1} alt="" className="w-[32px] h-[32px] rounded-full" />
                            <img src={ava2} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                            <img src={ava} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                        </div>
                        <div></div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <img width="25" height="25" src="https://img.icons8.com/fluency/48/price-tag--v1.png" alt="price-tag--v1" className="md:w-[30px] md:h-[30px] w-[20px] h-[20px]" />
                        <span className="text-[16px] text-[#333333] font-medium w-[70px]">Giá</span>
                        <input type="text" className="shadow w-[130px] h-full rounded-[20px] border border-[#CCD0D5] outline-none px-2 text-[14px]" />
                    </div>
                    <div className="flex gap-3 items-center">
                        <FcMoneyTransfer className="text-[30px]" />
                        <span className="text-[16px] text-[#333333] font-medium w-[70px]">Người trả</span>
                        <input type="text" className="shadow w-[130px] h-full rounded-[20px] border border-[#CCD0D5] outline-none px-2 text-[14px]" />
                        <img src={ava1} alt="" className="w-[32px] h-[32px] rounded-full" />
                    </div>
                    <div className="flex gap-3 items-center">
                        <FaStar className="text-yellow-500 text-[25px] w-[30px]" ></FaStar>
                        <span className="text-[16px] text-[#333333] font-medium w-[70px]">Đánh giá</span>
                        <RatingStar />
                    </div>
                </div>
                <div className="flex w-2/5 flex-col px-5 pt-4 gap-3">
                    <div className="bg-[#F1F2F3] rounded-[10px] w-full h-3/5 flex flex-col items-center justify-center cursor-pointer">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/image--v1.png" alt="image--v1" />
                        <span className="text-[14px]">Thêm ảnh</span>
                    </div>
                    <button className="w-full h-[35px] bg-[#46E8A5] rounded-[10px] font-bold text-white">Hoàn thành</button>
                </div>

            </div>
        </div>
    );
}

export default EvaluationJourneyItem;