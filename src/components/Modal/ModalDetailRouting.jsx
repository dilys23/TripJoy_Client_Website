import { useEffect, useRef, useState } from "react";
import { MdAccessTime, MdAddCircle, MdAttachMoney, MdCircle, MdClose, MdOutlineKeyboardArrowDown, MdOutlineKeyboardControlKey, MdOutlineShareLocation } from "react-icons/md";

import RoutingMap from "../MapCard/RoutingMap";
import AvatarDefault from "../Avatar/AvatarDefault";
function ModalDetailRouting({ leader, handleClose, routing, data }) {
    const [isUpInformationDetail, setIsUpInformaitonDetail] = useState(false);
    console.log(data);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day} th ${month}`;
    };
    const listRef = useRef(null);
    const [listHeight, setListHeight] = useState("auto");
    const updateHeight = () => {
        if (listRef.current) {
            setListHeight(listRef.current.offsetHeight)
        }
    }
    useEffect(() => {
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [routing])
    const formatPlanDateRange = (planStartDate, planEndDate) => {
        const formatDate = (isoString) => {
            const date = new Date(isoString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            return `${day}/${month}`;
        };

        return `${formatDate(planStartDate)} đến ${formatDate(planEndDate)}`;
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount) + 'đ';
    };
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative  w-4/5 min-h-[500px] sm:pb-5 flex bg-white  border-2 border-none rounded-lg shadow-xl stroke-2  stroke-[#D7D7D7] flex-col items-center sm:px-3 sm:py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="absolute sm:top-5 top-3 sm:right-5 right-3  z-1000">
                        <MdClose onClick={handleClose} className="md:text-[25px] text-[22px] cursor-pointer" />
                    </div>
                    <div className="relative w-full lg:h-[88vh] sm:h-[92vh] h-[85vh] lg:px-0 sm:px-5">
                        <RoutingMap planLocation={routing} />
                        <div className={`absolute sm:w-1/4 w-full lg:h-full sm:h-fit  z-1000  ${isUpInformationDetail ? "h-3/5 transition-all duration-700 transform translate-y-0 opacity-100" : "h-auto transition-all transform translate-y-1 duration-700"} left-0 sm:top-0 bottom-0 sm:px-5 sm:py-5 px-3`}>
                            <div className="w-full  sm:min-w-[320px] h-full bg-white rounded-lg flex flex-col">
                                <div className="w-full h-fit shadow-lg border-[#B3B3B3] py-2 rounded-[15px] flex flex-col justify-center  gap-1">
                                    <div className="flex justify-between items-center sm:px-5 px-3 ">
                                        <span className="flex sm:text-[18px] text-[12px] nunito-text font-bold">Chi tiết hành trình</span>
                                        <div className="flex items-center gap-2">
                                            {isUpInformationDetail ? <MdOutlineKeyboardArrowDown onClick={() => setIsUpInformaitonDetail(false)} className="sm:hidden block cursor-pointer" /> : <MdOutlineKeyboardControlKey onClick={() => setIsUpInformaitonDetail(true)} className="sm:hidden block cursor-pointer" />}
                                        </div>

                                    </div>
                                    {leader &&
                                        <div className="flex gap-2 px-2 items-center">
                                            <AvatarDefault src={leader?.avatar || leader?.avatar?.url} className="w-8 h-8 "></AvatarDefault>
                                            <span className="text-[13px]">{leader?.userName}</span>

                                        </div>}
                                    {
                                        data &&
                                        <div className="flex gap-1 px-2 w-full">
                                            <div className="flex gap-1 items-center text-[#616161] font-semibold text-[11px] max-w-[120px]">
                                                <MdOutlineShareLocation />
                                                <span>{data?.plan?.provinceStart?.provinceName} - {data?.plan?.provinceEnd?.provinceName}</span>
                                            </div>
                                            <div className="flex  items-center text-[#616161] font-semibold text-[11px]">
                                                <MdAttachMoney />
                                                <span>{formatCurrency(data?.plan?.estimatedBudget)}</span>
                                            </div>
                                            <div className="flex  items-center text-[#616161] font-semibold text-[11px]">
                                                <MdAccessTime />
                                                <span>{formatPlanDateRange(data?.plan?.startDate, data?.plan?.endDate)}</span>
                                            </div>
                                        </div>}
                                </div>
                                <div className={`w-full  px-2 pt-4 sm:h-[90%] h-[90%] ${isUpInformationDetail ? "block" : "hidden"} sm:block`}>
                                    <div className="w-full flex flex-col pt-2 gap-5 relative overflow-auto h-full list-address">
                                        <div className="flex flex-col sm:gap-5 gap-2 md:h-full h-[230px] overflow-auto">
                                            {
                                                routing.length > 0 &&
                                                routing.map((address) => (
                                                    <div key={address.locationId} className={`flex items-center text-black w-full text-[14px] gap-2 cursor-pointer`} >
                                                        <span className=" inline-block lg:w-1/6 w-1/5 text-[11px] leading-3 cursor-pointer">{formatDate(address.estimatedStartDate)}</span>
                                                        <img width="25" height="25" src="https://img.icons8.com/fluency/48/map-pin.png" alt="map-pin" />

                                                        {/* <MdCircle className={`z-50 rounded-[90px] ${address.id === 1 ? "fill-[#007AFF] text-[13px] flex justify-center ml-[-1px]" : "border-[1px] fill-white"}`} /> */}
                                                        <div className="flex flex-col w-2/3 text-start">
                                                            <span className="inline-block text-[12px] font-semibold  whitespace-nowrap overflow-hidden text-ellipsis">{address.name || address.locationName}</span>
                                                            <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis  text-[10px] cursor-pointer">{address.address || address.locationAddress}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        <div
                                            style={{ height: listHeight }}
                                            className="absolute  top-0 gap-[14px] items-center flex-row flex w-full pt-3 ">
                                            <div className="lg:w-1/6 w-1/5 inline-block"></div>
                                            <div className={`border-l-[1px] border-[#C2BFBF] border h-full`}></div>
                                            <div className="w-2/3"></div>
                                        </div>
                                    </div>

                                </div>




                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalDetailRouting;