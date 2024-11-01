import { MdCircle, MdMoreVert, MdOutlineCircle } from "react-icons/md";

function CardRecommendationPlan({ isActive, onClick }) {
    const listAddress = [
        {
            "id": 1,
            "date": "20 Th 10",
            "address": "100 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng, Việt Nam"
        },
        {
            "id": 2,
            "date": "21 Th 10",
            "address": "20 Quang Trung, TP Huế"
        },
        {
            "id": 3,
            "date": "23 Th 10",
            "address": "Cố đô Huế"
        },
        {
            "id": 4,
            "date": "23 Th 10",
            "address": "Cố đô Huế"
        },

    ]
    return (
        <div
            onClick={onClick}
            className={`relative flex w-full rounded-[15px] lg:max-w-[400px] md:max-w-[240px] max-w-[360px] lg:min-w-[400px] md:min-w-[260px] min-w-[360px] ${isActive ? " bg-[#007AFF]" : "bg-white shadow-lg border-[#C2BFBF] border"} cursor-pointer sm:h-[230px] h-[240px] px-3 flex-col pt-2 gap-2`}>
            <div className="flex justify-between w-full ">
                <span className={`${isActive ? "text-white" : "text-black"} lg:text-[18px] text-[15px] font-bold`}>Gợi ý 1</span>
                <MdMoreVert className="text-white cursor-pointer" />
            </div>
            <div className="h-[10px] w-full rounded-[5px] bg-white">
                <div className="h-full w-1/3 rounded-[5px] bg-[#6FFFC3]"></div>
            </div>
            <div className="w-full flex flex-col pt-2 gap-3 relative">
                {listAddress.map((address) => (
                    <div key={address.id} className={`flex items-center ${isActive ? " text-white" : " text-black"} w-full text-[14px] gap-2`} >
                        <span className=" inline-block lg:w-1/6 w-1/5 lg:text-base text-[12px]">{address.date}</span>
                        {isActive ? <MdCircle /> : <MdCircle className="z-50 border-[1px] fill-white rounded-[90px] " />}
                        <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis w-2/3 lg:text-base text-[13px]">{address.address}</span>
                    </div>
                ))}
                <div className="absolute h-full gap-[14px] items-center flex-row flex w-full">
                    <div className="lg:w-1/6 w-1/5 inline-block"></div>
                    <div className={`border-l-[1px] ${isActive ? "border-white" : "border-[#C2BFBF]"} border h-full`}></div>
                    <div className="w-2/3"></div>
                </div>

            </div>
            <div className="absolute w-full bottom-2 right-5 flex justify-end">
                <button className=" w-[64px] h-[30px] bg-[#FF9864] hover:bg-[#ea8553] transition-all duration-200 text-black font-bold px-2 py-2 flex justify-center items-center rounded-md lg:text-base text-[12px]">Chọn</button>
            </div>
        </div>
    );
}

export default CardRecommendationPlan;