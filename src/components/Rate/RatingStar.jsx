import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

function RatingStar() {
    const [rating, setRating] = useState(0);

    // Hàm xử lý khi người dùng nhấp vào ngôi sao
    const handleClick = (index) => {
        setRating(index + 1);
    };
    return (
        <div className="flex gap-1 items-center">
            {Array(5).fill(false).map((_, index) => (
                <div key={index} onClick={() => handleClick(index)} className="cursor-pointer">
                    {index < rating ? (
                        <FaStar className="text-yellow-500 text-[20px]" />
                    ) : (
                        <FaRegStar className="text-yellow-500 text-[20px]" />
                    )}
                </div>
            ))}
        </div>
    );
}

export default RatingStar;