import hoian from "../../../assets/images/noImages.jpg"
import { MdOutlineSettings } from "react-icons/md";
import { BsCalendar2Week, BsFillPersonPlusFill, BsFillPinMapFill, BsShare } from "react-icons/bs";
import { useEffect, useState } from "react";
import DetailJourney from "../../../modules/plan/DetailJourney/DetailJourney.jsx";
import DetailMember from "../../../modules/plan/members/DetailMember.jsx";
import DetailBudget from "../../../modules/plan/Budget/DetailBudget.jsx"
import Button from "../../../components/Button/Button.jsx";
import { useParams } from "react-router-dom";
import Map from "../../../components/MapCard/Map.jsx";
import Map22 from "../../../components/MapCard/Map22.jsx";
import ModalEditPlan from "../../../modules/plan/ModalEditPlan.jsx";
import ModalInviteMember from "../../../modules/plan/ModalInviteMember.jsx";
import { getPlanLocation } from "../../../services/planLocation.jsx";
import { notification } from "antd";
import { getMemberByPlanId } from "../../../services/member.js";
import ModalStartPlan from "../../../components/Modal/ModalStartPlan.jsx";
import ModalSoonEndPlan from "../../../components/Modal/ModalSoonEndPlan.jsx";
import MapWithRoute from "../../../components/MapCard/MapDemo.jsx";
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


    return (
        <div className="flex w-full lg:px-10 px-3 h-auto min-h-[630px] gap-10 md:pt-3 ">
            <button className="fixed items-center justify-center right-[110px] bottom-12 z-10 bg-white rounded-full w-[55px] h-[55px] message-button">
                {/* <img className="w-[30px] h-[30px] text-center mx-auto" src="data:image/png;base64,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" alt="speech-bubble-with-dots"></img> */}
                {/* <img width="50" height="90" src="https://img.icons8.com/scribby/50/speech-bubble-with-dots.png" alt="speech-bubble-with-dots" className="w-[60px] h-[40px]" /> */}
            </button>
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
                            <button className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] p-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer">
                                <BsShare />
                            </button>
                            <button
                                onClick={() => setOpenModalEditPlan(true)}
                                className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] p-2 items-center justify-center bg-white hover:bg-[#f2f2f2] rounded-full  cursor-pointer">
                                <MdOutlineSettings />
                            </button>
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
                    <div className="flex gap-10">
                        <button
                            className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "hanhTrinh" ? "border-b-4 border-black font-bold" : ""}`}
                            onClick={() => setActiveTab("hanhTrinh")}
                        >
                            Hành trình
                        </button>
                        <button
                            className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "thuChi" ? "border-b-4 border-black font-bold" : ""}`}
                            onClick={() => setActiveTab("thuChi")}
                        >
                            Thu chi
                        </button>
                        <button
                            className={`font-semibold md:text-[18px] cursor-pointer ${activeTab === "thanhVien" ? "border-b-4 border-black font-bold" : ""}`}
                            onClick={() => setActiveTab("thanhVien")}
                        >
                            Thành viên
                        </button>
                    </div>
                    {plan?.status === 0 &&
                        <Button
                            onClick={() => setOpenModalStartPlan(true)}
                            secondary className="text-[15px] w-[120px]" >Bắt đầu</Button>
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
                            <DetailJourney planId={planId} plan={plan} planLocation={planLocation} listMember={listMember} onSuccess={refreshPlanLocations}></DetailJourney>
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
            {/* <Map22></Map22> */}
            {/* <MapWithRoute></MapWithRoute> */}
            <Map plan={plan} planId={planId} planLocation={planLocation} onLocationAdded={refreshPlanLocations} className="w-2/5 object-cover h-[600px] rounded-md lg:flex  hidden sticky top-[80px]" ></Map>
            {openModalEditPlan && <ModalEditPlan planId={planId} plan={plan} handleClose={() => setOpenModalEditPlan(false)} OnSuccess={() => refreshPlanLocations('edit')}></ModalEditPlan>}
            {openModalInviteMember && <ModalInviteMember planId={planId} handleClose={() => setOpenModalInviteMember(false)}></ModalInviteMember>}
            {openModalStartPlan && <ModalStartPlan planId={planId} handleClose={() => setOpenModalStartPlan(false)} onSuccess={refreshPlanLocations} openNotificationWithIcon={openNotificationWithIcon}></ModalStartPlan>}
            {openModalSoonEndPlan && <ModalSoonEndPlan planId={planId} handleClose={() => setOpenModalSoonEndPlan(false)} onSuccess={refreshPlanLocations} openNotificationWithIcon={openNotificationWithIcon}></ModalSoonEndPlan>}
        </div >
    );
}

export default DetailPlan;