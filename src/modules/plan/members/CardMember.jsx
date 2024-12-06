import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { getUserById } from "../../../services/getUserById";
function CardMember({ member, handleOpenModalEdit }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const data = await getUserById(member.userId);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserById();
    })

    return (
        <div className="w-full h-[80px] flex shadow-md rounded-[10px] border border-[#CCD0D5] items-center px-5 justify-between">
            <div className="flex gap-3  items-center">
                <Avatar className="w-[60px] h-[60px] object-cover cursor-pointer" src={member?.avatar || null}></Avatar>
                <span className="font-bold nunito-text cursor-pointer">{member?.userName}</span>
            </div>
            <div className="flex gap-5 items-center">
                {member?.role !== 0 &&
                    <CiEdit
                        onClick={handleOpenModalEdit}
                        className="text-[25px] text-[#FF2424] cursor-pointer" />}
                {member?.role === 0 ?
                    <div className="w-[133px] flex justify-center py-2 bg-[#FF3C3C] text-white text-[14px] rounded-md cursor-pointer">Trưởng đoàn</div>
                    :
                    member?.role === 1 ?
                        <div className="w-[133px] flex justify-center py-2 bg-[#FF7324] text-white text-[14px] rounded-md cursor-pointer">Phó đoàn</div>
                        :
                        <div className="w-[133px] flex justify-center py-2 bg-[#13C892] text-white text-[14px] rounded-md cursor-pointer">Thành viên</div>
                }
                {member?.role === 0 ?
                    <button className="w-[133px] flex justify-center py-2 bg-[#17A1FA] text-white text-[14px] rounded-md cursor-pointer">Rời nhóm</button> :
                    <button className="w-[133px] flex justify-center py-2 bg-[#17A1FA] text-white text-[14px] rounded-md cursor-pointer">Xoá</button>
                }
            </div>

        </div>
    );
}

export default CardMember;