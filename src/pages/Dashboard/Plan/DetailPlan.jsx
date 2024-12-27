import hoian from "../../../assets/images/noImages.jpg"
import { MdNotifications, MdOutlineSettings } from "react-icons/md";
import { BsCalendar2Week, BsFillPersonPlusFill, BsFillPinMapFill, BsShare } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import DetailJourney from "../../../modules/plan/DetailJourney/DetailJourney.jsx";
import DetailMember from "../../../modules/plan/members/DetailMember.jsx";
import DetailBudget from "../../../modules/plan/Budget/DetailBudget.jsx"
import Button from "../../../components/Button/Button.jsx";
import { useParams } from "react-router-dom";
import Map from "../../../components/MapCard/Map.jsx";
// import Map22 from "../../../components/MapCard/Map22.jsx";
import ModalEditPlan from "../../../modules/plan/ModalEditPlan.jsx";
import ModalInviteMember from "../../../modules/plan/ModalInviteMember.jsx";
import { getPlanLocation } from "../../../services/planLocation.jsx";
import { notification } from "antd";
import { getMemberByPlanId } from "../../../services/member.js";
import ModalStartPlan from "../../../components/Modal/ModalStartPlan.jsx";
import ModalSoonEndPlan from "../../../components/Modal/ModalSoonEndPlan.jsx";
import MapWithRoute from "../../../components/MapCard/MapDemo.jsx";
import Chat from "../../../components/Chat/Chat.jsx";
import { createPlanRoomChat } from "../../../services/Chat.js";
import { FcGlobe, FcPrivacy } from "react-icons/fc";
import { updatePlanStatus } from "../../../services/joinRequest.js";
import CustomModal from "../../../components/Modal/CustomModal.jsx";
import ModalAllJoinRequest from "../../../components/Modal/ModalAllJoinRequest.jsx";
import { UserContext } from "../../../contexts/UserContext.jsx";
function DetailPlan() {
    const id = useParams();
    const planId = id.id;
    const [activeTab, setActiveTab] = useState("hanhTrinh");
    const [openModalEditPlan, setOpenModalEditPlan] = useState(false);
    const [openModalStartPlan, setOpenModalStartPlan] = useState(false);
    const [openModalInviteMember, setOpenModalInviteMember] = useState(false);
    const [openModalSoonEndPlan, setOpenModalSoonEndPlan] = useState(false);
    const [plan, setPlan] = useState({});
    const [api, contextHolder] = notification.useNotification();
    const [listMember, setListMember] = useState([]);
    const [planLocation, setPlanLocation] = useState([]);
    const [role, setRole] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [groupRoomChat, setGroupRoomChat] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [openModalConfirmChangeStatus, setOpenModalConfirmChangeStatus] = useState(false);
    const [selectedOption, setSelectedOption] = useState(plan?.status);
    const [statusPlan, setStatusPlan] = useState();
    const [openModalAllJoinRequest, setOpenModalAllJoinRequest] = useState(false);
    const { connection, user } = useContext(UserContext);
    // console.log(user);
    const fetchPlanLocation = async () => {
        try {
            const data = await getPlanLocation(planId, 0, 10);
            const res = await getMemberByPlanId(planId);
            setListMember(res.members.data);
            console.log(data);
            setPlan(data.plan);
            setRole(data.plan.role);
            setPlanLocation(data.planLocations.data);
        } catch (error) {
            console.log("Da co loi xay ra")
        }
    }

    useEffect(() => {
        if (planId && user) {
            connection.on("JoinPlan", user?.profile.id, planId);
            console.log("connection ok", planId, user?.profile.id);
            return () => {
                connection.off("LeavePlan", user?.profile.id, planId);
                console.log("leave connection");
            };
        }
    }, [connection, planId])
    const fetchMember = async () => {
        try {
            const res = await getMemberByPlanId(planId);
            setListMember(res.members.data);
            // console.log('hiiiii', res.members.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMember();
        fetchPlanLocation();
    }, [])
    function formatDateRange(estimatedStartDate, estimatedEndDate) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

        const startDate = new Date(estimatedStartDate).toLocaleDateString('vi-VN', options);
        const endDate = new Date(estimatedEndDate).toLocaleDateString('vi-VN', options);

        return `${startDate} đến ${endDate}`;
    }
    // useEffect(() => {

    // }, []);
    const refreshPlanLocations = async (mode) => {
        await fetchPlanLocation();
        if (mode === 'edit') {
            openNotificationWithIcon('success', 'Cập nhật kế hoạch thành công.');
        }
    };
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: 'Thông báo',
            description: description
        });
    };
    // const toggleChat = () => {

    //     setIsChatVisible(!isChatVisible);
    // };
    const handleCreateRoomChat = async () => {
        setIsChatVisible(!isChatVisible);
        if (plan) {
            try {
                console.log(plan);
                const res = await createPlanRoomChat(planId, plan.title);
                console.log(res);
                setGroupRoomChat(res.room);
            } catch (error) {
                console.log(error);
            }
        }

    }


    const options = [
        { label: "Công khai", icon: <FcGlobe />, value: 0 },
        { label: "Riêng tư", icon: <FcPrivacy />, value: 1 },
    ];


    const handleOptionClick = (value) => {
        setIsOpen(false);
        setStatusPlan(value);
        setOpenModalConfirmChangeStatus(true);
    };
    const handleChangeStatus = async () => {
        try {
            const res = await updatePlanStatus(planId);
            console.log(res);
            setSelectedOption(statusPlan);
            setOpenModalConfirmChangeStatus(false)
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className="flex w-full lg:px-10 px-3 h-auto min-h-[630px] gap-10 ">
            <button
                onClick={handleCreateRoomChat}
                className={`fixed items-center justify-center right-[110px] bottom-12 z-10 bg-white rounded-full w-[55px] h-[55px] message-button ${isChatVisible ? 'hidden' : ''}`}>
                <img className="w-[30px] h-[30px] text-center mx-auto" src="data:image/png;base64,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" alt="speech-bubble-with-dots"></img>
            </button>
            {
                isChatVisible &&
                <Chat handleClose={() => setIsChatVisible(false)} plan={plan} groupRoomChat={groupRoomChat}></Chat>
            }
            {
                openModalConfirmChangeStatus
                &&
                <CustomModal
                    title="Thông báo"
                    content="Bạn có chắc chắn muốn chuyển quyền riêng tư của kế hoạch này không?"
                    open={openModalConfirmChangeStatus}
                    onOk={() => handleChangeStatus()}
                    onCancel={() => setOpenModalConfirmChangeStatus(false)}
                    okText="Xác nhận"
                    cancelText="Huỷ"
                />
            }

            <div className="lg:w-3/5 w-full flex flex-col gap-8">
                {!plan ?
                    <Skeleton.Image style={{ width: '100%', height: '100%', borderRadius: '8px' }} active />
                    : <div className="w-full h-[230px] relative">
                        <img src={plan?.avatar || hoian} alt="" className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute top-0 left-0 w-full h-full opacity-15  rounded-lg bg-black"></div>
                        <div className="absolute top-4 right-5 flex gap-3">
                            <button
                                onClick={() => setOpenModalInviteMember(true)}
                                className="flex md:py-1 md:px-3 px-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer gap-2">
                                <BsFillPersonPlusFill />
                                <span className="md:text-[14px] text-[10px]">Mời thành viên</span>
                            </button>
                            <Button
                                leftIcon={selectedOption === 0 ? <FcGlobe /> : <FcPrivacy />}
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] p-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer">
                            </Button>
                            <Button
                                onClick={() => setOpenModalAllJoinRequest(true)}
                                leftIcon={<MdNotifications className="text-[20px] text-[#056649]" />}
                                className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] p-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer">
                            </Button>
                            {
                                openModalAllJoinRequest
                                &&
                                <ModalAllJoinRequest
                                    planId={planId}
                                    onSuccess={fetchMember}
                                    open={() => setOpenModalAllJoinRequest(true)}
                                    onCancel={() => setOpenModalAllJoinRequest(false)}></ModalAllJoinRequest>
                            }
                            {isOpen && (
                                <ul className="absolute top-full left-1/2 mt-2 w-[100px] bg-white border border-[#CCD0D5] rounded-md shadow-lg z-10 ">
                                    {options.map((option, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleOptionClick(option.value)}
                                            className="px-1 py-2 cursor-pointer hover:bg-gray-100 text-[12px] flex items-center space-x-2"
                                        >
                                            <span>{option.icon}</span>
                                            <span>{option.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {
                                role === 0
                                &&
                                <button
                                    onClick={() => setOpenModalEditPlan(true)}
                                    className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] p-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer">
                                    <MdOutlineSettings />
                                </button>
                            }

                        </div>
                        <div className="absolute bottom-4 left-5 flex flex-col gap-2">
                            <span className="text-white md:text-[35px] text-[23px] font-extrabold nunito-text">{plan?.title}</span>
                            <div className="flex md:flex-row flex-col md:gap-10 gap-1">
                                <div className="flex gap-2 text-white  items-center md:text-[18px] text-[14px]">
                                    <BsCalendar2Week className="font-bold" />
                                    <span className="text-white font-bold ">{formatDateRange(plan?.estimatedStartDate, plan?.estimatedEndDate)}</span>
                                </div>
                                <div className="flex gap-2 text-white  items-center  md:text-[18px] text-[14px]">
                                    <BsFillPinMapFill className="font-bold" />
                                    <span className="text-white font-bold ">{plan?.provinceEnd?.provinceName}</span>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className=" flex w-full justify-between items-center">
                    <div className="flex sm:gap-10 gap-2">
                        <button
                            className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "hanhTrinh" ? "text-black font-bold border-b-4 border-black"
                                : "text-zinc-400"}`}
                            onClick={() => setActiveTab("hanhTrinh")}
                        >
                            Hành trình
                        </button>
                        <button
                            className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "thuChi" ? "text-black font-bold border-b-4 border-black"
                                : "text-zinc-400"}`}
                            onClick={() => setActiveTab("thuChi")}
                        >
                            Thu chi
                        </button>
                        <button
                            className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "thanhVien" ? "text-black font-bold border-b-4 border-black"
                                : "text-zinc-400"}`}
                            onClick={() => setActiveTab("thanhVien")}
                        >
                            Thành viên
                        </button>
                    </div>
                    {plan?.status === 0 &&
                        <Button
                            onClick={() => setOpenModalStartPlan(true)}
                            secondary className="text-[15px] sm:w-[120px]" >Bắt đầu</Button>
                    }
                    {plan?.status === 1 &&
                        <button
                            onClick={() => setOpenModalSoonEndPlan(true)}
                            className="text-[15px] bg-[#13C892] font-semibold px-3 py-1 shadow outline-none text-white rounded-md">Đang diễn ra</button>
                    }
                    {plan?.status === 2 &&
                        <button
                            className="text-[15px] bg-[#13C892] font-semibold px-3 py-1 shadow outline-none text-white rounded-md">Kết thúc</button>
                    }
                    {plan?.status === 3 &&
                        <button
                            className="text-[15px] bg-[#FF2424] font-semibold px-3 py-1 shadow outline-none text-white rounded-md">Đã huỷ</button>
                    }

                </div>
                <div className="mt-4">
                    {activeTab === "hanhTrinh" && (
                        <div>
                            <DetailJourney role={role} planId={planId} plan={plan} planLocation={planLocation} listMember={listMember} onSuccess={refreshPlanLocations}></DetailJourney>
                        </div>
                    )}
                    {activeTab === "thuChi" && (
                        <div>
                            <DetailBudget planId={planId}></DetailBudget>

                        </div>
                    )}
                    {activeTab === "thanhVien" && (
                        <div>
                            <DetailMember role={role} planId={planId} listMember={listMember} fetchMember={fetchMember}></DetailMember>
                        </div>
                    )}
                </div>

            </div>
            {contextHolder}
            <Map role={role} plan={plan} planId={planId} planLocation={planLocation} onLocationAdded={refreshPlanLocations} className="w-2/5 object-cover h-[630px] rounded-md lg:flex pt-2 hidden sticky top-[60px]" ></Map>
            {openModalEditPlan && <ModalEditPlan planId={planId} plan={plan} handleClose={() => setOpenModalEditPlan(false)} OnSuccess={() => refreshPlanLocations('edit')}></ModalEditPlan>}
            {openModalInviteMember && <ModalInviteMember planId={planId} handleClose={() => setOpenModalInviteMember(false)}></ModalInviteMember>}
            {openModalStartPlan && <ModalStartPlan planId={planId} handleClose={() => setOpenModalStartPlan(false)} onSuccess={refreshPlanLocations} openNotificationWithIcon={openNotificationWithIcon}></ModalStartPlan>}
            {openModalSoonEndPlan && <ModalSoonEndPlan planId={planId} handleClose={() => setOpenModalSoonEndPlan(false)} onSuccess={refreshPlanLocations} openNotificationWithIcon={openNotificationWithIcon}></ModalSoonEndPlan>}
        </div>
    );
}

export default DetailPlan;