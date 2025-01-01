import avatarDefault from "../../../assets/images/avatarDefault.png"
import coverPhoto from "../../../assets/images/coverPhoto.png"
import ava from "../../../assets/images/ava.jpg";
import ava1 from "../../../assets/images/anh2.jpg";
import ava2 from "../../../assets/images/anh3.jpg";
import anh1 from "../../../assets/images/anh1.jpg"
import anh2 from "../../../assets/images/anh2.jpg"
import anh3 from "../../../assets/images/anh3.jpg"
import gialai from "../../../assets/images/gialai.png"
import location from "../../../assets/images/location.png"
import anh4 from "../../../assets/images/anh4.jpg"
import ModalEditProfile from "../../../modules/profile/ModalEditProfile";
import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { MdAdd, MdEdit, MdKeyboardArrowDown, MdLocationOn, MdMoreHoriz, MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Post from "../../../modules/network/Posts/Post";
import Friend from "../../../components/FriendRequest/Friend";
import { Avatar } from "antd";
import { FcGlobe, FcPrivacy } from "react-icons/fc";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Photo from "../../../components/Album/Photo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { useParams } from "react-router-dom";
import { getUserById } from "../../../services/getUserById";
import { acceptFriendRequest, declineFriendRequest, getMyFriend, removeFriend, revokeFriendRequest, sendFriendRequest } from "../../../services/friend";
import { toast } from "react-toastify";
import { getPostByUserId } from "../../../services/post"
function MyProfile() {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [profile, setProfile] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const id = useParams();
    const [stateFriend, setStateFriend] = useState(4);
    const [listMyFriend, setListMyFriend] = useState([]);
    const [postList, setPostList] = useState([]);
    const fetchUser = async () => {
        const res = await getUserById(id.id);
        setProfile(res.user);
        setStateFriend(res.user.status);
        // console.log(res);
    }
    useEffect(() => {
        fetchUser();
    }, [id.id])
    console.log(profile)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Công khai");

    const options = [
        { label: "Công khai", icon: <FcGlobe /> },
        { label: "Bạn bè", icon: <FcPrivacy /> },
    ];
    const fetchPost = async () => {
        try {
            console.log(id);
            const res = await getPostByUserId(id.id, 0, 10);
            console.log(res);
            setPostList(res.posts.data);

        } catch (error) {
            console.log(error);
        }
    }


    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleAddFriend = async () => {
        try {
            console.log(id.id)
            const res = await sendFriendRequest(id.id);
            setStateFriend(2);
        } catch (error) {
            toast.error(error);
            console.log('Error while sending friend request:', error);
        }
    }
    const handleAcceptFriend = async () => {
        try {
            const res = await acceptFriendRequest(id.id);
            setStateFriend(1);
        } catch (error) {
            toast.error(error);
            console.log('Error while accept friend request:', error);
        }
    }
    const handleDeclineFriend = async () => {
        try {
            const res = await declineFriendRequest(id.id);
            setStateFriend(0);
        } catch (error) {
            toast.error(error);
            console.log('Error while decline friend request:', error);
        }
    }
    const handleRevokeFriend = async () => {
        try {
            const res = await revokeFriendRequest(id.id);
            setStateFriend(0);
        } catch (error) {
            toast.error(error);
            console.log('Error while revoke friend request:', error);
        }
    }
    const handleRemoveFriend = async () => {
        try {
            const res = await removeFriend(id.id);
            setStateFriend(0);
        } catch (error) {
            toast.error(error);
            console.log('Error while remove friend request:', error);
        }
    }
    const handleHideResult = () => {
        setShowTooltip(false);
    }
    const handleButtonClick = () => {
        setShowTooltip(!showTooltip);
    }
    const handleButtonResponseClick = () => {
        setShowResponse(!showResponse);
    }
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const listFriend = await getMyFriend();
                // console.log(listFriend.users.data);
                setListMyFriend(listFriend.users.data);
            } catch (error) {
                console.log('Error while getting my friend request:', error);
            }
        };
        // fetchPost();
        fetchFriends();
    }, []);


    const albums = [
        {
            id: 1,
            name: 'Gia Lai',
            image: gialai,
        },
        {
            id: 2,
            name: 'Vịnh Hạ Long',
            image: anh4,
        },
        {
            id: 3,
            name: 'Ha Giang',
            image: anh3,
        },
        {
            id: 4,
            name: 'Tra Vinh',
            image: anh2,
        },
        {
            id: 5,
            name: 'Hue',
            image: anh1,
        }
    ]
    return (
        <div className="w-full min-h-screen flex h-auto flex-col sm:px-20 pb-5 nunito-text">
            <div className="w-full bg-white border border-[#CCD0D5] sm:h-[350px] h-[520px] flex relative rounded-md sm:justify-normal justify-center">
                <img src={coverPhoto} alt="" className="w-full sm:h-[73%] h-2/3 object-cover absolute top-0 rounded-t-md" />
                <div className="flex sm:justify-between flex-col sm:flex-row  w-full absolute sm:top-[130px] top-[100px] lg:px-10 px-4 items-center">
                    <div className="flex sm:w-3/4 sm:flex-row flex-col items-center sm:gap-2">
                        <div className="flex justify-center items-center relative lg:w-[212px] lg:h-[212px] sm:w-[160px] sm:h-[160px] w-[178px] h-[178px] bg-white rounded-full">
                            <img src={profile?.avatar?.url || avatarDefault} alt="" className="lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[168px] h-[168px] rounded-full object-cover absolute cursor-pointer" />
                        </div>
                        <div className="flex flex-col items-start justify-normal sm:pt-5 sm:h-[160px]">
                            <div className="flex flex-col sm:text-start text-center mx-auto">
                                <div className="text-white font-bold lg:text-[32px] text-[32px] sm:text-[20px] leading-8 cursor-pointer nunito-text">{profile?.userName}</div>
                                <div className="text-white text-[20px] nunito-text ">@kwiwiwiii</div>
                            </div>
                            <div className="flex gap-10 sm:pt-10 ">
                                <div className="flex flex-col justify-center text-center">
                                    <div className="text-[18px] nunito-text font-bold">2.3k</div>
                                    <div className="flex items-center gap-1" >
                                        <div className="flex relative cursor-pointer">
                                            <img src={ava1} alt="" className="w-[32px] h-[32px] rounded-full" />
                                            <img src={ava2} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                                            <img src={ava} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                                        </div>
                                        <div className="text-[13px] nunito-text">Bạn bè</div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-center">
                                    <div className="text-[18px] nunito-text font-bold">21</div>
                                    <div className="text-[13px] leading-8 nunito-text">Bài đăng</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {stateFriend === 4 ? (
                        <div className="flex sm:gap-5 gap-2 sm:w-1/2 w-full justify-end sm:flex-row sm:items-end flex-col sm:pt-[120px] pt-5">
                            {/* <Button
                                // onClick={handle}
                                className="lg:w-[140px] sm:w-[37px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px] px-2" hide leftIcon={<MdAdd className="font-bold" />}>Tạo bài viết</Button> */}
                            <div className="flex gap-1">
                                <Button
                                    onClick={() => setOpenModalEdit(true)}
                                    className="lg:w-[250px] sm:w-[37px]  w-full  h-[37px] rounded-lg bg-[#E4E6EB] hover:bg-[#CCD0D5] transition-all duration-150 md:text-base text-[16px] text-black px-2" hide leftIcon={<MdEdit />}>Chỉnh sửa thông tin cá nhân</Button>
                                <Button className="w-[37px] bg-[#E4E6EB] h-[37px] transition-all duration-150 md:text-base text-[16px] text-black rounded-lg block sm:hidden"> <MdKeyboardArrowDown /></Button>
                            </div>
                        </div>

                    ) :
                        (
                            <div className="flex sm:gap-5 gap-2 sm:w-1/2 w-full justify-end sm:flex-row flex-col items-end sm:pt-[120px] pt-5">
                                {stateFriend === 0 &&
                                    <Button onClick={handleAddFriend} className="lg:w-[140px] sm:w-[37px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px] px-2" hide leftIcon={<BsFillPersonPlusFill />}>Thêm bạn bè</Button>}
                                {stateFriend === 1 && (
                                    <div className="relative inline-block">
                                        <Button onClick={handleButtonClick} className="lg:w-[100px] sm:w-[37px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px] px-2" hide leftIcon={<BsFillPersonCheckFill />}>Bạn bè</Button>
                                        {showTooltip &&
                                            <div id="dropdownInformation" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md border border-[#E4E6EB] w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-10">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button onClick={handleRemoveFriend} className="w-full text-start block px-4 py-2 hover:bg-gray-200 ">Huỷ kết bạn</button>
                                                    </li>
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button className=" w-full text-start block px-4 py-2 ">Bỏ theo dõi</button>
                                                    </li>
                                                </ul>
                                            </div>}
                                    </div>
                                )}
                                {stateFriend === 2 &&
                                    <Button onClick={handleRevokeFriend} className="lg:w-[130px] sm:w-[37px] w-full bg-[#E4E6EB] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 md:text-base text-black text-[16px] px-2" hide leftIcon={<BsFillPersonXFill />}>Huỷ yêu cầu</Button>}
                                {stateFriend === 3 &&
                                    <div className="relative inline-block">
                                        <Button onClick={handleButtonResponseClick} className="lg:w-[130px] sm:w-[37px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px] px-2" hide leftIcon={<BsFillPersonCheckFill />}>Phản hồi</Button>
                                        {showResponse &&
                                            <div id="dropdownInformation" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md border border-[#E4E6EB] w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-10">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button onClick={handleAcceptFriend} className="w-full text-start block px-4 py-2 hover:bg-gray-200 ">Chấp nhận lời mời</button>
                                                    </li>
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button onClick={handleDeclineFriend} className=" w-full text-start block px-4 py-2 ">Xoá lời mời</button>
                                                    </li>
                                                </ul>
                                            </div>}
                                    </div>
                                }
                                <div className="flex gap-1">
                                    <Button className="lg:w-[130px] sm:w-[37px]  w-full bg-[#E4E6EB] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 md:text-base text-[16px] text-black px-2" hide leftIcon={<AiFillMessage />}>Nhắn tin</Button>
                                    <Button className="w-[37px] bg-[#E4E6EB] h-[37px] transition-all duration-150 md:text-base text-[16px] text-black rounded-lg block sm:hidden"> <MdKeyboardArrowDown /></Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
            <div className="w-full flex mt-5 lg:gap-10 gap-5 md:flex-row flex-col">
                <div className="lg:w-3/12 md:w-5/12 w-full flex flex-col gap-5">
                    {/* Giối thiệu */}
                    <div className="w-full bg-white border border-[#CCD0D5] h-[142px] rounded-md">
                        <div className="flex w-full justify-between px-5 items-center py-3">
                            <span className="text-[#757575]">Giới thiệu</span>
                            <MdEdit className="text-[#757575] cursor-pointer" />
                        </div>
                        <div className="flex gap-2 px-3 pb-3">
                            <MdLocationOn className="text-[25px] text-[#1478B9]" />
                            <span className="text-[15px]">Đến từ <b>{profile?.address?.province}</b></span>
                        </div>
                        <div className="flex gap-2 px-4">
                            <MdOutlineEmail className="text-[20px] text-[#1478B9]" />
                            <span className="text-[15px]">{profile?.email}</span>
                        </div>

                    </div>
                    {/* Chuyến đi sắp tới */}
                    <div className="w-full bg-white border border-[#CCD0D5] h-[228px] rounded-md sm:block hidden    ">
                        <div className="flex w-full h-4/5 relative">
                            <img src={gialai} alt="" className="w-full h-full rounded-md" />
                            <div className="flex absolute bottom-4 left-8 w-[71px] h-[67px] rounded-md flex-col">
                                <div className="w-full h-2/5 bg-[#3D9AFF] flex items-center justify-center font-bold text-[14px] rounded-t-md">Tháng 1</div>
                                <div className="flex h-3/5 w-full bg-white rounded-b-md justify-center items-center font-bold text-[18px]">30</div>
                            </div>
                        </div>
                        <div className="flex w-full h-1/5 justify-between px-2 pt-1">
                            <div className="flex flex-col">
                                <span className="font-bold">2 ngày 1 đêm ở Đà Lạt</span>
                                <span className="text-[#616161] text-[11px] font-bold">17/9/2024 - 7/10/2024</span>
                            </div>
                            <div className="text-[13px] font-semibold text-[#1270B0] pt-2 cursor-pointer">Chi tiết</div>
                        </div>
                    </div>
                    {/* Danh sách bạn bè */}
                    {stateFriend === 4 &&
                        <div className="w-full bg-white border border-[#CCD0D5] h-auto py-2 rounded-md flex flex-col" >
                            <div className="flex w-full justify-between px-5 pt-2">
                                <span className="text-[#757575]">Bạn bè</span>
                                <a href="#" className="text-[#1270B0] cursor-pointer font-medium text-[14px]">Danh sách</a>
                            </div>
                            <div className="grid grid-cols-3 w-full px-4 ">
                                {
                                    listMyFriend.slice(0, 6).map((friend) => (
                                        <Friend friend={friend} key={friend.id}></Friend>
                                    ))
                                }
                            </div>
                        </div>
                    }

                </div>

                <div className="sm:w-7/12 w-full flex flex-col gap-5">
                    {/* Chia sẻ bài viết */}
                    <div className="w-full bg-white border border-[#CCD0D5] h-[155px] rounded-md px-3 gap-1 flex flex-col">
                        <div className="flex justify-between  pt-3">
                            <div className="flex gap-2">
                                <div className="flex px-3 text-[#0F3E4A] bg-[#FFEDE8] border border-[#FDDFDF] hover:bg-[#fee5de] duration-200 text-[12px] font-bold rounded-[20px] py-1 cursor-pointer">Trạng thái</div>
                                <div className="flex px-3 text-[#0F3E4A] bg-[#D9FFF1] border border-[#A0FFD7] hover:bg-[#c5f7e5] duration-200 text-[12px] font-bold rounded-[20px] py-1 cursor-pointer">Ảnh</div>
                                <div className="flex px-3 text-[#0F3E4A] bg-[#C8E7FF] border border-[#4FBAFF] hover:bg-[#bce1fe] duration-200 text-[12px] font-bold rounded-[20px] py-1 cursor-pointer">Video</div>
                            </div>
                            <MdMoreHoriz className="cursor-pointer" />
                        </div>
                        <div className="flex cursor-pointer items-center gap-7 w-full py-1">
                            <Avatar
                                src={profile?.avatar?.url || avatarDefault}
                                alt=""
                                className="rounded-90 h-[30px] w-[30px] sm:h-[51px] sm:w-[52px]"
                            />
                            <span className="text-[11px] text-[#979797] sm:text-[14px]">
                                Kể về chuyến đi của bạn nào Bach Duong!
                            </span>
                        </div>
                        <hr className='border border-[#EFEFEF] w-[90%] mx-auto  ' />
                        <div className="flex justify-between px-2 sm:pt-1 pt-2">
                            <div className="flex gap-2 items-center">
                                <img src={location} alt="" className="" />
                                <div className="text-[#0F3E4A] text-[13px] cursor-pointer font-bold">Chọn chuyến đi</div>
                            </div>
                            <div className="flex  gap-3">
                                <div className="relative">
                                    <Button
                                        onClick={() => setIsOpen(!isOpen)}
                                        normalBtn leftIcon={selectedOption === "Công khai" ? <FcGlobe /> : <FcPrivacy />} rightIcon={<FaAngleDown />}>{selectedOption}</Button>
                                    {isOpen && (
                                        <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-[#CCD0D5] rounded-md shadow-lg z-10 ">
                                            {options.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleOptionClick(option.label)}
                                                    className="px-1 py-2 cursor-pointer hover:bg-gray-100 text-[12px] flex items-center space-x-2"
                                                >
                                                    <span>{option.icon}</span>
                                                    <span>{option.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <Button primary className="text-[12px]  rounded-lg">Chia sẻ</Button>
                            </div>

                        </div>
                    </div>
                    <div className="">
                        {/* {
                            postList.map((data, index) => (
                                <Post key={index} data={data}></Post>
                            ))
                        } */}
                    </div>
                    {/* các bài post */}
                    {/* <div className="mt-6 sm:px-0 px-1">
                        {dataPost.map((data, index) => (
                            <Post key={index} data={data}></Post>
                        ))}
                    </div> */}
                </div>
                {/* album  */}
                <div className="sm:w-3/12 w-full lg:flex hidden bg-white border border-[#CCD0D5] h-[630px] flex-col rounded-md">
                    <div className="flex w-full justify-between px-5 pt-4 ">
                        <span className="text-[#757575]">Album của tôi</span>
                        <a href="#" className="text-[#1270B0] cursor-pointer font-medium text-[14px]">Xem tất cả</a>
                    </div>
                    <div className="flex h-full flex-1 flex-col items-center justify-between py-2 relative gap-2">
                        <button className="custom-prev text-gray-600 hover:text-blue-600 absolute top-0 left-1/2 transform -translate-x-1/2 cursor-pointer w-[100px] text-center justify-center flex h-[20px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 text-blue-500"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7-7-7 7" />
                            </svg>
                        </button>
                        <div className="flex-1 h-full overflow-hidden">
                            <Swiper
                                modules={[Navigation]}
                                direction="vertical"
                                navigation={{
                                    nextEl: ".custom-next",
                                    prevEl: ".custom-prev",
                                }}
                                spaceBetween={0}
                                slidesPerView={3}
                                className="h-[570px]"
                            >
                                {albums.map((photo) => (
                                    <SwiperSlide key={photo.id} className="flex justify-center items-center px-4">
                                        <Photo photo={photo} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <button className=" custom-next text-gray-600 hover:text-blue-600 absolute bottom-0 left-1/2 transform -translate-x-1/2  w-[100px] text-center justify-center flex h-[20px] cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 text-blue-400"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7 7 7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {openModalEdit && <ModalEditProfile myId={1} handleClose={() => setOpenModalEdit(false)} onSuccess={fetchUser}></ModalEditProfile>}
        </div>
    );
}

export default MyProfile;