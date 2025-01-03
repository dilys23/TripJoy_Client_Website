import React, { useState } from "react";
import { addImageIntoPlan, removeImageIntoPlan } from "../../services/detailPlanLocationService";
import { toast } from "react-toastify";

function ImageUploader({ planLocationId, images, setImages, onSuccess }) {

    const maxImages = 10;

    const handleAddImage = async (e) => {
        const file = e.target.files[0];
        if (file && images.length < maxImages) {

            const newImages = new FormData();
            newImages.append("image", file);
            try {
                const res = await addImageIntoPlan(planLocationId, newImages);
                console.log(res.url);
                console.log(planLocationId)
                const newImageUrl = res;
                setImages((prevImages) => [...prevImages, newImageUrl]);
                onSuccess();
            } catch (error) {
                const errorMessage = (typeof error === 'string' && error.split(': ')[1]) ||
                    (error.message ? error.message.split(': ')[1] : "Lỗi không xác định");
                const extractedMessage = errorMessage?.match(/"([^"]+)"/)?.[1] || errorMessage;
                toast.error(extractedMessage);
                console.log(error);
            }
        }

    };
    const handleRemoveImage = async (image, index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        try {
            await removeImageIntoPlan(planLocationId, image);
            setImages(updatedImages);
        } catch (error) {
            const errorMessage = (typeof error === 'string' && error.split(': ')[1]) ||
                (error.message ? error.message.split(': ')[1] : "Lỗi không xác định");
            const extractedMessage = errorMessage?.match(/"([^"]+)"/)?.[1] || errorMessage;
            toast.error(extractedMessage);
            console.log('Error removing image:', error);
        }
    };

    return (
        <div className="w-1/2 flex flex-col gap-2 pl-5 ">
            <label
                className="flex sm:gap-3 gap-1 items-center cursor-pointer"
                htmlFor="image-upload"
            >
                <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/keek/100/image.png"
                    alt="image"
                    className="md:w-[30px] md:h-[30px] w-[25px] h-[25px]"
                />
                <span className="sm:text-[15px] text-[10px] text-[#333333] font-medium w-[70px]">
                    Thêm ảnh
                </span>
            </label>
            <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleAddImage}
            />

            <div className="w-full mx-auto flex gap-2 flex-wrap">
                {images.map((image, index) => (
                    <div key={index} className="relative w-[45px] h-[45px]">
                        <img
                            src={image.url}
                            alt={`uploaded-${index}`}
                            className="w-full h-full rounded-[5px] object-cover"
                        />
                        <button
                            onClick={() => handleRemoveImage(image, index)}
                            className="absolute top-[-5px] right-[-5px] bg-[#34A853] text-white text-[8px] w-[15px] h-[15px] flex items-center justify-center rounded-full"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-[85%] rounded-[3px] h-[5px] bg-[#D9D9D9]">
                <div
                    className="bg-blue-500 h-full rounded-[3px]"
                    style={{ width: `${(images.length / maxImages) * 100}%` }}
                ></div>
            </div>

            <span className="text-[10px] w-[85%] flex">
                Đã tải lên {images.length}/{maxImages} ảnh
            </span>
        </div>
    );
}

export default ImageUploader;
