import avatarDefault from "../../assets/images/avatarDefault.png"
function AvatarDefault({ src, alt, className }) {
    return (
        <img
            src={src || avatarDefault}
            className={`rounded-90 cursor-pointer ${className || ""}`}
            alt={alt}
        />
    );
}

export default AvatarDefault;