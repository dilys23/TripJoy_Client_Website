import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import InputWithLabel from "../../components/Input/InputWithLabel";
import { useState } from 'react';
import dayjs from 'dayjs';
import { MdAdd } from 'react-icons/md';
import { addLocationRequest } from '../../services/locationRequest';

function AddPlan() {
    const [namePlan, setNamePlan] = useState("");
    const [startDestination, setStartDestination] = useState("");
    const [endDestination, setEndDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [budget, setBudget] = useState("");
    const [selectedItems, setSelectedItems] = useState();
    const [errors, setErrors] = useState({
        namePlan: "",
        startDestination: "",
        endDestination: "",
        startDate: "",
        endDate: "",
        budget: ""
    })
    const validateForm = () => {
        let formIsValid = true;
        let errors = {
            namePlan: "",
            startDestination: "",
            endDestination: "",
            startDate: "",
            endDate: "",
            budget: ""
        };
        if (!namePlan) {
            formIsValid = false;
            errors.namePlan = "Vui lòng điền tên chuyến đi";
        }

        if (!startDestination) {
            formIsValid = false;
            errors.startDestination = "Vui lòng điền điểm bắt đầu";
        }

        if (!endDestination) {
            formIsValid = false;
            errors.endDestination = "Vui lòng điền điểm kết thúc";
        }
        if (!startDate) {
            formIsValid = false;
            errors.startDate = "Vui lòng nhập ngày bắt đầu và ngày kết thúc";
        }
        if (!endDate) {
            formIsValid = false;
            errors.endDate = "Vui lòng ngày kết thúc";
        }
        if (startDate && endDate && dayjs(startDate).isAfter(dayjs(endDate))) {
            formIsValid = false;
            errors.startDate = "Ngày bắt đầu không được sau ngày kết thúc";
            errors.endDate = "Ngày kết thúc không được trước ngày bắt đầu";
        }
        if (!budget) {
            formIsValid = false;
            errors.budget = "Vui lòng điền ngân sách";
        }
        setErrors(errors);
        return formIsValid;
    };

    const handleAddPlan = async (e) => {
        if (e) e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await addLocationRequest();
            if (response.status === 200) {

            }
        } catch (error) {
            console.error(error);
        }


    }

    const handleClick = (index) => {
        setSelectedItems(index);
    };
    const disabledDate = (current) => {
        return current && current < dayjs().startOf("day");
    };
    return (
        <div className="flex h-fit  flex-col rounded-md border-[0.4px] border-[#CCD0D5] bg-white shadow-md">
            <div className="flex py-3 w-[90%] mx-auto items-center justify-center border-b-2 border-[#DEDFDF] lg:text-[20px] font-bold">
                Bạn đã có chuyến đi của mình chưa ?
            </div>
            <div className="flex flex-col gap-3 px-5 py-4 text-start">
                <InputWithLabel
                    label="Tên chuyến đi"
                    placeholder="Tên chuyến đi"
                    value={namePlan}
                    onChange={(e) => setNamePlan(e.target.value)}
                />
                {!namePlan && errors.namePlan && <span className="text-[12px] font-normal text-red-500 h-[5px]">{errors?.namePlan}</span>}
                <div className="flex gap-10">
                    <div className="flex w-1/2 flex-col gap-2">
                        <InputWithLabel
                            label="Điểm bắt đầu"
                            placeholder="Điểm bắt đầu"
                            value={startDestination}
                            onChange={(e) => setStartDestination(e.target.value)}
                            isDropdown={true}
                        />
                        {!startDestination && errors.startDestination && <span className="text-[12px] font-normal text-red-500">{errors?.startDestination}</span>}
                    </div>
                    <div className="flex w-1/2 flex-col gap-2">
                        <InputWithLabel
                            label="Điểm kết thúc"
                            placeholder="Điểm kết thúc"
                            value={endDestination}
                            onChange={(e) => setEndDestination(e.target.value)}
                            isDropdown={true}
                        />
                        {!endDestination && errors.endDestination && <span className="text-[12px] font-normal text-red-500">{errors?.endDestination}</span>}
                    </div>
                </div>
                <span className="text-[#a7a5b4] px-1 lg:text-base text-[14px]">Thời gian</span>
                <Space direction="vertical" size={10} >
                    <RangePicker
                        placeholder={["Bắt đầu", "Kết thúc"]}
                        style={{ width: "100%", height: "39px" }}
                        disabledDate={disabledDate}
                        onChange={(dates) => {
                            setStartDate(dates ? dates[0] : null);
                            setEndDate(dates ? dates[1] : null);
                        }}
                    />
                </Space>
                {!startDate && errors.startDate && (
                    <span className="text-[12px] font-normal text-red-500 ">{errors?.startDate}</span>
                )}

                <div className="flex flex-col gap-2">
                    <InputWithLabel
                        label="Kinh phí dự tính"
                        placeholder="Kinh phí dự tính"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ""))}
                    />
                    {!budget && errors.budget && <span className="text-[12px] font-normal text-red-500">{errors?.budget}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[#a7a5b4] px-1">Phương tiện</span>
                    <ul className="flex gap-4 flex-wrap">
                        <li
                            className={`flex border justify-center items-center border-[#E3E6E8] lg:p-3 md:p-2 p-1 rounded-xl shadow-md cursor-pointer ${selectedItems === 0 ? "bg-blue-300 text-white" : ""
                                }`}
                            onClick={() => handleClick(0)}
                        >
                            <img width="48" height="48" src="https://img.icons8.com/fluency/48/scooter.png" alt="scooter" />
                        </li>
                        <li
                            className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${selectedItems === 1 ? "bg-blue-300 text-white" : ""
                                }`}
                            onClick={() => handleClick(1)}
                        >
                            <img width="48" height="48" src="https://img.icons8.com/color/48/car--v1.png" alt="car--v1" />
                        </li>
                        <li
                            className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${selectedItems === 2 ? "bg-blue-300 text-white" : ""
                                }`}
                            onClick={() => handleClick(2)}
                        >
                            <img width="48" height="48" src="https://img.icons8.com/emoji/48/train-emoji.png" alt="train-emoji" />
                        </li>
                        <li
                            className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${selectedItems === 3 ? "bg-blue-300 text-white" : ""
                                }`}
                            onClick={() => handleClick(3)}
                        >
                            <img width="48" height="48" src="https://img.icons8.com/clouds/100/airport.png" alt="airport" />
                        </li>
                        <li
                            className={`flex border border-[#E3E6E8] lg:p-3 p-2 rounded-xl shadow-md cursor-pointer ${selectedItems === 4 ? "bg-blue-300 text-white" : ""
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

                <button
                    onClick={handleAddPlan}
                    className="flex w-full py-[10px] mt-5 items-center justify-center rounded-[5px] bg-[#007AFF] text-white">
                    Bắt đầu
                </button>

            </div>
        </div>
    );
}

export default AddPlan;