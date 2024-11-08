import avatarDefault from "../../assets/images/avatarDefault.png"
function AvatarDefault({ src, alt, className }) {
    return (
        <img
            src={src || avatarDefault}
            className={`lg:w-[40px] lg:h-[40px] w-[28px] h-[28px] rounded-90 cursor-pointer `}
            alt={alt}
        />
    );
}

export default AvatarDefault;