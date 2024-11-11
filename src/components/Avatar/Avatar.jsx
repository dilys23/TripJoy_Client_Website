import React from "react";

const Avatar = ({
  name = "User",
  image = "https://example.com/default-avatar.jpg", // default image fallback
  className = "",
  classNameImage,
  classNameP,
  onClick = () => { }, // optional onClick function
}) => {
  return (
    <div
      className={`relative  flex items-center ${className}`}
      onClick={onClick}
    >
      <img
        src={image}
        className={`rounded-full shadow-lg ${classNameImage} `}
        alt={name}
      />
      <div>
        <p className={`ml-6 whitespace-nowrap text-[10px] ${classNameP}`}>{name}</p>
        <p className={`ml-[-18px] w-[132px] text-center text-[#979797] text-[10px] font-normal font-['Arial'] ${classNameP}`}>@{name}</p>

      </div>

    </div>
  );
};

export default Avatar;
