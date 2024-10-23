import React from "react";

const Avatar = ({
  name = "User",
  image = "https://example.com/default-avatar.jpg",  // default image fallback
  className = "",
  classNameImage,
  classNameP,
  onClick = () => { }  // optional onClick function
}) => {
  return (
    <div className={`relative ${className}`} onClick={onClick}>
      <img
        src={image}
        className={`rounded-full shadow-lg ${classNameImage} `}
        alt={name}
      />
      <p className={`text-center  ${classNameP}`}>{name}</p>
    </div>
  );
};

export default Avatar;
