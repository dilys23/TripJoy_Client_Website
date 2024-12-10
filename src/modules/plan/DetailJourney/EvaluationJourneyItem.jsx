import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdGroups } from "react-icons/md";
import { Select, Spin } from 'antd';
import RatingStar from "../../../components/Rate";
import ava from "../../../assets/images/ava.jpg";
import ava1 from "../../../assets/images/anh2.jpg";
import ava2 from "../../../assets/images/anh3.jpg";
import TextArea from "../../../components/Input/TextArea";
import ImageUploader from "../../../components/Image/ImageUpload";
import { getMemberByPlanId } from "../../../services/member";
import useDebounce from "../../../hooks/useDebounce";
import { addFeePlanLocation } from "../../../services/detailPlanLocationService";
function EvaluationJourneyItem({ planId, journey, onSuccess }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedValues, setSelectedValues] = useState(["all"]);
    const [loading, setLoading] = useState(false);
    const [planLocationExpense, setPlanLocationExpense] = useState({
        userSpenderIds: [],
        payerId: '',
        amount: 0
    })
    const debouncedPlanLocationExpense = useDebounce(planLocationExpense, 2000);
    const fetchMember = async () => {
        try {
            const res = await getMemberByPlanId(planId);
            setMembers(res.members.data);
            // console.log(res.members.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMember();
    }, [])
    useEffect(() => {
        const callApi = async () => {
            try {
                if (debouncedPlanLocationExpense.payerId || debouncedPlanLocationExpense.amount) {
                    console.log('journey', journey.planLocationId);
                    console.log(debouncedPlanLocationExpense);
                    await addFeePlanLocation(journey.planLocationId, { planLocationExpense: debouncedPlanLocationExpense });
                    console.log("API Called with:", { planLocationExpense: debouncedPlanLocationExpense });
                }
            } catch (error) {
                console.error("Error calling API:", error);
            }
        };

        callApi();
    }, [debouncedPlanLocationExpense]);
    const handleInputChange = (field, value) => {
        setPlanLocationExpense((prev) => ({ ...prev, [field]: value }));
    };

    const [note, setNote] = useState('');
    const [images, setImages] = useState([]);
    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };
    const getNameFromId = (id) => {
        if (id === "all") return "Tất cả";
        const member = members.find((member) => member.userId === id);
        return member ? member.name : "";
    };
    // console.log('journey', journey);
    // const handleCheckboxChange = (userId) => {
    //     setSelectedValues((prev) => {
    //         if (userId === "all") {
    //             return prev.includes("all") ? [] : ["all"];
    //         }
    //         const filteredPrev = prev.filter((item) => item !== "all");

    //         if (filteredPrev.includes(userId)) {
    //             return filteredPrev.filter((item) => item !== userId);
    //         } else {
    //             return [...filteredPrev, userId];
    //         }
    //     });

    // };
    const handleCheckboxChange = (userId) => {
        setSelectedValues((prev) => {
            let updatedValues;
            if (userId === "all") {
                if (prev.includes("all")) {
                    // Nếu "Tất cả" đã được chọn, bỏ chọn tất cả
                    updatedValues = [];
                } else {
                    // Nếu chưa chọn "Tất cả", chọn tất cả các userId
                    updatedValues = ["all"];
                }
            } else {
                // Xử lý khi chọn hoặc bỏ chọn userId cụ thể
                const filteredPrev = prev.filter((item) => item !== "all");
                if (filteredPrev.includes(userId)) {
                    updatedValues = filteredPrev.filter((item) => item !== userId);
                } else {
                    updatedValues = [...filteredPrev, userId];
                }
            }

            // Cập nhật giá trị vào planLocationExpense.userSpenderIds
            setPlanLocationExpense((prevExpense) => ({
                ...prevExpense,
                UserSpenderIds: updatedValues.includes("all")
                    ? members.map((member) => ({ UserId: member.userId })) // Chuyển đổi tất cả userId thành dạng đối tượng
                    : updatedValues.map((id) => ({ UserId: id })), // Chuyển đổi selectedValues thành dạng đối tượng
            }));

            return updatedValues;
        });
    };

    console.log(selectedValues);
    const fetchData = async () => {
        try {
            setImages(journey.images)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [journey])
    const handleChange = (value) => {
        handleInputChange("amount", value);
    };
    const colorBorder = journey.status === 0
        ? '#FF7324'
        : journey.status === 1
            ? '#46E8A5'
            : '#007AFF';
    const dashStyle = journey.status === 0
        ?
        'linear-gradient(to bottom, #FF7324 40%, transparent 40%)'
        : journey.status === 1 ?
            'linear-gradient(to bottom, #46E8A5 40%, transparent 40%)'
            : 'linear-gradient(to bottom, #007AFF 40%, transparent 40%)';

    const handleSubmit = async () => {

    }

    return (
        <div className={`w-full flex ${images.length <= 5 ? "h-[300px]" : "h-[340px]"} pt-1 mt-3 px-[1px]`}>
            <div className="w-[25px] h-1/2 flex items-center relative border-dashed border-b-[1px] overflow-hidden "
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 50%)',
                    borderColor: colorBorder,

                }}
            >
                <div className="absolute left-1/2 w-[1px] h-full  border-dashed"
                    style={{
                        backgroundImage: dashStyle,
                        backgroundSize: '1px 10px'
                    }}
                ></div>
            </div>
            <div className="w-[150px] flex items-center">
                <div
                    className="w-full border-t-[1px] border-dashed justify-center"
                    style={{
                        borderColor: colorBorder,
                        backgroundImage: dashStyle,
                        backgroundSize: '1px 10px'
                    }}
                ></div>
            </div>
            <div
                style={{ borderColor: colorBorder, borderWidth: '1px' }}
                className="w-full h-full flex flex-col border bg-white rounded-lg shadow-md py-4 gap-2">
                <div className="w-full h-full flex flex-col px-4 gap-2">
                    <div className="w-full flex gap-0 ">
                        <div className="w-7/12 flex gap-1 items-center">
                            <MdGroups className="text-[#34A853] text-[30px]" />
                            <span className="text-[15px] text-[#333333] font-medium w-[70px]">Tham gia</span>
                            <div className="relative h-[30px]">
                                <button
                                    onClick={toggleDropdown}
                                    className="shadow w-[150px] h-full rounded-[20px] border border-[#CCD0D5] text-[12px] flex px-1 items-center overflow-x-hidden"
                                    type="button"
                                >
                                    {selectedValues.includes("Tất cả") ? (
                                        <span className="bg-blue-100 text-blue-600 px-2 rounded-lg">Tất cả</span>
                                    ) : selectedValues.length > 0 ? (
                                        <div className="flex gap-[2px]">
                                            {selectedValues.map((value, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-600 px-2 rounded-lg truncate"
                                                >
                                                    {getNameFromId(value)}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        "Chọn"
                                    )}
                                </button>
                                {isDropdownOpen && (
                                    <div className="z-10 absolute mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-md border border-[#CCD0D5] dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                                            {[{ userId: "all", name: "Tất cả" }, ...members].map((member) => (
                                                <li key={member.userId}>
                                                    <div className="flex items-center">
                                                        <input
                                                            id={`checkbox-item-${member.userId}`}
                                                            type="checkbox"
                                                            checked={selectedValues.includes(member.userId)}
                                                            onChange={() => handleCheckboxChange(member.userId)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        />
                                                        <label htmlFor={`checkbox-item-${member}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            {member.name}
                                                        </label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="flex relative cursor-pointer">
                                <img src={ava1} alt="" className="w-[32px] h-[32px] rounded-full" />
                                <img src={ava2} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                                <img src={ava} alt="" className="w-[32px] h-[32px] rounded-full -ml-3" />
                            </div>
                        </div>
                        <div className="w-5/12 flex gap-2 items-center ml-[-25px]">
                            <img width="25" height="25" src="https://img.icons8.com/fluency/48/price-tag--v1.png" alt="price-tag--v1" className="md:w-[30px] md:h-[30px] w-[20px] h-[20px]" />
                            <span className="text-[15px] text-[#333333] font-medium w-[65px]">Giá</span>
                            <input
                                value={planLocationExpense.amount}
                                onChange={(e) => handleInputChange("amount", e.target.value.replace(/[^0-9]/g, ""))}
                                type="text" className="shadow w-[150px] h-[30px] rounded-[20px] border border-[#CCD0D5] outline-none px-2 text-[14px]" />
                        </div>
                    </div>

                    <div className="w-full flex gap-0">
                        <div className="w-7/12 flex gap-2 items-center ">
                            <FcMoneyTransfer className="text-[30px]" />
                            <span className="text-[15px] text-[#333333] font-medium w-[65px]">Người trả</span>
                            <Select
                                showSearch
                                value={planLocationExpense.payerId}
                                onChange={(value) => {
                                    console.log(value)
                                    handleInputChange("payerId", value);
                                }}
                                placeholder="Chọn tên"
                                loading={loading}
                                notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy dữ liệu"}
                                className="shadow w-[150px] h-full rounded-[20px] border border-[#CCD0D5] outline-none px-2 text-[11px] no-border-select"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().includes(input.toLowerCase())
                                }
                                optionFilterProp="children"
                                optionLabelProp="label"
                            // showArrow={false}
                            >
                                {members.map((member) => (
                                    <Select.Option
                                        key={member.userId}
                                        value={member.userId}
                                        label={
                                            <div className="px-1 bg-blue-100 text-blue-600 text-[12px] rounded-[20px] h-[20px] flex justify-center items-center">
                                                {member.name}
                                            </div>
                                        }
                                        className="text-[12px]"
                                    >
                                        {member.name}
                                    </Select.Option>
                                ))}
                            </Select>
                            <img src={ava1} alt="" className="w-[32px] h-[32px] rounded-full" />
                        </div>
                        <div className="w-5/12 flex gap-2 items-center ml-[-25px]">
                            <FaStar className="text-yellow-500 text-[25px] w-[30px]" ></FaStar>
                            <span className="text-[15px] text-[#333333] font-medium w-[70px]">Đánh giá</span>
                            <RatingStar />
                        </div>

                    </div>
                    <div className="w-full flex gap-4">
                        <div className="w-6/12 flex flex-col gap-2">
                            <div className="flex gap-3 items-center">
                                <img width="30" height="30" src="https://img.icons8.com/color/48/note.png" alt="note" />
                                <span className="text-[15px] text-[#333333] font-medium w-[70px]">Ghi chú</span>
                            </div>
                            <TextArea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                width="w-[80%]" height="100px" placeholder="VIết tiêu đề của chuyến đi của bạn" className="bg-[#F1F2F3] text-[12px]"></TextArea>
                        </div>
                        <ImageUploader planLocationId={journey.planLocationId} images={images} setImages={setImages} onSuccess={onSuccess}></ImageUploader>
                    </div>

                </div>
                <button
                    onClick={handleSubmit}
                    className="w-[150px] h-[35px] bg-[#46E8A5] hover:bg-[#40d497] rounded-[10px] font-bold text-white mx-auto transition-all duration-200">Hoàn thành</button>
                {/* <div className="flex w-2/5 flex-col px-5 pt-4 gap-3">
                    <div className="bg-[#F1F2F3] rounded-[10px] w-full h-3/5 flex flex-col items-center justify-center cursor-pointer">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/image--v1.png" alt="image--v1" />
                        <span className="text-[14px]">Thêm ảnh</span>
                    </div>
                    <button className="w-full h-[35px] bg-[#46E8A5] rounded-[10px] font-bold text-white">Hoàn thành</button>
                </div> */}

            </div>
        </div >
    );
}

export default EvaluationJourneyItem;