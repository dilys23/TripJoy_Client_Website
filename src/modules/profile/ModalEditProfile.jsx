import { MdClose } from "react-icons/md";
import ava from "../../assets/images/avatarDefault.png"
import { useEffect, useState } from "react";
import { EditProfileIcon } from "../../components/Icons/Icons";
import Button from "../../components/Button/Button.jsx";
import { getCurrentUser } from "../../services/getCurrentUser.js";
function ModalEditProfile({ handleClose }) {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    const formatDate = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    const [formData, setFormData] = useState({
        userName: '',
        phoneNumber: '',
        dateOfBirth: '',
        avatar: null,
        district: '',
        ward: '',
        province: '',
        gender: null,
        country: 'Việt Nam'
    });

    const fetchUser = async () => {
        try {
            const res = await getCurrentUser();
            setFormData(res.user.profile);
            console.log(res.user.profile)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])


    const [isChange, setIsChange] = useState(true);


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            handleInputChange("avatar", e.target.files[0]);
        }
    };

    // const handleFileChange = (e) => {
    //     const [file] = e.target.files;

    //     if (!file) return;

    //     const types = ['image/jpeg', 'image/jpg', 'image/png'];
    //     if (types.includes(file.type)) {
    //         file.url = URL.createObjectURL(file);
    //         setFormData(prevState => ({
    //             ...prevState,
    //             Avatar: { ...prevState.Avatar, Url: file.url }
    //         }));
    //         setIsChange(true);
    //     } else {
    //         toast.error('Định dạng file không hợp lệ!', { autoClose: 3000 });
    //     }
    // };
    const handleSubmit = () => {
        const { email, ...submitData } = formData;
        console.log("Submitting data:", submitData);
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="modal sm:w-[600px] w-4/5 h-fit flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full justify-end flex sm:px-0 px-2">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="flex flex-col justify-start w-full sm:gap-4 pb-3 gap-3 sm:px-6 px-3 pt-3">
                        <span className="sm:text-[20px] text-base font-semibold text-start">Chỉnh sửa thông tin cá nhân</span>
                        <div className="w-full h-[96px] flex  px-2">
                            <div className="w-1/3 sm:mr-[24px] text-start text-[#161823 sm:text-base text-[13px] font-medium leading-6]">Ảnh đại diện</div>
                            <div className="sm:w-[190px] w-[100px] flex sm:justify-end justify-center">
                                <div className="relative sm:w-[96px] sm:h-[96px] w-[70px] h-[70px]">
                                    <img
                                        src={formData?.avatar instanceof File ? URL.createObjectURL(formData.avatar) : ava}
                                        alt=""
                                        className="sm:w-[96px] sm:h-[96px] w-[70px] h-[70px] rounded-full"
                                    />
                                    {/* <img src={URL.createObjectURL(formData?.avatar) || ava} alt="" className="sm:w-[96px] sm:h-[96px] w-[70px] h-[70px] rounded-full" /> */}
                                    <div className="absolute bottom-0 right-0 ">
                                        <div className="sm:w-[32px] sm:h-[32px] w-[25px] h-[25px] bg-white cursor-pointer border border-[#d0d0d3] rounded-full flex items-center justify-center">
                                            <label htmlFor="avatar-upload">
                                                <EditProfileIcon></EditProfileIcon>
                                            </label>
                                            <input
                                                id="avatar-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex px-2">
                            <div className="w-1/4 sm:mr-[24px] text-start text-[#161823 sm:text-base text-[13px] font-medium leading-6]">Họ tên</div>
                            <input
                                type="text"
                                name="name"
                                className="w-3/4 outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"
                                value={formData?.userName}
                                onChange={(e) => handleInputChange('userName', e.target.value)}
                            ></input>
                        </div>
                        <div className="w-full flex px-2">
                            <div className="w-1/4 sm:mr-[24px] text-start text-[#161823 sm:text-base text-[13px] font-medium leading-6]">Gmail</div>
                            <input
                                type="text"
                                name="email"
                                className="w-3/4 outline-none px-3 h-[35px] bg-[#f5fbff] rounded-md border-[#55B7FF] border cursor-pointer sm:text-base text-[13px]"
                                value={formData?.email}
                                // onChange={(e)=> handleInputChange('email')}
                                disabled></input>
                        </div>
                        <div className="w-full flex px-2">
                            <div className="w-1/4 sm:mr-[24px] text-start text-[#161823 sm:text-base text-[13px] font-medium leading-6]">Số điện thoại</div>
                            <input
                                name="phoneNumber"
                                type="text"
                                className="w-3/4 outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"
                                value={formData?.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}></input>
                        </div>
                        <div className="w-full flex px-2">
                            <div className="w-1/4 sm:mr-[24px] text-start text-[#161823 sm:text-base text-[13px] font-medium leading-6]">Ngày sinh</div>
                            <input
                                name="dob"
                                type="date"
                                className="w-3/4 outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"
                                value={formData?.dateOfBirth ? formatDate(formData.dateOfBirth) : ''}
                                onChange={(e) => handleInputChange("dateOfBirth", formatDate(e.target.value))}
                            ></input>
                        </div>
                        <div className="w-full flex px-2">
                            <div className="w-1/4 sm:mr-[24px] text-start text-[#161823 sm:text-base text-[13px] font-medium leading-6]">Giới tính</div>
                            <div className="flex gap-5">
                                <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="1"
                                        className="mr-2"
                                        checked={formData?.gender === 1}
                                        onChange={() => handleInputChange("gender", 1)}
                                    />
                                    Nam
                                </label>
                                <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="2"
                                        className="mr-2"
                                        checked={formData?.gender === 2}
                                        onChange={() => handleInputChange("gender", 2)}
                                    />
                                    Nữ
                                </label>
                                <label className="flex items-center cursor-pointer sm:text-base text-[13px]">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="3"
                                        className="mr-2"
                                        checked={formData?.gender === 3}
                                        onChange={() => handleInputChange("gender", 3)}
                                    />
                                    Khác
                                </label>
                            </div>
                        </div>
                        <div className="w-full flex px-2">
                            <div className="w-1/4 sm:mr-[24px] text-start text-[#161823 sm:text-base text-[13px] font-medium leading-6]">Địa chỉ</div>
                            <div className="flex flex-col w-3/4 gap-2">
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="Tỉnh"
                                    className="w-full outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"></input>
                                <input
                                    type="text"
                                    name="district"
                                    placeholder="Quận"
                                    className="w-full outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"

                                />
                                <input
                                    type="text"
                                    name="ward"
                                    placeholder="Phường"
                                    className="w-full outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"

                                />
                                {/* <input
                                    type="text"
                                    name="province"
                                    placeholder="Tỉnh"
                                    className="w-full outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"
                                    value={formData.address.province}
                                    onChange={handleInputChange}
                                />
                                {formData.address.province && (
                                    <>
                                        <input
                                            type="text"
                                            name="district"
                                            placeholder="Quận"
                                            className="w-full outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"
                                            value={formData.address.district}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="ward"
                                            placeholder="Phường"
                                            className="w-full outline-none px-3 h-[35px] bg-[#f1f1f2] rounded-md sm:text-base text-[13px]"
                                            value={formData.address.ward}
                                            onChange={handleInputChange}
                                        />
                                    </>
                                )} */}
                            </div>
                        </div>
                        <div className="w-full justify-end flex pt-1">
                            <button onClick={handleSubmit}
                                // disabled={!isChange}
                                className={`flex items-center gap-2 cursor-pointer shadow outline-none justify-center text-start  ${isChange ? "bg-[#007AFF] hover:bg-[#006ee6]" : "bg-[#B3B3B3] hover:bg-[#B3B3B3]"} font-semibold  sm:w-[85px] px-2 py-1 sm:text-base text-[13px] rounded-lg  transition-all duration-150 text-white`}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditProfile;