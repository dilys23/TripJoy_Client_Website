import { Modal } from "antd";

function CustomModal({
    title,
    content,
    open,
    onOk,
    onCancel,
    okText,
    cancelText }) {
    return (
        <Modal
            title={title}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
        >
            <p>{content}</p>
        </Modal>
    );
}

export default CustomModal;