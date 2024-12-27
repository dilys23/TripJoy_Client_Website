import { useNavigate } from "react-router-dom";
import avatarDefault from "../../assets/images/avatarDefault.png"
function Friend({ friend }) {
    const navigate = useNavigate();
    const handleToProfile = () => {
        navigate(`/profile/${friend.id}`);
        window.location.reload();
    }
    return (
        <div className="flex flex-col gap-2 pt-2">
            <img onClick={handleToProfile} src={friend?.avatar?.url || avatarDefault} alt="" className="w-[80px] h-[80px] rounded-md cursor-pointer" />
            <p onClick={handleToProfile} className="text-[13px] text-start nunito-text font-semibold cursor-pointer">{friend?.userName}</p>
        </div>
    );
}

export default Friend;