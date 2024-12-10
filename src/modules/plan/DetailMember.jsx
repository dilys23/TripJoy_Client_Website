import { useEffect, useState } from "react";
import CardMember from "./members/CardMember";
import avatarDefault from "../../assets/images/avatarDefault.png"
import Hue from "../../assets/images/Hue.jpg"
import HoiAn from "../../assets/images/hoian.png"
import ModalEditRole from "./members/ModalEditRole";
import { getMemberByPlanId } from "../../services/member";
import { SmileOutlined } from '@ant-design/icons';
import { notification } from "antd";
import ModalRemoveMember from "./members/ModalRemoveMember";

function DetailMember({ role, planId, listMember, fetchMember }) {
    // const [listMember, setListMember] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [openModalEditRole, setOpenModalEditRole] = useState(false);
    const [openModalRemoveMember, setOpenModalRemoveMember] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    // const [isLeader, setIsLeader] = useState(false);
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message || 'Thông báo',
            description: description || 'Thay đổi quyền thành công.',
            icon: <SmileOutlined
                style={{
                    color: '#108ee9',
                }}
            />,
        });
    };
    // const fetchMember = async () => {
    //     try {
    //         const res = await getMemberByPlanId(planId);
    //         setListMember(res.members.data);
    //         // console.log('hiiiii', res.members.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     fetchMember();
    // }, [])

    const handleOpenModalEdit = (member) => {
        setSelectedMember(member);
        setOpenModalEditRole(true);
    };
    const handleOpenModalRemove = (member) => {
        setSelectedMember(member);
        setOpenModalRemoveMember(true);
    }
    const refreshMember = async (mode) => {
        await fetchMember();
        if (mode === 'edit') {
            openNotificationWithIcon('success', 'Thành công', 'Thay đổi quyền thành công');
        } else {
            openNotificationWithIcon('success', 'Thành công', 'Xóa thành công');
        }

    }

    return (
        <div className="w-full bg-white min-h-[400px] rounded-[10px] mt-[-20px] mb-16 px-5 py-5 flex flex-col gap-3">
            <span className="font-bold nunito-text">Bạn</span>
            <CardMember role={role} key={listMember[0]?.userId} member={listMember[0]}></CardMember>
            <span className="font-bold nunito-text">Thành viên</span>
            {listMember.length > 1 &&
                listMember.slice(1).map((member) => (
                    <CardMember role={role} key={member.userId} member={member} handleOpenModalEdit={handleOpenModalEdit} handleOpenModalRemoveMember={handleOpenModalRemove}></CardMember>
                ))
            }
            {openModalEditRole && <ModalEditRole planId={planId} member={selectedMember} onSuccess={() => refreshMember('edit')} handleClose={() => setOpenModalEditRole(false)}></ModalEditRole>}
            {openModalRemoveMember && <ModalRemoveMember planId={planId} member={selectedMember} onSuccess={() => refreshMember('delete')} handleClose={() => setOpenModalRemoveMember(false)}></ModalRemoveMember>}
            {contextHolder}
        </div>
    );
}

export default DetailMember;