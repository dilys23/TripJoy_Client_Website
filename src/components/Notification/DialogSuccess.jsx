import React, { useEffect } from 'react';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function DialogSuccess({ message, description }) {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        api.open({
            message: message || 'Thông báo',
            description: description || 'Mọi thứ đang hoạt động bình thường!',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            duration: 3,
        });
    }, [api, message, description]);

    return <>{contextHolder}</>;
}

export default DialogSuccess;
