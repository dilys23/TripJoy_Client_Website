import { MdAdd, MdEdit, MdFilterList, MdKeyboardArrowDown, MdOutlineSettings } from "react-icons/md";
import ava from "../../../assets/images/anh1.jpg";
import ava1 from "../../../assets/images/anh2.jpg";
import ava2 from "../../../assets/images/anh3.jpg";
import Button from "../../../components/Button/Button";
import Posts from "../../../modules/network/Posts";
function Profile() {
    return (
        <div className="w-full flex md:px-10 min-h-[780px] h-auto flex-col gap-5">
            <div className="w-full bg-white sm:h-[340px] h-[500px] flex relative rounded-md sm:justify-normal justify-center">
                <img src={ava} alt="" className="w-full sm:h-1/2 h-1/3 object-cover absolute top-0 rounded-md" />
                <div className="opacity-50 absolute top-0 bg-black w-full sm:h-1/2 h-1/3  rounded-md"></div>
                <div className="flex sm:justify-between flex-col sm:flex-row  w-full absolute sm:top-[120px] top-[100px] px-10 items-center">
                    <div className="flex sm:flex-row flex-col items-center sm:gap-5">
                        <div className="flex justify-center items-center relative lg:w-[212px] lg:h-[212px] sm:w-[160px] sm:h-[160px] w-[178px] h-[178px] bg-white rounded-full">
                            <img src={ava} alt="" className="lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[168px] h-[168px] rounded-full object-cover absolute cursor-pointer" />
                        </div>
                        <div className="flex flex-col  gap-1 sm:items-start items-center md:pt-8">
                            <div className="text-black font-bold text-[32px] cursor-pointer">Bạch Dương</div>
                            <div className="flex gap-1 text-[15px] text-[#B3B3B3] font-semibold">
                                <span>12</span>
                                <span>bạn bè</span>
                            </div>
                            <div className="flex relative cursor-pointer">
                                <img src={ava1} alt="" className="w-[32px] h-[32px] rounded-full" />
                                <img src={ava2} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                                <img src={ava} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                            </div>
                        </div>

                    </div>
                    <div className="flex sm:gap-5 gap-2 sm:w-1/2 w-full sm:px-10 pt-3 justify-end sm:flex-row flex-col">
                        <Button className="md:w-[120px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px]" leftIcon={<MdAdd />}>Tạo bài viết</Button>
                        <div className="flex gap-1">
                            <Button className="md:w-[240px] w-full bg-[#E4E6EB] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 md:text-base text-[16px] text-black" leftIcon={<MdEdit />}>Chỉnh sửa thông tin cá nhân</Button>
                            <Button className="w-[37px] bg-[#E4E6EB] h-[37px] transition-all duration-150 md:text-base text-[16px] text-black rounded-lg block sm:hidden"> <MdKeyboardArrowDown /></Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white w-full h-[87px] flex justify-between px-10 items-center">
                <div className="text-black font-bold text-[30px]">Bài viết</div>
                <div className="flex gap-3">
                    <Button className="bg-[#E4E6EB] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 text-[16px] text-black px-2" leftIcon={<MdFilterList />}>Bộ lọc</Button>
                    <Button className="bg-[#E4E6EB] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 text-[16px] text-black px-2" leftIcon={<MdOutlineSettings />}>Quản lý bài viết</Button>
                </div>
            </div>
            <Posts></Posts>
        </div>
    );
}

export default Profile;