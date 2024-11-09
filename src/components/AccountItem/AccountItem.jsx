import { Link, useNavigate } from "react-router-dom";
import AvatarDefault from "../Avatar/AvatarDefault"
function AccountItem({ account }) {
    const navigate = useNavigate();
    const handleToProfile = () => {
        navigate(`/profile/${account.id}`);
        window.location.reload();
    }
    return (
        <div onClick={handleToProfile} className="w-full h-[50px] px-3 py-3 flex items-center gap-3 hover:bg-[#162c2408] cursor-pointer">
            <AvatarDefault src="" alt=""></AvatarDefault>
            <div>{account.userName}</div>
        </div>
    );
}

export default AccountItem;