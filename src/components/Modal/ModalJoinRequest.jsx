import { Modal } from "antd";
import TextArea from "../Input/TextArea";
import coverPhoto from "../../assets/images/coverPhoto.png"
import ava from "../../assets/images/avatarDefault.png"
import { useState } from "react";
import { joinRequest } from "../../services/joinRequest";
function ModalJoinRequest({
    plan,
    mySelf,
    open,
    onOk,
    onCancel,
    cancelText
}) {
    console.log(plan)
    const [message, setMessage] = useState(`Xin chào, mình là ${mySelf.userName}. Mình rất thích ý tưởng chuyến đi này và muốn tham gia cùng mọi người. Hy vọng được làm quen với các bạn!`);

    return (
        <Modal
            title="Hãy chia sẻ đôi chút về bạn!"
            open={open}
            onOk={() => onOk(message)}
            onCancel={onCancel}
            okText="Gửi lời mời"
            cancelText="Huỷ"
        >
            <div className="flex flex-col gap-2">
                <div className="relative pb-5">
                    <img src={coverPhoto} alt="" />
                    <img src={mySelf.avatar?.url || ava} alt="" className="w-16 h-16 rounded-full absolute  top-[80px] left-5" />
                    <span className="pl-[90px] font-bold mt-3">{mySelf.userName}</span>
                </div>
                <TextArea height="100px" width="100%"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></TextArea>
            </div>
        </Modal>
    );
}

export default ModalJoinRequest;