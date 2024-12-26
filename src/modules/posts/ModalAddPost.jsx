import { MdAutoDelete, MdCameraAlt, MdClose, MdDelete, MdGroups, MdLocationOn, MdOutlineRemoveCircleOutline } from "react-icons/md";
import avatarDefaut from "../../assets/images/avatarDefault.png"
import TextArea from "../../components/Input/TextArea";
import { getMyPlanRequest } from "../../services/plan";
import { useContext, useEffect, useRef, useState } from "react";
import { Select, Spin } from "antd";
import { FcAddImage } from "react-icons/fc";
import Button from "../../components/Button/Button"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { BsFileEarmarkImage } from "react-icons/bs";
import { createPost, createPostPlan } from "../../services/post";
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { UserContext } from "../../contexts/UserContext";

function ModalAddPost({ handleClose, onRefresh, openNotificationWithIcon }) {
    const { user } = useContext(UserContext);
    const [namePlan, setNamePlan] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [sharePlan, setSharePlan] = useState(false);
    const [planChosen, setPlanChosen] = useState(null);
    const fileInputRef = useRef(null);
    const [isPlanChosenError, setIsPlanChosenError] = useState(false);
    const [content, setContent] = useState('');
    const [openFieldAddImage, setOpenFieldAddImage] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [showImages, setShowImage] = useState(false);
    const [showTrip, setShowTrip] = useState(false);
    const [selectImagesPlan, setSelectImagesPlan] = useState([]);
    const [error, setError] = useState(false);
    // const [api, contextHolder] = notification.useNotification();
    // const openNotificationWithIcon = (type) => {
    //     api[type]({
    //         message: 'Thông báo',
    //         description: 'Tạo bài đăng thành công',
    //         icon: <SmileOutlined
    //             style={{
    //                 color: '#108ee9',
    //             }}
    //         />,
    //     });
    // };
    useEffect(() => {

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    const formatDateRange = (startDate, endDate) => {
        const format = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        return `${format(startDate)} - ${format(endDate)}`;
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount) + 'đ';
    };

    const handleButtonClick = () => {
        if (planChosen) {
            setShowTrip((prev) => !prev);
        } else {

            setIsPlanChosenError(true);
            setTimeout(() => {
                setIsPlanChosenError(false);
            }, 1500);
        }
    };
    const handleImageButtonClick = () => {
        if (planChosen) {
            setShowImage((prev) => !prev);
        } else {
            setIsPlanChosenError(true);
            setTimeout(() => {
                setIsPlanChosenError(false);
            }, 1500);
        }
    };
    // IMAGE UPLOAD

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImages((prevImages) => [...prevImages, file]);
    };

    const handleClearImage = () => {
        setSelectedImages([]);
        setOpenFieldAddImage(false);
    }
    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
            console.error("File input ref is null");
        }
    };
    //  IMAGE FROM PLAN
    useEffect(() => {
        async function fetchImageFiles() {
            if (Array.isArray(planChosen?.images) && showImages) {
                console.log(planChosen.images);
                const files = await Promise.all(
                    planChosen.images.map(async (image) => {
                        const parts = image.url.split("/");
                        const fileName = parts[parts.length - 1];
                        const response = await fetch(image.url);
                        const blob = await response.blob();
                        const fileExtension = fileName.split('.').pop().toLowerCase();
                        let mimeType = 'image/jpeg';
                        if (fileExtension === 'png') {
                            mimeType = 'image/png';
                        } else if (fileExtension === 'gif') {
                            mimeType = 'image/gif';
                        } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
                            mimeType = 'image/jpeg';
                        }

                        return new File([blob], fileName, { type: mimeType });
                    })
                );
                console.log(files);
                setImageFiles(files);  // Set the files here
            }
        }

        fetchImageFiles();
    }, [planChosen?.images, showImages]);




    const handleSelect = (index) => {
        setSelectImagesPlan((prevSelected) => {
            if (prevSelected.includes(index)) {
                // Nếu chỉ mục đã tồn tại, loại bỏ nó
                return prevSelected.filter((item) => item !== index);
            } else {
                // Nếu chỉ mục chưa tồn tại, thêm vào
                return [...prevSelected, index];
            }
        });
    };
    // ADD POST NORMAL (WITHOUT PLAN)
    const handleAddPostNormal = async () => {
        if (!content || !content.trim()) {
            setError(true)
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();

            if (planChosen) {
                formData.append('PlanPost.Content', content);
                formData.append('PlanPost.PlanId', planChosen.id);
                formData.append('PlanPost.PlanStartDate', planChosen.startDate);
                formData.append('PlanPost.PlanEndDate', planChosen.endDate);
                formData.append('PlanPost.Budget', planChosen.estimatedBudget);
                formData.append('PlanPost.ProvinceStart.ProvinceId', planChosen.provinceStart.provinceId);
                formData.append('PlanPost.ProvinceStart.ProvinceName', planChosen.provinceStart.provinceName);
                formData.append('PlanPost.ProvinceEnd.ProvinceId', planChosen.provinceEnd.provinceId);
                formData.append('PlanPost.ProvinceEnd.ProvinceName', planChosen.provinceEnd.provinceName);
                formData.append('PlanPost.Vehicle', planChosen.vehicle);
                if (showTrip) {
                    planChosen.locations.forEach((location, index) => {
                        formData.append(`PlanPost.PostPlanLocations[${index}].LocationId`, location.id);
                        formData.append(`PlanPost.PostPlanLocations[${index}].Coordinates.Latitude`, location.latitude);
                        formData.append(`PlanPost.PostPlanLocations[${index}].Coordinates.Longitude`, location.longitude);
                        formData.append(`PlanPost.PostPlanLocations[${index}].Order`, location.order);
                        formData.append(`PlanPost.PostPlanLocations[${index}].Name`, location.name);
                        formData.append(`PlanPost.PostPlanLocations[${index}].Address`, location.address);
                        formData.append(`PlanPost.PostPlanLocations[${index}].EstimatedStartDate`, location.estimatedStartDate);
                    });
                }
                if (showImages || selectedImages.length > 0) {
                    const allSelectedFiles = [
                        ...selectedImages,
                        ...selectImagesPlan.map(index => imageFiles[index]),
                    ];
                    allSelectedFiles.forEach((file, index) => {
                        formData.append(`PlanPost.Images[${index}]`, file);
                    });

                }


                console.log(planChosen);
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                // const response = await createPostPlan(formData);
                // console.log(response);

                const response = await createPostPlan(formData);

            } else {
                formData.append('Post.Content', content);
                if (selectedImages.length > 0) {
                    selectedImages.forEach((image, index) => {
                        formData.append(`Post.Images[${index}]`, image);
                    });
                }
                const res = await createPost(formData);
                console.log(res);
            }

            handleClose();
            openNotificationWithIcon('success', 'Thông báo', 'Tạo bài đăng thành công !', true);
            if (onRefresh) {
                onRefresh();
            }
            setLoading(false);
        } catch (error) {
            console.log('error', error)
        }
    }

    // CREATE POST APPEND PLAN
    const fetchPlan = async () => {
        try {
            setLoading(true);
            const res = await getMyPlanRequest(0, 10);
            setNamePlan(res.plans.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPlan();
    }, [])
    const handleChangePlan = (value) => {
        if (value === null) {
            setShowImage(false)
            setShowTrip(false)
            setPlanChosen(null);
            return;
        }
        // Tìm kế hoạch phù hợp
        const selectedPlan = namePlan.find(plan => plan.id === value);
        setPlanChosen(selectedPlan);
    };
    // const handleAddPlanAppendPlan = async () => {
    //     try {


    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000 "
            // onClick={handleClose}
            >
                <div
                    className="relative sm:w-[550px] overflow-y-auto w-4/5 h-fit flex  border-2 border-none rounded-[8px] shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                >


                    <div className="absolute top-4 right-3">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col h-fit pt-2 items-center">
                        <span className="text-xl font-bold"> Tạo bài viết</span>
                    </div>
                    <div className="w-full flex flex-col gap-2 px-3 py-0">
                        <div className="w-full justify-between flex items-center">
                            <div className="flex gap-2">
                                <img src={avatarDefaut} alt="" className="w-9 h-9 rounded-full" />
                                <span className="text-[15px] nunito-text font-semibold">{user?.profile.userName}</span>
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 text-start relative">

                            {/* Content  */}
                            <span className="text-[13px] font-bold">Nội dung</span>
                            <TextArea
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                height="80px" className=" text-[13px]" placeholder="Chia sẻ chuyến đi của bạn..."></TextArea>
                            {error && <span className="absolute left-0 top-[110px] text-[9px] text-red-500 leading-[9px]">Vui lòng nhập nội dung bài viết !</span>}
                            {/* Up load anh nhaaa */}
                            {openFieldAddImage &&
                                <div className="relative w-full h-[120px] border border-[#b3b3b3] mt-2 rounded justify-center flex flex-col gap-1 bg-[#f8f9fb] p-1 overflow-hidden">
                                    <div
                                        onClick={handleClearImage}
                                        className="absolute right-3 top-2 w-5 h-5 bg-white rounded-full flex justify-center items-center border border-[#d9d6d5] cursor-pointer z-1000"
                                    >
                                        <MdClose className="text-[#65686c]" />
                                    </div>
                                    {
                                        selectedImages.length > 0 &&
                                        <div className="w-full h-full flex flex-col items-center gap-2 overflow-auto post-scroll">
                                            {selectedImages.map((image, index) => (
                                                <div key={index} className="relative w-full h-full flex-shrink-0 object-cover">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected ${index}`}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute left-1 top-1 bg-white p-2  rounded-full hover:bg-[#e8e5e5]" >
                                                        <MdDelete className="text-[12px]" /></button>

                                                </div>
                                            ))}
                                        </div>
                                    }
                                    {
                                        selectedImages.length > 0 &&
                                        <div className=" absolute top-2 left-12 flex justify-center items-center text-[20px] gap-2">

                                            <button
                                                onClick={triggerFileInput}
                                                className="flex bg-white px-2 py-1 rounded-md hover:bg-[#e8e5e5] text-[13px] items-center justify-center gap-1">
                                                <BsFileEarmarkImage />
                                                <span>Thêm ảnh</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                    ref={fileInputRef}
                                                    onChange={(e) => handleImageChange(e)}
                                                />
                                            </button>
                                        </div>
                                    }
                                    {
                                        selectedImages.length === 0
                                        &&
                                        (
                                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                <div className="w-8 h-8 rounded-full bg-[#e2e5e9] flex items-center justify-center">
                                                    <BsFileEarmarkImage />
                                                </div>
                                                <span className="text-[14px] font-medium">Thêm ảnh</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                    ref={fileInputRef}
                                                    onChange={(e) => handleImageChange(e)}
                                                />
                                            </label>
                                        )
                                    }

                                </div>

                            }
                            {/* Thêm plan vào bài đăng nhé */}
                            <>
                                <div className="flex w-full gap-3 mt-2 ">
                                    <div className="sm:w-9/12 w-8/12 relative">
                                        <Select
                                            showSearch
                                            placeholder="Hãy chọn chuyến đi mà bạn muốn chia sẻ !"
                                            loading={loading}
                                            allowClear
                                            value={planChosen ? planChosen.id : undefined}
                                            onChange={handleChangePlan}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())
                                            }
                                            className="w-full max-h-[100px] overflow-y-hidden border-none"
                                            notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy dữ liệu"
                                            }
                                        >
                                            {namePlan.map((plan, index) => (
                                                <Select.Option key={plan.id} value={plan.id}>
                                                    {plan.title}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {isPlanChosenError && <span className=" absolute left-0 top-9 text-[9px] text-red-500 leading-[9px]">Vui lòng chọn chuyến đi!</span>}
                                    </div>
                                    <div className="sm:w-3/12 w-4/12 flex gap-1">
                                        <Tippy content="Lộ trình">
                                            <button
                                                onClick={handleButtonClick}
                                                className="w-8 h-8 border border-[#17A1fa] rounded-[8px] flex justify-center items-center">
                                                <MdLocationOn className="text-[#f24822]" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Chia sẻ ảnh">
                                            <button
                                                onClick={handleImageButtonClick}
                                                className="w-8 h-8 border border-[#17A1fa] rounded-[8px] flex justify-center items-center">
                                                <FcAddImage className="text-[#f24822]" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Thành viên">
                                            <button className="w-8 h-8 border border-[#17A1fa] rounded-[8px] flex justify-center items-center">
                                                <MdGroups className="text-[#0D99FF]" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Thêm ảnh">
                                            <button
                                                onClick={() => setOpenFieldAddImage((prev) => (!prev))}
                                                className="w-8 h-8 border border-[#17A1fa] rounded-[8px] flex justify-center items-center">
                                                <MdCameraAlt className="text-[#f24822]" />
                                            </button>
                                        </Tippy>
                                    </div>
                                </div>

                                <>
                                    {planChosen &&
                                        <div className="flex w-full ">
                                            <div className="w-8/12 flex flex-col gap-2">
                                                <div className="flex gap-3 w-full">
                                                    <div className="w-1/2 flex flex-col gap-1">
                                                        <span className="text-[13px] font-bold">Điểm bắt đầu</span>
                                                        <input
                                                            value={planChosen.provinceStart.provinceName}
                                                            type="text" className="outline-none border border-[#b3b3b3] rounded w-full text-[13px] h-[30px] px-2" />
                                                    </div>
                                                    <div className="w-1/2 flex flex-col  gap-1">
                                                        <span className="text-[13px] font-bold">Điểm kết thúc</span>
                                                        <input
                                                            value={planChosen.provinceEnd.provinceName}
                                                            type="text" className="outline-none border border-[#b3b3b3] rounded w-full h-[30px] text-[13px] px-2" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 w-full">
                                                    <div className="w-1/2 flex flex-col gap-1">
                                                        <span className="text-[13px] font-bold">Thời gian</span>
                                                        <input
                                                            value={formatDateRange(planChosen.startDate, planChosen.endDate)}
                                                            type="text" className="outline-none border border-[#b3b3b3] px-1 rounded text-[13px] w-full h-[30px]" />
                                                    </div>
                                                    <div className="w-1/2 flex flex-col gap-1">
                                                        <span className="text-[13px] font-bold">Tổng chi phí</span>
                                                        <input
                                                            type="text"
                                                            className="outline-none border border-[#b3b3b3] rounded w-full h-[30px] text-[13px] px-2"
                                                            value={planChosen?.estimatedBudget ? formatCurrency(planChosen.estimatedBudget) : ''}
                                                        // readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-4/12 flex flex-col pl-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold">Thành viên</span>
                                                    <div className="flex gap-2 flex-wrap ">
                                                        <img src={avatarDefaut} alt="" className="w-8 h-8 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold">Phương tiện</span>
                                                    <ul className="flex gap-1 flex-wrap">
                                                        {
                                                            planChosen.vehicle === 0 &&
                                                            <li
                                                                className={`flex border justify-center items-center border-[#E3E6E8] p-2 rounded-xl shadow-md cursor-pointer
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/fluency/20/scooter.png" alt="scooter" />
                                                            </li>
                                                        }
                                                        {
                                                            planChosen.vehicle === 1 &&
                                                            <li
                                                                className={`flex border border-[#E3E6E8]  p-2 rounded-xl shadow-md cursor-pointer 
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/color/20/car--v1.png" alt="car--v1" />
                                                            </li>
                                                        }
                                                        {
                                                            planChosen.vehicle === 2 &&
                                                            <li
                                                                className={`flex border border-[#E3E6E8]  p-2 rounded-xl shadow-md cursor-pointer 
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/emoji/20/train-emoji.png" alt="train-emoji" />
                                                            </li>
                                                        }

                                                        {
                                                            planChosen.vehicle === 3 &&
                                                            <li
                                                                className={`flex border border-[#E3E6E8]  p-2 rounded-xl shadow-md cursor-pointer 
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/clouds/100/airport.png" alt="airport" />
                                                            </li>
                                                        }
                                                        {
                                                            planChosen.vehicle === 4 &&
                                                            <li
                                                                className={`flex border border-[#E3E6E8]  p-2 rounded-xl shadow-md cursor-pointer 
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/fluency/20/sailing-ship-medium.png" alt="sailing-ship-medium" />
                                                            </li>

                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="flex w-full gap-3">
                                        {
                                            planChosen && showTrip &&
                                            <div className="w-5/12 flex flex-col gap-2">
                                                <span className="text-[13px] font-bold">Lộ trình</span>
                                                <div className="flex flex-col w-full">
                                                    {planChosen.locations.slice(0, 3).map((location) => (
                                                        <div key={location.id} className="flex w-full gap-2">
                                                            <div className="circle  w-[15px] "></div>
                                                            <div className="flex flex-col w-10/12">
                                                                <span className="text-[12px] font-semibold">{location.name}</span>
                                                                <span className="text-[10px] truncate w-full">{location.address}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {planChosen.locations.length > 3 && (
                                                        <div className="text-[12px] text-gray-500">...</div>
                                                    )}
                                                </div>
                                            </div>
                                        }
                                        {
                                            showImages &&
                                            <div className="w-7/12 flex flex-col">
                                                <span className="text-[13px] font-bold">Ảnh</span>
                                                <div className="h-[120px] flex-wrap border border-[#b3b3b3] rounded w-full flex gap-3 px-3 py-2 overflow-auto">


                                                    {imageFiles.map((file, index) => (
                                                        <div key={index} className="relative ">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectImagesPlan.includes(index)}
                                                                onChange={() => handleSelect(index)}
                                                                className="absolute top-1 left-1"
                                                            />
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt="Plan"
                                                                className="w-[50px] h-[50px] object-cover rounded"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </>
                            </>

                            <Button
                                disabled={!content.trim()}
                                onClick={handleAddPostNormal}
                                primary className="rounded mt-0">Đăng</Button>
                        </div>
                    </div>
                </div>
                {/* {contextHolder} */}
            </div>

        </>
    );
}

export default ModalAddPost;