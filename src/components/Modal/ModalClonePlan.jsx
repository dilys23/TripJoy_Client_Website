import { Input, Modal, Space } from "antd";
import { useState } from "react";
import { DatePicker } from 'antd';
import InputWithLabel from "../Input/InputWithLabel";
import dayjs from "dayjs";
import RoutingMap from "../MapCard/RoutingMap";
const { RangePicker } = DatePicker;
function ModalClonePlan({
    plan,
    open,
    handleClose
}) {

    const [clonePlan, setClonePlan] = useState(plan);
    const [errors, setErrors] = useState({});

    const disabledDate = (current) => {
        return current && current < dayjs().startOf("day");
    };

    const validateForm = () => {
        const errors = {};

        // Validate the name of the plan
        if (!clonePlan.namePlan) errors.namePlan = "Vui lòng điền tên chuyến đi";

        // Validate start and end destinations
        if (!clonePlan.provinceStart?.provinceName) errors.startDestination = "Vui lòng điền điểm bắt đầu";
        if (!clonePlan.provinceEnd?.provinceName) errors.endDestination = "Vui lòng điền điểm kết thúc";

        // Validate start and end dates
        if (!clonePlan.StartDate) errors.startDate = "Vui lòng nhập ngày bắt đầu";
        if (!clonePlan.EndDate) errors.endDate = "Vui lòng nhập ngày kết thúc";
        if (clonePlan.StartDate && clonePlan.EndDate && dayjs(clonePlan.StartDate).isAfter(dayjs(clonePlan.EndDate))) {
            errors.startDate = "Ngày bắt đầu không được sau ngày kết thúc";
            errors.endDate = "Ngày kết thúc không được trước ngày bắt đầu";
        }

        // Validate the budget
        if (!clonePlan.budget) errors.budget = "Vui lòng điền ngân sách";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const updatePlanDates = (newStartDate, newEndDate) => {
        const oldStartDate = new Date(plan.StartDate);
        const newStart = new Date(newStartDate);
        const newEnd = new Date(newEndDate);
        const dayDifference = (newStart - oldStartDate) / (1000 * 60 * 60 * 24);

        const updatedPlan = {
            ...plan,
            StartDate: newStartDate,
            EndDate: newEndDate,
            PlanLocations: plan.PlanLocations
                .map(location => {
                    const oldEstimatedStartDate = new Date(location.EstimatedStartDate);
                    const newEstimatedStartDate = new Date(oldEstimatedStartDate);
                    newEstimatedStartDate.setDate(oldEstimatedStartDate.getDate() + dayDifference);
                    return {
                        ...location,
                        EstimatedStartDate: newEstimatedStartDate.toISOString().split('T')[0],
                    };
                })
                .filter(location => {
                    const estimatedDate = new Date(location.EstimatedStartDate);
                    return estimatedDate >= newStart && estimatedDate <= newEnd;
                }),
        };

        const existingDates = updatedPlan.PlanLocations.map(loc => loc.EstimatedStartDate);
        for (
            let date = new Date(newStart);
            date <= newEnd;
            date.setDate(date.getDate() + 1)
        ) {
            const formattedDate = date.toISOString().split('T')[0];
            if (!existingDates.includes(formattedDate)) {
                updatedPlan.PlanLocations.push({
                    Latitude: "",
                    Longitude: "",
                    Name: "New location",
                    Address: "TBD",
                    EstimatedStartDate: formattedDate,
                });
            }
        }

        setClonePlan(updatedPlan);
    };

    return (
        <Modal
            title="Tạo chuyến đi mới"
            open={open}
            // onOk={onOk}
            onCancel={handleClose}
            okText="Tạo chuyến đi"
            cancelText="Huỷ"
        >
            <div className="flex flex-col gap-3 min-h-[300px] pt-5">
                <div className="w-full flex ">
                    <div className="w-1/4 text-[14px] font-medium">Tên chuyến đi</div>
                    <Input
                        value={clonePlan.namePlan}
                        onChange={(e) => setClonePlan({ ...clonePlan, namePlan: e.target.value })}
                        type="text" className="w-3/4 border outline-none rounded-md px-2 text-[13px] h-[30px]" />
                    {errors.namePlan && <span className="text-red-500 text-[10px]">{errors.namePlan}</span>}
                </div>
                <div className="w-full flex ">
                    <div className="w-1/4 text-[14px] font-medium">Chi phí dự tính</div>
                    <Input
                        value={clonePlan.budget}
                        onChange={(e) => setClonePlan({ ...clonePlan, budget: e.target.value })}
                        type="text"
                        className="w-3/4 border outline-none rounded-md px-2 text-[13px] h-[30px]" />
                    {errors.budget && <span className="text-red-500 text-[10px]">{errors.budget}</span>}
                </div>
                <Space direction="vertical" size={10} >
                    <span className="text-[14px] font-medium">Thời gian</span>
                    <RangePicker
                        placeholder={["Bắt đầu", "Kết thúc"]}
                        style={{ width: "100%", height: "30px" }}
                        disabledDate={disabledDate}
                        format="DD-MM-YYYY"
                        allowClear={true}
                        value={clonePlan?.planStartDate && clonePlan?.planEndDate ? [dayjs(clonePlan?.planStartDate), dayjs(clonePlan?.planEndDate)] : []}
                        onChange={(dates) => {
                            if (dates) {
                                const [start, end] = dates;
                                updatePlanDates(start, end);
                            }
                        }}

                    // value={formData.startDate && formData.endDate ? [dayjs(formData.startDate), dayjs(formData.endDate)] : []}
                    // onChange={(dates) => {
                    //     if (dates) {
                    //         handleInputChange("startDate", dates[0]);
                    //         handleInputChange("endDate", dates[1]);
                    //     } else {
                    //         handleInputChange("startDate", null);
                    //         handleInputChange("endDate", null);
                    //     }
                    // }}
                    />
                    {errors.startDate || errors.endDate && <span className="text-red-500 text-[10px]">{errors.startDate || errors.endDate}</span>}
                </Space>
                <div className="flex gap-10">
                    <div className="flex w-1/2 flex-col gap-2">
                        <span className="text-[14px] font-medium">Điểm bắt đầu</span>
                        <Input
                            value={clonePlan?.provinceStart.provinceName}
                            type="text" placeholder="Điểm bắt đầu" className="border outline-none h-[30px] rounded-md px-2 text-[13px]" />
                    </div>
                    <div className="flex w-1/2 flex-col gap-2">
                        <span className="text-[14px] font-medium">Điểm kết thúc</span>
                        <Input
                            value={clonePlan?.provinceEnd.provinceName}
                            type="text" placeholder="Điểm kết thúc" className="border outline-none h-[30px] rounded-md px-2 text-[13px]" />
                        {/* {!formData.endDestination && errors.endDestination && <span className="text-[12px] font-normal text-red-500">{errors?.endDestination}</span>} */}
                    </div>
                </div>
                <div className="w-full flex ">
                    <div className="w-1/4 text-[14px] font-medium">Phương tiện</div>

                </div>
                <div className="flex flex-col w-full">
                    <span className="text-[14px] font-medium">Lộ trình</span>
                    <div className="w-full flex">
                        <div className="flex flex-col w-1/2">
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
                        <div className="w-1/2 h-[120px]">
                            <RoutingMap planLocation={clonePlan?.postPlanLocations}></RoutingMap>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
}

export default ModalClonePlan;