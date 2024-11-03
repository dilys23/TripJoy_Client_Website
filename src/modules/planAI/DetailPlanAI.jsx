import { useEffect, useRef, useState } from "react";
import map from "../../assets/images/map.png"
import Button from "../../components/Button/Button"
import Map from "../../components/MapCard/Map";
import { MdAccessTime, MdAddCircle, MdCircle, MdOutlineKeyboardArrowDown, MdOutlineKeyboardControlKey, MdOutlineShareLocation } from "react-icons/md";
function DetailPlanAI() {
    const [isUpInformationDetail, setIsUpInformaitonDetail] = useState(false);
    const listAddress = [
        {
            "id": 1,
            "date": "20 Th 10",
            "address": "100 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng, Việt Nam"
        },
        {
            "id": 2,
            "date": "21 Th 10",
            "address": "Chùa Thiên Mụ, Hương Hòa, TP Huế"
        },
        {
            "id": 3,
            "date": "22 Th 10",
            "address": "Lăng Tự Đức, Thủy Xuân, TP Huế"
        },
        {
            "id": 4,
            "date": "22 Th 10",
            "address": "Lăng Minh Mạng, Hương Thọ, Hương Trà"
        },
        {
            "id": 5,
            "date": "23 Th 10",
            "address": "Lăng Khải Định, Thủy Bằng, Hương Thủy"
        },
        {
            "id": 6,
            "date": "23 Th 10",
            "address": "Đồi Vọng Cảnh, TP Huế"
        },
        {
            "id": 7,
            "date": "24 Th 10",
            "address": "Cầu Trường Tiền, TP Huế"
        },
        {
            "id": 8,
            "date": "24 Th 10",
            "address": "Phố đi bộ Nguyễn Đình Chiểu, TP Huế"
        },
        {
            "id": 9,
            "date": "25 Th 10",
            "address": "Chợ Đông Ba, Phú Hòa, TP Huế"
        },
        {
            "id": 10,
            "date": "26 Th 10",
            "address": "Đại Nội Huế, TP Huế"
        },
        {
            "id": 11,
            "date": "27 Th 10",
            "address": "Núi Ngự Bình, TP Huế"
        },
        {
            "id": 12,
            "date": "28 Th 10",
            "address": "Hồ Thủy Tiên, Thủy Bằng, Hương Thủy"
        },
        {
            "id": 13,
            "date": "29 Th 10",
            "address": "Đầm Lập An, Lăng Cô, Phú Lộc"
        },
        {
            "id": 14,
            "date": "30 Th 10",
            "address": "Biển Lăng Cô, Lăng Cô, Phú Lộc"
        },


    ]
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
    }, [listAddress])
    return (
        <div className="relative w-full lg:h-[88vh] sm:h-[92vh] h-[85vh] lg:px-0 px-3">
            {/* <Map /> */}
            <img src={map} alt="" className="w-full h-full object-cover" />
            <div className={`absolute lg:w-1/3 sm:w-1/2 w-full lg:h-full sm:h-2/3  ${isUpInformationDetail ? "h-3/5 transition-all duration-700 transform translate-y-0 opacity-100" : "h-auto transition-all transform translate-y-1 duration-700"} left-0 sm:top-0 bottom-0 sm:px-5 sm:py-5 px-3`}>
                <div className="w-full sm:min-w-[280px] lg:min-w-[460px] h-full bg-white rounded-lg flex flex-col">
                    <div className="w-full sm:h-[85px] h-[60px] min-h-[60px] max-h-[85px] shadow-lg border-[#B3B3B3]  rounded-[15px] flex flex-col justify-center sm:px-5 px-3  gap-1">
                        <div className="flex justify-between items-center">
                            <span className="flex sm:text-[18px] text-[12px] nunito-text font-bold">Chi tiết hành trình</span>
                            {isUpInformationDetail ? <MdOutlineKeyboardArrowDown onClick={() => setIsUpInformaitonDetail(false)} className="sm:hidden block cursor-pointer" /> : <MdOutlineKeyboardControlKey onClick={() => setIsUpInformaitonDetail(true)} className="sm:hidden block cursor-pointer" />}
                        </div>
                        <div className="flex sm:gap-7 gap-1 lg:px-3">
                            <div className="flex sm:gap-3 gap-1 items-center text-[#616161] font-semibold sm:text-base text-[10px]">
                                <MdOutlineShareLocation />
                                <span>500 km</span>
                            </div>
                            <div className="flex sm:gap-3 gap-1 items-center text-[#616161] font-semibold sm:text-base text-[10px]">
                                <MdAccessTime />
                                <span>2 ngày 1 đêm</span>
                            </div>
                        </div>
                    </div>
                    <div className={`w-full  px-2 pt-4 sm:h-[90%] h-[90%] ${isUpInformationDetail ? "block" : "hidden"} sm:block`}>
                        <div className="w-full flex flex-col pt-2 gap-5 relative overflow-auto sm:max-h-[85%] max-h-[60%] h-auto list-address">
                            <div className="flex flex-col sm:gap-5 gap-2 " ref={listRef}>
                                {listAddress.map((address) => (
                                    <div key={address.id} className={`flex items-center text-black w-full text-[14px] gap-2 cursor-pointer`} >
                                        <span className=" inline-block lg:w-1/6 w-1/5 lg:text-[15px] text-[13px] leading-3 cursor-pointer">{address.date}</span>
                                        <MdCircle className={`z-50 rounded-[90px] ${address.id === 1 ? "fill-[#007AFF] text-[16px] flex justify-center ml-[-1px]" : "border-[1px] fill-white"}`} />
                                        <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis w-2/3 lg:text-[15px] text-[13px] cursor-pointer">{address.address}</span>
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
                        <div className="flex pt-1 gap-1 mt-2">
                            <MdAddCircle className="text-[#007AFF] text-[20px] cursor-pointer " />
                            <span className="text-[#007AFF] text-[13px] cursor-pointer ">Bạn có muốn thêm địa chỉ khác</span>
                        </div>
                        <div className="flex justify-end px-3">
                            <Button primary className="px-3 py-1 text-[13px] rounded-md">Bắt đầu</Button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}

export default DetailPlanAI;