import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { getUserById } from "../../../services/getUserById";
import avatarDefault from "../../../assets/images/avatarDefault.png"
import { getCurrentUser } from "../../../services/getCurrentUser";
function CardMember({ role, member, handleOpenModalEdit, handleOpenModalRemoveMember, handleOpenOutPlan }) {
    // console.log(member);
    const [user, setUser] = useState({});
    const [isMyseft, setIsMyseft] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUserById = async () => {
            setLoading(true);
            try {
                const data = await getUserById(member?.userId);
                const res = await getCurrentUser();
                // console.log(data.user);
                // console.log(res.user.profile.id);
                setUser(data.user);
                if (res?.user.profile.id === member?.userId) {
                    setIsMyseft(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (member) {
            fetchUserById();
        }
    }, [])

    return (
        <div className="w-full h-[80px] flex shadow-md rounded-[10px] border border-[#CCD0D5] items-center px-5 justify-between">
            <div className="flex gap-3  items-center">
                <Avatar className="w-[60px] h-[60px] object-cover cursor-pointer" src={user?.avatar?.url || avatarDefault}></Avatar>
                <span className="font-bold nunito-text cursor-pointer">{loading ? 'Name User' : user?.userName}</span>
            </div>
            <div className="flex gap-5 items-center">
                {role === 0 && member?.role !== 0 &&
                    <CiEdit
                        onClick={() => handleOpenModalEdit(member)}
                        className="text-[25px] text-[#FF2424] cursor-pointer" />}
                {member?.role === 0 && (
                    <div className="w-[133px] flex justify-center py-2 bg-[#FF3C3C] text-white text-[14px] rounded-md cursor-pointer">
                        Trưởng đoàn
                    </div>
                )}
                {member?.role === 1 && (
                    <div className="w-[133px] flex justify-center py-2 bg-[#FF7324] text-white text-[14px] rounded-md cursor-pointer">
                        Phó đoàn
                    </div>
                )}
                {member?.role === 2 && (
                    <div className="w-[133px] flex justify-center py-2 bg-[#13C892] text-white text-[14px] rounded-md cursor-pointer">
                        Thành viên
                    </div>
                )}
                {role === 0 && member?.role !== 0 && (
                    <>
                        <button
                            onClick={() => handleOpenModalRemoveMember(member)}
                            className="w-[133px] flex justify-center py-2 bg-[#17A1FA] text-white text-[14px] rounded-md cursor-pointer"
                        >
                            Xóa
                        </button>
                    </>
                )}

                {role === 1 && member?.role === 2 && (
                    <button
                        onClick={() => handleOpenModalRemoveMember(member)}
                        className="w-[133px] flex justify-center py-2 bg-[#17A1FA] text-white text-[14px] rounded-md cursor-pointer"
                    >
                        Xóa
                    </button>
                )}

                {isMyseft && (
                    <button
                        onClick={handleOpenOutPlan}
                        className="w-[133px] flex justify-center py-2 bg-[#17A1FA] text-white text-[14px] rounded-md cursor-pointer">
                        Rời nhóm
                    </button>
                )}
            </div>

        </div>
    );
}

export default CardMember;