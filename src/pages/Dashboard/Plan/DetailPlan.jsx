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
import ModalEditPlan from "../../../modules/plan/ModalEditPlan.jsx";
import ModalInviteMember from "../../../modules/plan/ModalInviteMember.jsx";
import { getPlanLocation } from "../../../services/planLocation.jsx";
import { notification } from "antd";
import { endPlanService, startPlanService } from "../../../services/statusPlanService.js";
import { getMemberByPlanId } from "../../../services/member.js";
function DetailPlan() {
    const id = useParams();
    const planId = id.id;
    const [activeTab, setActiveTab] = useState("hanhTrinh");
    const [openModalEditPlan, setOpenModalEditPlan] = useState(false);
    const [openModalInviteMember, setOpenModalInviteMember] = useState(false);
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
    const handleStartPlan = async () => {
        try {
            const response = await startPlanService(planId);
            if (response) {
                openNotificationWithIcon('success', 'Chúc bạn có chuyến hành trình vui vẻ !');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handlePausePlan = async () => {
        try {
            const response = await endPlanService(planId);
            if (response) {
                openNotificationWithIcon('success', 'Hãy chia sẻ chuyến đi của bạn với mọi ngưỜi');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex w-full lg:px-10 px-3 h-auto min-h-[630px] gap-10 md:pt-3 ">
            {/* <button className="fixed right-[120px] bottom-2 z-10">
                <img width="30" height="30" src="https://img.icons8.com/fluency/48/facebook-messenger--v1.png" alt="facebook-messenger--v1" />
            </button> */}
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
                    <Button
                        onClick={handleStartPlan}
                        secondary className="text-[15px] w-[120px]" >Bắt đầu</Button>
                </div>
                <div className="mt-4">
                    {activeTab === "hanhTrinh" && (
                        <div>
                            <DetailJourney planId={planId} plan={plan} planLocation={planLocation} listMember={listMember} onSuccess={refreshPlanLocations}></DetailJourney>
                        </div>
                    )}
                    {activeTab === "thuChi" && (
                        <div>
                            <DetailBudget></DetailBudget>

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
            <Map plan={plan} planId={planId} planLocation={planLocation} onLocationAdded={refreshPlanLocations} className="w-2/5 object-cover h-[600px] rounded-md lg:flex  hidden sticky top-[80px]" ></Map>
            {openModalEditPlan && <ModalEditPlan planId={planId} plan={plan} handleClose={() => setOpenModalEditPlan(false)} OnSuccess={() => refreshPlanLocations('edit')}></ModalEditPlan>}
            {openModalInviteMember && <ModalInviteMember planId={planId} handleClose={() => setOpenModalInviteMember(false)}></ModalInviteMember>}
        </div>
    );
}

export default DetailPlan;