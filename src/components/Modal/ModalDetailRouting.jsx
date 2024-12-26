import { useEffect, useRef, useState } from "react";
import { MdAccessTime, MdAddCircle, MdCircle, MdClose, MdOutlineKeyboardArrowDown, MdOutlineKeyboardControlKey, MdOutlineShareLocation } from "react-icons/md";
import map from "../../assets/images/map.png"
import Map from "../MapCard/Map";
import RoutingMap from "../MapCard/RoutingMap";
function ModalDetailRouting({ handleClose, routing, name }) {
    const [isUpInformationDetail, setIsUpInformaitonDetail] = useState(false);
    console.log(routing);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day} tháng ${month}`;
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
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative md:w-3/5 w-4/5 min-h-[500px] sm:pb-5 flex bg-white  border-2 border-none rounded-lg shadow-xl stroke-2  stroke-[#D7D7D7] flex-col items-center sm:px-3 sm:py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="absolute sm:top-5 top-3 sm:right-5 right-3  z-1000">
                        <MdClose onClick={handleClose} className="md:text-[25px] text-[22px] cursor-pointer" />
                    </div>
                    <div className="relative w-full lg:h-[88vh] sm:h-[92vh] h-[85vh] lg:px-0 sm:px-5">
                        <RoutingMap planLocation={routing} />
                        <div className={`absolute sm:w-1/4 w-full lg:h-full sm:h-fit  z-1000  ${isUpInformationDetail ? "h-3/5 transition-all duration-700 transform translate-y-0 opacity-100" : "h-auto transition-all transform translate-y-1 duration-700"} left-0 sm:top-0 bottom-0 sm:px-5 sm:py-5 px-3`}>
                            <div className="w-full  sm:min-w-[300px] h-full bg-white rounded-lg flex flex-col">
                                <div className="w-full sm:h-[50px] h-[60px] shadow-lg border-[#B3B3B3]  rounded-[15px] flex flex-col justify-center sm:px-5 px-3  gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className="flex sm:text-[18px] text-[12px] nunito-text font-bold">Chi tiết hành trình</span>
                                        {isUpInformationDetail ? <MdOutlineKeyboardArrowDown onClick={() => setIsUpInformaitonDetail(false)} className="sm:hidden block cursor-pointer" /> : <MdOutlineKeyboardControlKey onClick={() => setIsUpInformaitonDetail(true)} className="sm:hidden block cursor-pointer" />}
                                    </div>
                                </div>
                                <div className={`w-full  px-2 pt-4 sm:h-[90%] h-[90%] ${isUpInformationDetail ? "block" : "hidden"} sm:block`}>
                                    <div className="w-full flex flex-col pt-2 gap-5 relative overflow-auto sm:max-h-[85%] max-h-[60%] h-auto list-address">
                                        <div className="flex flex-col sm:gap-5 gap-2 h-full overflow-auto">
                                            {routing.map((address) => (
                                                <div key={address.locationId} className={`flex items-center text-black w-full text-[14px] gap-2 cursor-pointer`} >
                                                    <span className=" inline-block lg:w-1/6 w-1/5 text-[11px] leading-3 cursor-pointer">{formatDate(address.estimatedStartDate)}</span>
                                                    <img width="25" height="25" src="https://img.icons8.com/fluency/48/map-pin.png" alt="map-pin" />

                                                    {/* <MdCircle className={`z-50 rounded-[90px] ${address.id === 1 ? "fill-[#007AFF] text-[13px] flex justify-center ml-[-1px]" : "border-[1px] fill-white"}`} /> */}
                                                    <div className="flex flex-col w-2/3 text-start">
                                                        <span className="inline-block text-[12px] font-semibold  whitespace-nowrap overflow-hidden text-ellipsis">{address.name}</span>
                                                        <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis  text-[10px] cursor-pointer">{address.address}</span>
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