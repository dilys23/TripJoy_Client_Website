import { Link, useNavigate } from "react-router-dom";
import AvatarDefault from "../Avatar/AvatarDefault"
function AccountItem({ account }) {
    const navigate = useNavigate();
    console.log(account)
    const handleToProfile = () => {
        navigate(`/profile/${account.id}`);
        window.location.reload();
    }
    return (
        <div onClick={handleToProfile} className="w-full h-[50px] px-3 py-3 flex items-center gap-3 hover:bg-[#162c2408] cursor-pointer">
            <AvatarDefault src="" alt=""></AvatarDefault>
            <div className="flex flex-col">
                <div>{account.userName}</div>
                {account.status === 4 && <div className="text-[11px]">Bạn</div>}
                {account.status === 1 && <div className="text-[11px]">Bạn bè</div>}
            </div>
        </div>
    );
}

export default AccountItem;