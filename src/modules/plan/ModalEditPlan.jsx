import { MdClose } from "react-icons/md";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import InputWithLabel from "../../components/Input/InputWithLabel";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MdAdd } from 'react-icons/md';
import { notification } from 'antd';
import { updatePlanRequest } from "../../services/plan";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { toast } from "react-toastify";

dayjs.extend(utc);

function ModalEditPlan({ planId, plan, handleClose, OnSuccess }) {
    // console.log(plan);
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [formData, setFormData] = useState({
        namePlan: plan?.title || "",
        startDestination: plan?.provinceStart.provinceName,
        idStartDestination: plan?.provinceStart.provinceId,
        endDestination: plan?.provinceEnd.provinceName,
        idEndDestination: plan?.provinceEnd.provinceId,
        startDate: plan?.estimatedStartDate || null,
        endDate: plan?.estimatedEndDate || null,
        budget: plan?.estimatedBudget || 0,
        method: 0,
        avatar: null,
        vehicle: plan?.vehicle,
    });

    const [errors, setErrors] = useState({
        namePlan: "",
        startDestination: "",
        endDestination: "",
        startDate: "",
        endDate: "",
        budget: "",
        avatar: ""
    })
    const validateForm = () => {
        const errors = {};
        if (!formData.namePlan) errors.namePlan = "Vui lòng điền tên chuyến đi";
        if (!formData.startDestination) errors.startDestination = "Vui lòng điền điểm bắt đầu";
        if (!formData.endDestination) errors.endDestination = "Vui lòng điền điểm kết thúc";
        if (!formData.startDate) errors.startDate = "Vui lòng nhập ngày bắt đầu";
        if (!formData.endDate) errors.endDate = "Vui lòng nhập ngày kết thúc";
        if (formData.startDate && formData.endDate && dayjs(formData.startDate).isAfter(dayjs(formData.endDate))) {
            errors.startDate = "Ngày bắt đầu không được sau ngày kết thúc";
            errors.endDate = "Ngày kết thúc không được trước ngày bắt đầu";
        }
        if (!formData.budget) errors.budget = "Vui lòng điền ngân sách";
        if (!formData.avatar) errors.avatar = "Vui lòng chọn ảnh bìa";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    async function fetchAvatarAsFile(uri, name, type) {
        try {
            const response = await fetch(uri);
            if (!response.ok) throw new Error("Failed to fetch avatar");

            const blob = await response.blob(); // Convert to Blob
            return new File([blob], name, { type }); // Tạo File object
        } catch (error) {

            console.error('Error converting avatar:', error);
            return null;
        }
    }

    useEffect(() => {
        async function processAvatar() {
            if (plan?.avatar) {
                const parts = plan.avatar.split("/");
                const fileName = parts[parts.length - 1];

                const file = await fetchAvatarAsFile(plan.avatar, fileName, "image/jpg");
                if (file) {
                    setFormData((prev) => ({
                        ...prev,
                        avatar: file, // Set avatar là một File object hợp lệ
                    }));
                }
            }
        }

        processAvatar();
    }, [plan?.avatar]);


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };


    const handleClick = (index) => {
        handleInputChange('vehicle', index);
    };
    const disabledDate = (current) => {
        return current && current < dayjs().startOf("day");
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // console.log("Selected file:", file);
            handleInputChange("avatar", file);
        }
    };
    const handleStartDestinationChange = (e) => {
        console.log(e)
        setFormData((prev) => ({
            ...prev,
            startDestination: e
        }));
    };
    const handleEndDestinationChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            endDestination: e
        }));
    };
    const handleUpdatePlan = async (e) => {
        if (e) e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const data = new FormData();
        if (formData.avatar instanceof File) {
            data.append('Plan.Avatar', formData.avatar);
        } else {
            console.error('Avatar is not a valid File');
        }

        data.append('Plan.Title', formData.namePlan);
        data.append('Plan.StartDate', formData.startDate);
        data.append('Plan.EndDate', formData.endDate);
        data.append('Plan.EstimatedBudget', formData.budget);
        data.append('Plan.Method', formData.method);
        data.append('Plan.ProvinceStartId', formData.idStartDestination);
        data.append('Plan.ProvinceEndId', formData.idEndDestination);
        data.append('Plan.Vehicle', formData.vehicle);
        // console.log('formData', formData)
        console.log(data)
        data.forEach((value, key) => {
            console.log(key, value);
        });
        setLoading(true);

        try {
            const response = await updatePlanRequest(planId, data);
            // handelClear();
            console.log(response);
            handleClose();
            OnSuccess();
        } catch (error) {
            const errorMessage = (typeof error === 'string' && error.split(': ')[1]) ||
                (error.message ? error.message.split(': ')[1] : "Lỗi không xác định");
            const extractedMessage = errorMessage?.match(/"([^"]+)"/)?.[1] || errorMessage;
            toast.error(extractedMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative sm:w-[600px] w-4/5 h-fit flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col justify-center w-full sm:gap-4 pb-3 gap-3 sm:px-6 px-3 pt-3 ">
                        <span className="sm:text-[20px] text-base font-semibold">Cập nhật chuyến đi</span>
                    </div>
                    <div className="absolute right-5 top-6">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full flex flex-col text-start">
                        <div className='w-full flex flex-col  justify-center gap-1'>
                            <span className='text-[#a7a5b4] px-1 lg:text-base text-[14px]'>Chọn ảnh bìa
                                <span className="text-[red] ml-1 text-[15px]">*</span></span>
                            <div className='w-full flex justify-center'>
                                <label htmlFor="upload-image" className="w-[200px] h-[80px] border-dashed border-[#00000026] border-[1px] bg-[#f8f8f8] items-center justify-center flex flex-col cursor-pointer rounded-[6px]">
                                    {formData.avatar && (
                                        <img
                                            src={formData.avatar instanceof File ? URL.createObjectURL(formData.avatar) : formData.avatar}
                                            alt="Avatar Preview"
                                            className="h-full w-full object-cover rounded-[6px]"
                                        />
                                    )}
                                </label>
                                <input
                                    id="upload-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e)}
                                />
                            </div>
                            {!formData.avatar && errors.avatar && <span className="text-[12px] font-normal text-red-500 h-[5px]">{errors?.avatar}</span>}
                        </div>
                        <InputWithLabel
                            label="Tên chuyến đi"
                            placeholder="Tên chuyến đi"
                            value={formData.namePlan}
                            onChange={(e) => handleInputChange("namePlan", e.target.value)}
                        />
                        {!formData.namePlan && errors.namePlan && <span className="text-[12px] font-normal text-red-500 h-[5px]">{errors?.namePlan}</span>}
                        <div className="flex gap-10  pt-4">
                            <div className="flex w-1/2 flex-col gap-2">
                                <InputWithLabel
                                    label="Điểm bắt đầu"
                                    placeholder="Điểm bắt đầu"
                                    value={formData.startDestination}
                                    // onChange={(e) => handleInputChange("startDestination", e.target.value)}
                                    onChange={(e) => handleStartDestinationChange(e)}
                                    isDropdown={true}
                                // uniqueKey="start"
                                />
                                {!formData.startDestination && errors.startDestination && <span className="text-[12px] font-normal text-red-500">{errors?.startDestination}</span>}
                            </div>
                            <div className="flex w-1/2 flex-col gap-2">
                                <InputWithLabel
                                    label="Điểm kết thúc"
                                    placeholder="Điểm kết thúc"
                                    value={formData.endDestination}
                                    onChange={(e) => handleEndDestinationChange(e)}
                                    // onChange={(e) => handleInputChange("endDestination", e.target.value)}
                                    isDropdown={true}
                                // uniqueKey="end"
                                />
                                {!formData.endDestination && errors.endDestination && <span className="text-[12px] font-normal text-red-500">{errors?.endDestination}</span>}
                            </div>
                        </div>
                        <span className="text-[#a7a5b4] px-1 lg:text-base text-[14px]">Thời gian</span>
                        <Space direction="vertical" size={10} >
                            <RangePicker
                                placeholder={["Bắt đầu", "Kết thúc"]}
                                style={{ width: "100%", height: "39px" }}
                                disabledDate={disabledDate}
                                format="DD-MM-YYYY"
                                allowClear={true}
                                value={[
                                    formData.startDate ? dayjs(formData.startDate) : null,
                                    formData.endDate ? dayjs(formData.endDate) : null,
                                ]}
                                onChange={(dates) => {
                                    console.log("Dates selected:", dates); // Debugging
                                    if (dates && dates.length === 2) {
                                        handleInputChange("startDate", dayjs(dates[0]).utcOffset(7).format("YYYY-MM-DDTHH:mm:ss"));
                                        handleInputChange("endDate", dayjs(dates[1]).utcOffset(7).format("YYYY-MM-DDTHH:mm:ss"));
                                    } else {
                                        handleInputChange("startDate", null);
                                        handleInputChange("endDate", null);
                                    }
                                }}

                            />
                        </Space>

                        {!formData.startDate && errors.startDate && (
                            <span className="text-[12px] font-normal text-red-500 ">{errors?.startDate}</span>
                        )}

                        <div className="flex flex-col gap-2 pt-1">
                            <InputWithLabel
                                label="Kinh phí dự tính"
                                placeholder="Kinh phí dự tính"
                                value={formData.budget}
                                onChange={(e) => handleInputChange("budget", e.target.value.replace(/[^0-9]/g, ""))}
                            />
                            {!formData.budget && errors.budget && <span className="text-[12px] font-normal text-red-500">{errors?.budget}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[#a7a5b4] px-1">Phương tiện</span>
                            <ul className="flex gap-4 flex-wrap">
                                <li
                                    className={`flex border justify-center items-center border-[#E3E6E8] lg:p-3 md:p-2 p-1 rounded-xl shadow-md cursor-pointer ${formData.vehicle === 0 ? "bg-blue-300 text-white" : ""
                                        }`}
                                    onClick={() => handleClick(0)}
                                >
                                    <img width="48" height="48" src="https://img.icons8.com/fluency/48/scooter.png" alt="scooter" />
                                </li>
                                <li
                                    className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${formData.vehicle === 1 ? "bg-blue-300 text-white" : ""
                                        }`}
                                    onClick={() => handleClick(1)}
                                >
                                    <img width="48" height="48" src="https://img.icons8.com/color/48/car--v1.png" alt="car--v1" />
                                </li>
                                <li
                                    className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${formData.vehicle === 2 ? "bg-blue-300 text-white" : ""
                                        }`}
                                    onClick={() => handleClick(2)}
                                >
                                    <img width="48" height="48" src="https://img.icons8.com/emoji/48/train-emoji.png" alt="train-emoji" />
                                </li>
                                <li
                                    className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${formData.vehicle === 3 ? "bg-blue-300 text-white" : ""
                                        }`}
                                    onClick={() => handleClick(3)}
                                >
                                    <img width="48" height="48" src="https://img.icons8.com/clouds/100/airport.png" alt="airport" />
                                </li>
                                <li
                                    className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${formData.vehicle === 4 ? "bg-blue-300 text-white" : ""
                                        }`}
                                    onClick={() => handleClick(4)}
                                >
                                    <img width="48" height="48" src="https://img.icons8.com/fluency/48/sailing-ship-medium.png" alt="sailing-ship-medium" />
                                </li>
                                <li
                                    className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer `}

                                >
                                    <MdAdd className='text-[#f2cca2] w-[48px] h-[48px]' />
                                </li>
                            </ul>
                        </div>
                        <div className="w-full flex justify-end">
                            <button
                                onClick={handleUpdatePlan}
                                className="flex w-[100px] py-[10px] mt-5 items-center justify-center rounded-[5px] bg-[#46E8A5] text-white ">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditPlan;