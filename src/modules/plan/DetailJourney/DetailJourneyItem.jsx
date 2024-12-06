import { FaBars, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import HoiAn from "../../../assets/images/noImages.jpg"
import { EditLocationIcon } from "../../../components/Icons/Icons";
function DetailJourneyItem({ isEdit, journey, index, toggleDetail, dragHandleProps }) {
    const dashStyle = journey.status === 0
        ? 'linear-gradient(to bottom, #FF7324 40%, transparent 40%)'
        : journey.status === 1
            ? 'linear-gradient(to bottom, #46E8A5 40%, transparent 40%)'
            : 'linear-gradient(to bottom, #007AFF 40%, transparent 40%)';
    const circleBgColor = journey.status === 0
        ? '#FF7324'
        : journey.status === 1
            ? '#46E8A5'
            : '#007AFF';
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500" />);
            }
        }
        return stars;
    };

    return (
        <div className="w-full md:gap-5 gap-2 flex h-[171px]" >
            {!isEdit ? (
                <div className="flex w-[25px] h-full relative">
                    <div
                        className={`w-full h-[25px] rounded-full  text-white font-bold flex cursor-pointer justify-center items-center text-[14px]`}
                        style={{ backgroundColor: circleBgColor }}
                    >
                        {journey.status === 2 ? '✔' : index + 1}
                    </div>
                    <div
                        className={`absolute left-1/2 top-[25px] h-full w-[1px]  border-dashed  transform -translate-x-1/2`}
                        style={{
                            backgroundImage: dashStyle,
                            backgroundSize: '2px 10px',
                        }}
                    ></div>
                </div>
            ) : (
                <div className="flex w-[25px] h-full justify-center items-center text-[20px]">
                    <MdOutlineRemoveCircleOutline className="text-red-400 cursor-pointer" />
                </div>
            )}

            <div className="flex flex-col w-full h-full">
                <span className="font-semibold md:text-[14px] text-[12px] gap-1">{journey?.hour}</span>
                <div className="flex w-full md:h-[150px] h-[130px] bg-white rounded-xl shadow-lg border border-[#CCD0D5] px-2 py-2 md:gap-3 gap-[6px]">
                    <img
                        src={journey?.avatar || HoiAn}
                        alt=""
                        className="w-1/6 md:min-w-[120px]  min-w-[77px] object-cover md:h-full h-full rounded-xl"
                    />
                    <div className="flex w-5/6 flex-col md:px-2 gap-1">
                        <div className="flex justify-between ">
                            <span className="md:text-[21px] text-[14px] nunito-text font-bold text-[#333333]">
                                {journey.locationName}
                            </span>
                            {!isEdit ? (
                                <Button
                                    secondary
                                    className="md:text-[15px] text-[8px] rounded-lg"
                                    onClick={() => toggleDetail(journey.planLocationId)}
                                >
                                    Chi tiết
                                </Button>
                            ) : null}
                        </div>
                        <span className="nunito-text font-normal text-[#333333] md:text-[14px] text-[10px]">
                            {journey.locationAddress}
                        </span>
                        <div className="w-full flex md:gap-5">
                            {/* {journey.category === 1 || journey.category === null && (
                                <div className="flex px-3 text-[#0F3E4A] bg-[#FFEDE8] border border-[#FDDFDF] hover:bg-[#fee5de] duration-200 md:text-[12px] text-[9px] font-bold rounded-[20px] py-1 cursor-pointer">
                                    Ăn uống
                                </div>
                            )}
                            {journey.category === 0 && (
                                <div className="flex px-3 text-[#0F3E4A] bg-[#D9FFF1] border border-[#A0FFD7] hover:bg-[#c5f7e5] duration-200 md:text-[12px] text-[9px]  font-bold rounded-[20px] py-1 cursor-pointer">
                                    Địa điểm du lịch
                                </div>
                            )}
                            {journey.category === 2 && (
                                <div className="flex px-3 text-[#0F3E4A] bg-[#C8E7FF] border border-[#4FBAFF] hover:bg-[#bce1fe] duration-200 md:text-[12px] text-[9px]  font-bold rounded-[20px] py-1 cursor-pointer">
                                    Nơi ở
                                </div>
                            )} */}
                        </div>
                        <div className="flex items-center gap-1 py-2">{renderStars(journey.rating || 5)}</div>
                    </div>
                </div>
            </div>
            {isEdit && (
                <div className="flex w-[25px] h-full justify-center items-center text-[20px]" {...dragHandleProps}>
                    <EditLocationIcon className="w-full h-[25px]" />
                </div>
            )}
        </div>
    );
}

export default DetailJourneyItem;
