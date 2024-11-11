import { MdAdd, MdCheck, MdEdit, MdFilterList, MdKeyboardArrowDown, MdOutlineSettings } from "react-icons/md";
import ava from "../../../assets/images/ava.jpg";
import ava1 from "../../../assets/images/anh2.jpg";
import ava2 from "../../../assets/images/anh3.jpg";
import Button from "../../../components/Button/Button";
import Posts from "../../../modules/network/Posts";
import avatarDefault from "../../../assets/images/avatarDefault.png"
import { useContext, useEffect, useReducer, useState } from "react";
import ModalEditProfile from "../../../modules/profile/ModalEditProfile";
import { UserContext } from "../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../services/getUserById";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import { acceptFriendRequest, declineFriendRequest, removeFriend, revokeFriendRequest, sendFriendRequest } from "../../../services/friend";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
function Profile() {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [profile, setProfile] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const id = useParams();
    const [stateFriend, setStateFriend] = useState(null);
    const fetchUser = async () => {
        const res = await getUserById(id.id);
        setProfile(res.user);
        setStateFriend(res.user.status);
    }
    useEffect(() => {
        fetchUser();
    }, [id.id])

    const handleAddFriend = async () => {
        try {
            console.log(id.id)
            const res = await sendFriendRequest(id.id);
            setStateFriend(2);
        } catch {
            console.error('Error while sending friend request:', error);
        }
    }
    const handleAcceptFriend = async () => {
        try {
            const res = await acceptFriendRequest(id.id);
            setStateFriend(1);
        } catch {
            console.error('Error while accept friend request:', error);
        }
    }
    const handleDeclineFriend = async () => {
        try {
            const res = await declineFriendRequest(id.id);
            setStateFriend(0);
        } catch (error) {
            console.log('Error while decline friend request:', error);
        }
    }
    const handleRevokeFriend = async () => {
        try {
            const res = await revokeFriendRequest(id.id);
            setStateFriend(0);
        } catch {
            console.error('Error while revoke friend request:', error);
        }
    }
    const handleRemoveFriend = async () => {
        try {
            const res = await removeFriend(id.id);
            setStateFriend(0);
        } catch (error) {
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

    // const handle = () => {
    //     const lat = 16.0736606;
    //     const lng = 108.149869;

    //     fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
    //         .then(response => response.json())
    //         .then(data => {
    //             const locationName = data.display_name;
    //             console.log('Tên địa điểm:', locationName);
    //         })
    //         .catch(error => console.error('Lỗi:', error));
    // }
    return (
        <div className="w-full flex md:px-10 min-h-screen h-auto flex-col gap-5 ">
            <div className="w-full bg-white sm:h-[340px] h-[500px] flex relative rounded-md sm:justify-normal justify-center">
                <img src={null || avatarDefault} alt="" className="w-full sm:h-1/2 h-1/3 object-cover absolute top-0 rounded-md" />
                <div className="opacity-50 absolute top-0 bg-black w-full sm:h-1/2 h-1/3  rounded-md"></div>
                <div className="flex sm:justify-between flex-col sm:flex-row  w-full absolute sm:top-[120px] top-[100px] lg:px-10 px-4 items-center">
                    <div className="flex sm:w-3/4 sm:flex-row flex-col items-center sm:gap-5">
                        <div className="flex justify-center items-center relative lg:w-[212px] lg:h-[212px] sm:w-[160px] sm:h-[160px] w-[178px] h-[178px] bg-white rounded-full">
                            <img src={null || avatarDefault} alt="" className="lg:w-[200px] lg:h-[200px] sm:w-[150px] sm:h-[150px] w-[168px] h-[168px] rounded-full object-cover absolute cursor-pointer" />
                        </div>
                        <div className="flex flex-col  gap-1 sm:items-start items-center md:pt-8">
                            <div className="text-black font-bold lg:text-[32px] text-[32px] sm:text-[20px]  cursor-pointer"> {profile ? profile.userName : "Name User"}</div>
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
                    {stateFriend === 4 ? (
                        <div className="flex sm:gap-5 gap-2 sm:w-1/2 w-full  pt-3 justify-end sm:flex-row flex-col">
                            <Button
                                // onClick={handle}
                                className="lg:w-[140px] sm:w-[37px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px] px-2" hide leftIcon={<MdAdd />}>Tạo bài viết</Button>
                            <div className="flex gap-1">
                                <Button
                                    onClick={() => setOpenModalEdit(true)}
                                    className="lg:w-[250px] sm:w-[37px]  w-full bg-[#E4E6EB] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 md:text-base text-[16px] text-black px-2" hide leftIcon={<MdEdit />}>Chỉnh sửa thông tin cá nhân</Button>
                                <Button className="w-[37px] bg-[#E4E6EB] h-[37px] transition-all duration-150 md:text-base text-[16px] text-black rounded-lg block sm:hidden"> <MdKeyboardArrowDown /></Button>
                            </div>
                        </div>
                    ) :
                        (
                            <div className="flex sm:gap-5 gap-2 sm:w-1/2 w-full  pt-3 justify-end sm:flex-row flex-col">
                                {stateFriend === 0 &&
                                    <Button onClick={handleAddFriend} className="lg:w-[140px] sm:w-[37px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px] px-2" hide leftIcon={<BsFillPersonPlusFill />}>Thêm bạn bè</Button>}
                                {stateFriend === 1 && (
                                    <div className="relative inline-block">
                                        <Button onClick={handleButtonClick} className="lg:w-[100px] sm:w-[37px] w-full bg-[#007AFF] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150 md:text-base text-white text-[16px] px-2" hide leftIcon={<BsFillPersonCheckFill />}>Bạn bè</Button>
                                        {showTooltip &&
                                            <div id="dropdownInformation" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md border border-[#E4E6EB] w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-10">
                                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button onClick={handleRemoveFriend} class="w-full text-start block px-4 py-2 hover:bg-gray-200 ">Huỷ kết bạn</button>
                                                    </li>
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button class=" w-full text-start block px-4 py-2 ">Bỏ theo dõi</button>
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
                                            <div id="dropdownInformation" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md border border-[#E4E6EB] w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-10">
                                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button onClick={handleAcceptFriend} class="w-full text-start block px-4 py-2 hover:bg-gray-200 ">Chấp nhận lời mời</button>
                                                    </li>
                                                    <li className=" hover:bg-[#E4E6EB] w-full">
                                                        <button onClick={handleDeclineFriend} class=" w-full text-start block px-4 py-2 ">Xoá lời mời</button>
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
            <div className="bg-white w-full h-[87px] flex justify-between px-10 items-center">
                <div className="text-black font-bold lg:text-[30px] text-[25px] sm:text-[20px]">Bài viết</div>
                <div className="flex gap-3">
                    <Button className="bg-[#E4E6EB] lg:w-[] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 text-[16px] text-black px-2" leftIcon={<MdFilterList />} hide>Bộ lọc</Button>
                    {stateFriend === 4 && <Button className="bg-[#E4E6EB] h-[37px] rounded-lg hover:bg-[#CCD0D5] transition-all duration-150 sm:text-[16px] text-black px-2" leftIcon={<MdOutlineSettings />} hide>Quản lý bài viết</Button>}
                </div>
            </div>
            <Posts></Posts>
            {openModalEdit && <ModalEditProfile handleClose={() => setOpenModalEdit(false)}></ModalEditProfile>}
        </div>
    );
}

export default Profile;