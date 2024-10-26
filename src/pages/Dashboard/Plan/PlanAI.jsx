import planImage from "../../../assets/images/planIcon.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/navigation";
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import recom1 from "../../../assets/images/recom1.png";
import recom2 from "../../../assets/images/recom2.png";
import recom3 from "../../../assets/images/recom3.png"
import recom4 from "../../../assets/images/recom4.png"
import Button from "../../../components/Button/Button";
import { useState } from "react";
import CalendarContainer from "../../../components/Calendar/CalendarContainer";
import ModelAddTopic from "../../../modules/trips/ModelAddTopic";
import config from "../../../config";
function PlanAI() {
    const listImage = [
        { id: 1, image: recom1 },
        { id: 2, image: recom2 },
        { id: 3, image: recom3 },
        { id: 4, image: recom4 },
        { id: 5, image: recom2 },
    ]
    const [currentStep, setCurrentStep] = useState(1);
    const [slideDirection, setSlideDirection] = useState('');
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedMember, setSelectedMember] = useState("personal");
    const [openModelAddTopic, setOpenModelAddTopic] = useState(false);
    const handleSelect = (option) => {
        setSelectedMember(option);
    };
    const handleNextPage = () => {
        setSlideDirection('next');
        setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
            console.log("next");
        }, 300);
    }
    const handleBackPage = () => {
        setSlideDirection('prev');
        setTimeout(() => {
            setCurrentStep((prev) => prev - 1);
        }, 300);
    }
    const topics = [
        "Địa điểm nổi tiếng",
        "Quán coffee",
        "Quán ăn bình dân",
        "Nhà hàng nổi tiếng",
        "Ngoài trời",
        "Thiên nhiên",
        "Danh lam thắng cảnh",
        "+ Thêm mới"
    ];
    const handleSelectTopic = (topic) => {
        if (topic === "+ Thêm mới") {
            setOpenModelAddTopic(true);
        } else {
            setSelectedTopic((prev) => {
                if (prev.includes(topic)) {
                    return prev.filter((t) => t !== topic);
                } else {
                    return [...prev, topic];
                }
            });
        }

    };


    return (
        <div className="mt-1 flex w-full md:px-3 flex-col gap-4 bg-[#f5f6f7] h-[89vh] overflow-y-hidden">
            {currentStep === 1 && (<div className="w-full sm:h-[75px] h-[50px] rounded-[7px] border-[0.4px] shadow-md bg-white border-[#CCD0D5] px-4 py-2 flex justify-between items-center">
                <div className="flex flex-col ">
                    <div className="flex items-center ">
                        <div className="sm:text-[25px] text-[12px] nunito-text font-semibold">Hora, Dilysnguyen</div>
                        <img src={planImage} alt="" className="sm:w-[45px] sm:h-[45px] w-[20px] h-[20px]" />
                    </div>
                    <div className="sm:text-[13px] text-[6px]">Hãy bắt đầu chuyến đi mới đầy thú vị nhé !</div>
                </div>
                <div className="flex gap-1 items-center sm:pr-5 cursor-pointer">
                    <span className="text-[#0023FE] sm:text-[16px] text-[10px] font-bold">Tạo chuyến đi mới với AI </span>
                </div>
            </div>)}
            <div className="w-full relative h-[100%] rounded-[7px] border-[0.4px] shadow-md bg-white border-[#CCD0D5] overflow-x-hidden">
                {currentStep === 1 && (
                    <div className={`step-container justify-start pt-8  items-center flex-col gap-8 flex  ${slideDirection === 'next' ? 'step-exit-next' : slideDirection === 'prev' ? 'step-exit-prev' : 'step-active'} ${currentStep === 1 ? 'step-active' : ''}`}>
                        <span className="sm:text-[25px] text-[14px] font-bold leading-10 ">Hãy chọn địa điểm mà bạn muốn đi ?</span>
                        <input type="text" placeholder="Nơi bắt đầu..." className="sm:w-1/3 w-full border border-gray rounded-[98px] sm:h-[50px] h-[35px] text-[10px] sm:text-[16px] px-3 outline-none" />
                        <input type="text" placeholder="Nơi kết thúc..." className="sm:w-1/3 w-full border border-gray rounded-[98px] sm:h-[50px] h-[35px] text-[10px] sm:text-[16px] px-3 outline-none" />
                        <div className="w-full justify-center items-center flex flex-col gap-2">
                            <span className="w-[70%] font-semibold sm:text-base text-[11px] text-start">Các địa điểm gợi ý</span>
                            <div className="w-[70%] flex justify-center items-center relative gap-2">
                                {/* <div className="swiper-button-prev absolute top-[50%] left-[-40px] transform -translate-y-[50%] cursor-pointer z-10" >
                                </div> */}
                                <div className="swiper-button-prev cursor-pointer z-10 w-1/12" >
                                </div>
                                <div className="w-10/12">
                                    <Swiper
                                        spaceBetween={0}
                                        breakpoints={{
                                            400: {
                                                slidesPerView: 2,
                                            },
                                            768: {
                                                slidesPerView: 2,
                                            },
                                            1024: {
                                                slidesPerView: 3,
                                            },
                                            1280: {
                                                slidesPerView: 4,
                                            },
                                        }}
                                        loop={true}
                                        // autoplay={{ delay: 500 }}
                                        navigation={{
                                            nextEl: ".swiper-button-next",
                                            prevEl: ".swiper-button-prev",
                                        }}
                                        modules={[Navigation]}
                                    >
                                        {listImage.map((img) => (
                                            <SwiperSlide key={img.id}>
                                                <img src={img.image} alt="" className="sm:w-[190px] sm:h-[210px] w-[120px] h-[150px] object-cover rounded-[19px] cursor-pointer" />
                                            </SwiperSlide>
                                        ))}

                                    </Swiper>
                                </div>
                                <div className="swiper-button-next cursor-pointer z-10 w-1/12">
                                </div>
                                {/* <div className="swiper-button-next absolute top-[50%] md:right-[30px] right-[-20px] transform -translate-y-[50%] cursor-pointer z-10">
                                </div> */}
                            </div>
                        </div>
                        <div className="w-[90%] absolute bottom-10  justify-end flex pt-0">
                            <Button secondary onClick={handleNextPage}>Kế tiếp</Button>
                        </div>

                    </div>
                )}
                {currentStep === 2 && (
                    <div className={`step-container justify-start pt-7 pb-3 items-center flex-col gap-10 flex ${slideDirection === 'next' ? 'step-exit-next' : slideDirection === 'prev' ? 'step-exit-prev' : 'step-active'} ${currentStep === 1 ? 'step-active' : ''}`}>
                        <div className="w-[80%] h-[10px] border border-gray rounded-[23px]">
                            <div className="w-1/3 h-full bg-black rounded-s-3xl "></div>
                        </div>
                        <span className="md:text-[25px] text-[14px] font-bold leading-10 ">Thời gian dự định cho chuyến đi ?</span>
                        <CalendarContainer></CalendarContainer>
                        <div className="w-[90%] absolute bottom-10 flex justify-between">
                            <Button tertiary onClick={handleBackPage}>Trở về</Button>
                            <Button secondary onClick={handleNextPage}>Kế tiếp</Button>
                        </div>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className={`step-container justify-start pt-7 pb-3 items-center flex-col gap-10 flex ${slideDirection === 'next' ? 'step-exit-next' : slideDirection === 'prev' ? 'step-exit-prev' : 'step-active'} ${currentStep === 1 ? 'step-active' : ''}`}>
                        <div className="w-[80%] h-[10px] border border-gray rounded-[23px]">
                            <div className="w-2/3 h-full bg-black rounded-s-3xl "></div>
                        </div>
                        <span className="md:text-[25px] text-[14px] font-bold leading-10 pt-5">Nhập kinh phí dự tính  ?</span>
                        <div className="w-full flex md:gap-12 gap-5 justify-center ">
                            <input type="text" className="w-1/3 h-[50px] border border-[#CCD0D5] outline-none rounded-lg px-5 text-[#F05D1D] text-[20px]" placeholder="1.500.000đ" />
                        </div>
                        <span className="md:text-[25px] text-[14px] font-bold leading-10 ">Bạn đi cá nhân hay cùng bạn đồng hành ?</span>
                        <div className="w-1/3 h-[80px] flex justify-around gap-3">
                            <div
                                className={`w-1/2 h-[80px] rounded flex items-center justify-center cursor-pointer ${selectedMember === "personal" ? "bg-[#45EDA7]" : "bg-white border-[#CCD0D5] border"}`}
                                onClick={() => handleSelect("personal")}
                            >Cá nhân</div>
                            <div className={`w-1/2 h-[80px] rounded flex items-center justify-center cursor-pointer ${selectedMember === "friends" ? "bg-[#45EDA7]" : "bg-white border-[#CCD0D5] border"}`}
                                onClick={() => handleSelect("friends")}
                            >Bạn bè</div>
                        </div>
                        {
                            selectedMember === "friends" && (
                                <div className="w-1/3 max-h-[400px] shadow-md border border-[#CCD0D5] rounded-[13px] px-3">
                                    <span className="md:text-[18px] text-[14px] font-bold leading-10">Mời bạn bè tham gia</span>
                                    <div className="flex flex-col gap-2">
                                        <div className="w-full justify-between flex px-5 py-2">
                                            <div className="flex gap-3 items-center ">
                                                <img src={recom1} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                                                <span className="text-[14px] font-semibold">Le Nguyen</span>
                                            </div>
                                            <button className="text-[14px] font-semibold text-[#007AFF] outline-none">Mời tham gia</button>
                                        </div>
                                        <hr className="text-[1px] w-[80%] flex justify-center mx-auto" />
                                        <div className="w-full justify-between flex px-5 py-2">
                                            <div className="flex gap-3 items-center ">
                                                <img src={recom2} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                                                <span className="text-[14px] font-semibold">Le Nguyen</span>
                                            </div>
                                            <button className="text-[14px] font-semibold text-[#007AFF] outline-none">Mời tham gia</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="w-[90%] absolute bottom-10 flex justify-between pt-12">
                            <Button tertiary onClick={handleBackPage}>Trở về</Button>
                            <Button secondary onClick={handleNextPage}>Kế tiếp</Button>
                        </div>
                    </div>
                )}
                {currentStep === 4 && (
                    <div className={`step-container justify-start pt-7 pb-3 items-center flex-col gap-10 flex ${slideDirection === 'next' ? 'step-exit-next' : slideDirection === 'prev' ? 'step-exit-prev' : 'step-active'} ${currentStep === 1 ? 'step-active' : ''}`}>
                        <div className="w-[80%] h-[10px] border border-gray rounded-[23px]">
                            <div className="w-3/3 h-full bg-black rounded-s-3xl "></div>
                        </div>
                        <span className="md:text-[25px] text-[14px] font-bold leading-10 pt-14">Bạn hứng thú về chủ đề gì ?</span>
                        <div className="flex flex-wrap w-[80%] px-5 gap-7">
                            {topics.map((topic, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelectTopic(topic)}
                                    className={`text-[20px] font-bold nunito-text border border-[#CCD0D5] rounded-[66px] px-10 py-5 cursor-pointer
                                    ${selectedTopic.includes(topic) ? 'bg-[#45EDA7] text-white' : 'hover:bg-[#f1f2f4]'}`}
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                        <div className="w-[90%] absolute flex bottom-10 justify-between">
                            <Button tertiary onClick={handleBackPage}>Trở về</Button>
                            <Button
                                primary
                                to={config.routes.generatePlan}
                                className=" w-[85px] h-[37px] rounded-lg">Kết thúc</Button>
                        </div>
                    </div>
                )}


            </div>
            {openModelAddTopic && <ModelAddTopic handleClose={() => setOpenModelAddTopic(false)}></ModelAddTopic>}
        </div>
    );
}

export default PlanAI;