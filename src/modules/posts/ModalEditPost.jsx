import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { editPost, getPostById } from "../../services/post";
import TextArea from "../../components/Input/TextArea";
import { MdClose, MdDelete } from "react-icons/md";
import Button from "../../components/Button/Button";
import { BsFileEarmarkImage } from "react-icons/bs";

function ModalEditPost({ handleClose, postId }) {
    // console.log(postId);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const fileInputRef = useRef(null);
    // const [openFieldAddImage, setOpenFieldAddImage] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    const fetchPost = async () => {
        try {
            const res = await getPostById(postId);
            // console.log(res);
            setContent(res.post.content);
            setSelectedImages(res.post.postImages)

        } catch (error) {
            toast.error(error);
        }
    }
    useEffect(() => {
        fetchPost();
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImages((prevImages) => [...prevImages, file]);
    };

    const handleClearImage = () => {
        setSelectedImages([]);
        // setOpenFieldAddImage(false);
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
    const handleUpdatePost = async () => {
        try {
            setLoading(true);
            if (!content || !content.trim()) {
                setError(true)
                return;
            }
            const formData = new FormData();
            formData.append('Post.Content', content);

            selectedImages.forEach((file, index) => {
                formData.append(`Post.Images[${index}]`, file);
            });

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const res = await editPost(postId, formData);
            console.log(res);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000 "
            // onClick={handleClose}
            >
                <div
                    className="relative sm:w-[550px] overflow-y-auto w-4/5 pb-3 h-fit flex  border-2 border-none rounded-[8px] shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-4 right-3">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col h-fit pt-2 items-center">
                        <span className="text-xl font-bold">Chỉnh sửa bài viết</span>
                    </div>
                    <div className="w-full flex flex-col gap-2 px-3 py-3">

                        <div className="flex flex-col gap-3 text-start relative">

                            {/* Content  */}
                            <span className="text-[13px] font-bold">Nội dung</span>
                            <TextArea
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                height="80px" className=" text-[13px]" placeholder="Chia sẻ chuyến đi của bạn..."></TextArea>
                            {error && <span className="absolute left-0 top-[110px] text-[9px] text-red-500 leading-[9px]">Vui lòng nhập nội dung bài viết !</span>}
                            {/* Up load anh nhaaa */}
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
                                                    src={image.url}
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
                            <Button
                                disabled={loading || !content.trim()}
                                onClick={handleUpdatePost}
                                primary
                                className="rounded mt-0"
                            >
                                {loading ? (
                                    <img
                                        className="h-5 w-5 animate-spin"
                                        width="24"
                                        height="24"
                                        src="https://img.icons8.com/?size=100&id=94550&format=png&color=FFFFFF"
                                        alt="loading"
                                    />
                                ) : (
                                    "Cập nhật"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default ModalEditPost;