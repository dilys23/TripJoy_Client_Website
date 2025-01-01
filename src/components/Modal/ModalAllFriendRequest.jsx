import { Modal } from "antd";
import FriendItem from "../FriendRequest/FriendItem";

function ModalAllFriendRequest({
    listFriend,
    open,
    onCancel,
    handleAcceptRequest,
    handleDeclineRequest
}) {
    return (
        <Modal
            title="Danh sách bạn bè"
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <div className="flex flex-col h-[300px] overflow-auto">
                {
                    listFriend.map((friend, index) => (
                        <FriendItem key={index} info={friend} onAcceptRequest={() => handleAcceptRequest(friend.id)} onDeclineRequest={() => handleDeclineRequest(friend.id)}></FriendItem>
                    ))
                }
            </div>
        </Modal>

    );
}

export default ModalAllFriendRequest;