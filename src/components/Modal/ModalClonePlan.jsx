import { Input, Modal, Space } from "antd";
import { useState } from "react";
import { DatePicker } from 'antd';
import InputWithLabel from "../Input/InputWithLabel";
import dayjs from "dayjs";
import RoutingMap from "../MapCard/RoutingMap";
import toast from "react-hot-toast";
import addGenarateTripbyAI from "../../services/addGenarateTripbyAI";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
function ModalClonePlan({
    plan,
    open,
    handleClose
}) {

    const [clonePlan, setClonePlan] = useState(plan);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const disabledDate = (current) => {
        return current && current < dayjs().startOf("day");
    };
    const handleChange = (key, value) => {
        setClonePlan((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const validateForm = () => {
        const errors = {};

        if (!clonePlan.namePlan) errors.namePlan = "Vui lòng điền tên chuyến đi";
        // Validate start and end dates
        if (!clonePlan.planStartDate) errors.planStartDate = "Vui lòng nhập ngày bắt đầu";
        if (!clonePlan.planEndDate) errors.planEndDate = "Vui lòng nhập ngày kết thúc";
        if (clonePlan.planStartDate && clonePlan.planEndDate && dayjs(clonePlan.planStartDate).isAfter(dayjs(clonePlan.planEndDate))) {
            errors.planStartDate = "Ngày bắt đầu không được sau ngày kết thúc";
            errors.planEndDate = "Ngày kết thúc không được trước ngày bắt đầu";
        }

        // Validate the budget
        if (!clonePlan.budget) errors.budget = "Vui lòng điền ngân sách";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const updatePlanDates = (startDate, endDate) => {
        setClonePlan((prevPlan) => ({
            ...prevPlan,
            planStartDate: startDate,
            planEndDate: endDate,
        }));
    };
    const updatePlanLocations = (startDate) => {
        const startDay = dayjs(startDate); // Ngày bắt đầu mới
        console.log("111");

        if (!Array.isArray(clonePlan.postPlanLocations)) {
            console.log("2222");
            console.error("PlanLocations không phải là một mảng hợp lệ:", clonePlan.postPlanLocations);
            return;
        }

        console.log("3333");

        // Nhóm các địa điểm theo ngày ban đầu
        const groupedByDate = clonePlan.postPlanLocations.reduce((acc, location) => {
            const date = dayjs(location.EstimatedStartDate).format("YYYY-MM-DD");
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(location);
            return acc;
        }, {});

        // Tính toán ngày mới dựa trên ngày bắt đầu
        const newDates = Object.keys(groupedByDate).sort(); // Sắp xếp ngày ban đầu
        const updatedLocations = [];

        newDates.forEach((originalDate, offset) => {
            const newDate = startDay.add(offset, "day").format("YYYY-MM-DD");
            groupedByDate[originalDate].forEach((location) => {
                updatedLocations.push({
                    ...location,
                    EstimatedStartDate: newDate, // Gán ngày mới
                });
            });
        });

        // Cập nhật state
        setClonePlan((prevPlan) => ({
            ...prevPlan,
            postPlanLocations: updatedLocations,
        }));
    };

    const handleUpdatePlan = (startDate, endDate) => {
        updatePlanDates(startDate, endDate);
        updatePlanLocations(startDate);
    };
    const navigate = useNavigate();
    const handleAddPlan = async () => {
        setLoading(true);
        console.log(clonePlan)
        if (!validateForm()) {
            return;
        }
        console.log('hihi', clonePlan.postPlanLocations)

        const transformedPlan = {
            Plan: {
                Title: clonePlan.namePlan,
                StartDate: clonePlan.planStartDate.split("T")[0],
                EndDate: clonePlan.planEndDate.split("T")[0],
                EstimatedBudget: clonePlan.budget,
                ProvinceStart: clonePlan.provinceStart.provinceName,
                ProvinceEnd: clonePlan.provinceEnd.provinceName,
                Method: 1, // Giả sử
                Vehicle: clonePlan.vehicle,
                PlanLocations: clonePlan.postPlanLocations.map((location) => ({
                    Latitude: location.coordinates.latitude.toString(),
                    Longitude: location.coordinates.longitude.toString(),
                    Name: location.name,
                    Address: location.address,
                    EstimatedStartDate: location.EstimatedStartDate
                }))
            }
        };

        try {
            const res = await addGenarateTripbyAI(transformedPlan);
            console.log(res.planId);
            if (res.planId) {
                navigate(`/detail-plan/${res.planId}`);
            }

            handleClose();
        } catch (error) {

            const errorMessage = (typeof error === 'string' && error.split(': ')[1]) ||
                (error.message ? error.message.split(': ')[1] : "Lỗi không xác định");
            const extractedMessage = errorMessage?.match(/"([^"]+)"/)?.[1] || errorMessage;
            toast.error(extractedMessage);
        }
        setLoading(false);
    }

    return (
        <Modal
            title="Tạo chuyến đi mới"
            open={open}
            onOk={async () => {
                setButtonLoading(true);
                await handleAddPlan();
                setButtonLoading(false);
            }}
            onCancel={handleClose}
            okText={
                buttonLoading ? (
                    <img
                        className="h-5 w-5 animate-spin"
                        width="24"
                        height="24"
                        src="https://img.icons8.com/?size=100&id=94550&format=png&color=FFFFFF"
                        alt="loading"
                    />
                ) : (
                    "Tạo chuyến đi"
                )
            }
            cancelText="Huỷ"
        >
            <div className="flex flex-col gap-3 min-h-[300px] pt-5">
                <div className="w-full flex relative">
                    <div className="w-1/4 text-[14px] font-medium flex gap-1">
                        Tên chuyến đi
                        <span className="text-red-500">*</span>
                    </div>
                    <div className="flex flex-col w-3/4">
                        <Input
                            value={clonePlan.namePlan}
                            onChange={(e) => handleChange("namePlan", e.target.value)}

                            type="text" className="w-full border outline-none rounded-md px-2 text-[13px] h-[30px]" />
                        {errors.namePlan && <span className=" text-red-500 text-[10px]">{errors.namePlan}</span>}
                    </div>
                </div>
                <div className="w-full flex ">
                    <div className="w-1/4 text-[14px] font-medium flex gap-1">Chi phí dự tính<span className="text-red-500">*</span></div>
                    <div className="flex flex-col w-3/4">
                        <Input
                            value={clonePlan.budget}
                            onChange={(e) => setClonePlan({ ...clonePlan, budget: e.target.value })}
                            type="text"
                            className="w-full border outline-none rounded-md px-2 text-[13px] h-[30px]" />
                        {errors.budget && <span className="text-red-500 text-[10px]">{errors.budget}</span>}
                    </div>
                </div>
                <Space direction="vertical" size={10} >
                    <span className="text-[14px] font-medium flex gap-1">Thời gian<span className="text-red-500">*</span></span>
                    <div className="flex flex-col w-full">
                        <RangePicker
                            placeholder={["Bắt đầu", "Kết thúc"]}
                            style={{ width: "100%", height: "30px" }}
                            disabledDate={disabledDate}
                            format="DD-MM-YYYY"
                            allowClear={true}
                            value={clonePlan?.planStartDate && clonePlan?.planEndDate ? [dayjs(clonePlan?.planStartDate), dayjs(clonePlan?.planEndDate)] : []}
                            onChange={(dates) => {
                                if (dates && dates.length === 2) {
                                    const [start, end] = dates;
                                    handleUpdatePlan(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"));
                                    // updatePostPlanLocations(start.format("YYYY-MM-DD"));
                                } else {
                                    updatePlanDates(null, null);
                                }
                            }}
                        />
                        {(errors.planStartDate || errors.planEndDate) && (
                            <span className="text-red-500 text-[10px]">
                                {errors.planStartDate || errors.planEndDate}
                            </span>
                        )}
                    </div>
                </Space>
                <div className="flex gap-10">
                    <div className="flex w-1/2 flex-col gap-2">
                        <span className="text-[14px] font-medium">Điểm bắt đầu</span>
                        <Input
                            readOnly
                            value={clonePlan?.provinceStart.provinceName}
                            type="text" placeholder="Điểm bắt đầu" className="border border-[#1677ff] outline-none h-[30px] rounded-md px-2 text-[13px]" />
                    </div>
                    <div className="flex w-1/2 flex-col gap-2">
                        <span className="text-[14px] font-medium">Điểm kết thúc</span>
                        <Input
                            readOnly
                            value={clonePlan?.provinceEnd.provinceName}
                            type="text" placeholder="Điểm kết thúc" className="border border-[#1677ff] outline-none h-[30px] rounded-md px-2 text-[13px]" />
                        {/* {!formData.endDestination && errors.endDestination && <span className="text-[12px] font-normal text-red-500">{errors?.endDestination}</span>} */}
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <span className="text-[14px] font-medium">Lộ trình</span>
                    <div className="w-full flex">
                        <div className="flex flex-col w-full">
                            {clonePlan?.postPlanLocations.slice(0, 3).map((location) => (
                                <div key={location.locationId} className="flex w-full gap-2">
                                    <div className="circle  w-[15px] "></div>
                                    <div className="flex flex-col w-10/12">
                                        <span className="text-[12px] font-semibold">{location.name}</span>
                                        <span className="text-[10px] truncate w-full">{location.address}</span>
                                    </div>
                                </div>
                            ))}
                            {clonePlan?.postPlanLocations.length > 3 && (
                                <div className="text-[12px] text-gray-500">...</div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </Modal>
    );
}

export default ModalClonePlan;