import { MdAutoDelete, MdCameraAlt, MdClose, MdDelete, MdGroups, MdLocationOn, MdOutlineRemoveCircleOutline } from "react-icons/md";
import avatarDefaut from "../../assets/images/avatarDefault.png"
import TextArea from "../../components/Input/TextArea";
import { getMyPlanRequest } from "../../services/plan";
import { useEffect, useRef, useState } from "react";
import { Select, Spin } from "antd";
import { FcAddImage } from "react-icons/fc";
import Button from "../../components/Button/Button"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { BsFileEarmarkImage } from "react-icons/bs";
import { createPost } from "../../services/post";
import { notification } from 'antd';

function ModalAddPost({ handleClose }) {
    const [namePlan, setNamePlan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sharePlan, setSharePlan] = useState(false);
    const [planChosen, setPlanChosen] = useState(null);
    const fileInputRef = useRef(null);

    const [content, setContent] = useState();
    const [openFieldAddImage, setOpenFieldAddImage] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showImages, setShowImage] = useState(false);
    const [showTrip, setShowTrip] = useState(false);


    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Thông báo',
            description: 'Tạo bài đăng thành công',
        });
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

    // ADD POST NORMAL (WITHOUT PLAN)
    const handleAddPostNormal = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('Post.Content', content);
            if (selectedImages.length > 0) {
                selectedImages.forEach((image, index) => {
                    formData.append(`Post.Images[${index}]`, image);
                });
            }
            const res = await createPost(formData);
            console.log(res);
            openNotificationWithIcon('success');

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
        const selectedPlan = namePlan.find(plan => plan.id === value);
        setPlanChosen(selectedPlan);
        console.log(selectedPlan);
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000 "
            // onClick={handleClose}
            >
                <div
                    className="relative sm:w-[550px] w-4/5 h-fit pb-6 flex  border-2 border-none rounded-[8px] shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="absolute top-5 right-3">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1 h-[40px] items-center">
                        <span className="text-xl font-bold"> Tạo bài viết</span>
                    </div>
                    <div className="w-full flex flex-col gap-2 px-3 py-0">
                        <div className="w-full justify-between flex items-center">
                            <div className="flex gap-2">
                                <img src={avatarDefaut} alt="" className="w-9 h-9 rounded-full" />
                                <span className="text-[15px] nunito-text font-semibold">Bạch Dương</span>
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 text-start">

                            {/* Content  */}
                            <span className="text-[13px] font-bold">Nội dung</span>
                            <TextArea
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                height="80px" className=" text-[13px]" placeholder="Chia sẻ chuyến đi của bạn..."></TextArea>

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
                                                    <div className=" absolute top-1 left-1 flex justify-center items-center text-[20px] gap-2">
                                                        <button
                                                            onClick={() => removeImage(index)}
                                                            className=" bg-white p-2  rounded-full hover:bg-[#e8e5e5]" >
                                                            <MdDelete className="text-[12px]" /></button>
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
                                                </div>
                                            ))}
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

                                <div className="flex w-full gap-3 mt-3 ">
                                    <div className="w-9/12">
                                        <Select
                                            showSearch
                                            placeholder="Hãy chọn chuyến đi mà bạn muốn chia sẻ !"
                                            loading={loading}
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
                                    </div>

                                    <div className="w-3/12 flex gap-1">
                                        <Tippy content="Lộ trình">
                                            <button
                                                onClick={() => setShowTrip((prev) => !prev)}
                                                className="w-8 h-8 border border-[#17A1fa] rounded-[8px] flex justify-center items-center">
                                                <MdLocationOn className="text-[#f24822]" />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Chia sẻ ảnh">
                                            <button
                                                onClick={() => setShowImage((prev) => !prev)}
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
                                                        <input type="text" className="outline-none border border-[#b3b3b3] rounded w-full  h-[30px]" />
                                                    </div>
                                                    <div className="w-1/2 flex flex-col  gap-1">
                                                        <span className="text-[13px] font-bold">Điểm kết thúc</span>
                                                        <input type="text" className="outline-none border border-[#b3b3b3] rounded w-full h-[30px]" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 w-full">
                                                    <div className="w-1/2 flex flex-col gap-1">
                                                        <span className="text-[13px] font-bold">Thời gian</span>
                                                        <input type="text" className="outline-none border border-[#b3b3b3] rounded w-full h-[30px]" />
                                                    </div>
                                                    <div className="w-1/2 flex flex-col gap-1">
                                                        <span className="text-[13px] font-bold">Tổng chi phí</span>
                                                        <input
                                                            type="text"
                                                            className="outline-none border border-[#b3b3b3] rounded w-full h-[30px] text-[13px] px-2"
                                                            value={planChosen.estimatedBudget}
                                                            readOnly />
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
                                                            planChosen.vehicle === 1 &&
                                                            <li
                                                                className={`flex border justify-center items-center border-[#E3E6E8] p-2 rounded-xl shadow-md cursor-pointer
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/fluency/20/scooter.png" alt="scooter" />
                                                            </li>
                                                        }
                                                        {
                                                            planChosen.vehicle === 2 &&
                                                            <li
                                                                className={`flex border border-[#E3E6E8]  p-2 rounded-xl shadow-md cursor-pointer 
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/color/20/car--v1.png" alt="car--v1" />
                                                            </li>
                                                        }
                                                        {
                                                            planChosen.vehicle === 3 &&
                                                            <li
                                                                className={`flex border border-[#E3E6E8]  p-2 rounded-xl shadow-md cursor-pointer 
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/emoji/20/train-emoji.png" alt="train-emoji" />
                                                            </li>
                                                        }

                                                        {
                                                            planChosen.vehicle === 4 &&
                                                            <li
                                                                className={`flex border border-[#E3E6E8]  p-2 rounded-xl shadow-md cursor-pointer 
                                                            }`}
                                                            >
                                                                <img width="20" height="20" src="https://img.icons8.com/clouds/100/airport.png" alt="airport" />
                                                            </li>
                                                        }
                                                        {
                                                            planChosen.vehicle === 5 &&
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
                                            showTrip &&
                                            <div className="w-4/12 flex flex-col gap-2">
                                                <span className="text-[13px] font-bold">Lộ trình</span>

                                            </div>
                                        }
                                        {
                                            showImages &&
                                            <div className="w-8/12 flex flex-col">
                                                <span className="text-[13px] font-bold">Ảnh</span>
                                                <div className="h-[120px] flex-wrap border border-[#b3b3b3] rounded w-full"></div>
                                            </div>
                                        }
                                    </div>
                                </>
                            </>

                            <Button
                                onClick={handleAddPostNormal}
                                primary className="rounded mt-5">Đăng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddPost;