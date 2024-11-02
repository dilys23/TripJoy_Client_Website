import { FaCalendarDay, FaMapMarkedAlt, FaMoneyCheckAlt } from "react-icons/fa";
import image from "../../../assets/images/anh1.jpg"
import { MdArrowBack, MdGroups } from "react-icons/md";
import Button from "../../../components/Button/Button";
import TextArea from "../../../components/Input/TextArea";
import map from "../../../assets/images/map.png"
import { Link } from "react-router-dom";
import config from "../../../config";
import ExpenseList from "../../../components/ExpenseDetails/ExpenseList"
function SharePost() {
    return (
        <div className="w-full h-screen ">
            <div className="mx-5 bg-white w-full h-full flex flex-row gap-6">
                <div className="flex flex-col w-1/4 p-4 pl-8 ">
                    <p className="nunito-text font-bold text-[28px] text-start leading-[35px]">Viết về chuyến đi của bạn !</p>
                    <div className="p-3 border border-[#aeaeae] rounded-[10px] flex flex-col h-[500px]">
                        <img src={image} alt="" className="w-[100%] h-[275px] object-cover" />
                        <div className="nunito-text font-bold text-[20px] text-start pt-3 leading-[25px]">Hai ngày một đêm ở Hà Giang</div>
                        <div className='flex flex-col gap-4 pt-1'>
                            <div className='flex gap-3 items-center'>
                                <FaMapMarkedAlt className='w-[30px] h-[23px] text-red-500 text-[27px]'></FaMapMarkedAlt>
                                <p className='nunito-text font-bold text-[15px] '>Lủng Cú, Hà Giang </p>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <FaCalendarDay className='w-[30px] h-[23px] text-[#4979d1] text-[27px]'></FaCalendarDay>
                                <p className='nunito-text font-bold text-[15px] '>13/7 - 20/7/2024</p>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <FaMoneyCheckAlt className='w-[30px] h-[23px] text-[#96c362] text-[27px]'></FaMoneyCheckAlt>
                                <p className='nunito-text font-bold text-[15px] text-[#e48055]'>1.500.000 đ</p>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <MdGroups className='w-[30px] h-[23px] text-[#4979d1] text-[27px]'></MdGroups>
                                <p className='flex gap-1 nunito-text font-medium text-[15px] '>
                                    <p>3</p>
                                    <p>thành viên</p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button to={config.routes.network} primary width="150px" height="40px" className="mt-5 pl-1 rounded-lg" leftIcon={<MdArrowBack />}>Trở về trang chủ</Button>
                </div>
                <div className="border border-l-[1px] border-[#aeaeae] h-[90%] mt-[50px] w-[2px]"></div>
                <div className="flex flex-col w-2/4 p-4 gap-2">
                    <div className="nunito-text text-[24px] font-semibold">Tiêu đề</div>
                    <TextArea width="w-full" height="70px" placeholder="VIết tiêu đề của chuyến đi của bạn"></TextArea>
                    <div className="nunito-text text-[24px] font-semibold mt-2">Chi tiết</div>
                    <TextArea width="w-full" height="220px" placeholder="Chia sẻ kinh nghiệm về chuyến đi của bạn"></TextArea>
                    <div className="nunito-text text-[24px] font-semibold mt-2">Ảnh</div>
                </div>
                <div className="w-1/4 flex flex-col gap-3">
                    <img src={map} alt="" className="w-[385px] h-[370px] mt-[50px] rounded-[10px] object-cover" />
                    <div className="flex flex-col">
                        <div className="nunito-text text-[24px] font-semibold">Lịch sử</div>
                        <ExpenseList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SharePost;