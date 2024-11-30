import { useState } from "react";
import CardMember from "./members/CardMember";
import image from "../../assets/images/anh1.jpg"
import Hue from "../../assets/images/Hue.jpg"
import HoiAn from "../../assets/images/hoian.png"

function DetailMember() {
    const [listMember, setListMember] = useState([
        {
            id: 0,
            avatar: image,
            name: 'Bach Duong',
            responsible: 0
        },
        {
            id: 1,
            avatar: Hue,
            name: 'Le Nguyen',
            responsible: 1
        },
        {
            id: 2,
            avatar: HoiAn,
            name: 'Bao Chau',
            responsible: 2
        }
    ])
    return (
        <div className="w-full bg-white min-h-[400px] rounded-[10px] mt-[-20px] mb-16 px-5 py-5 flex flex-col gap-3">
            <span className="font-bold nunito-text">Bạn</span>
            <CardMember member={listMember[0]}></CardMember>
            <span className="font-bold nunito-text">Thành viên</span>
            {
                listMember.slice(1).map((member) => (
                    <CardMember key={member.id} member={member}></CardMember>
                ))
            }
        </div>
    );
}

export default DetailMember;