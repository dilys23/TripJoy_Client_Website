import api from "../utils/httpRequest"
// Create room chat
const createRoomChatPrivate = async (UserId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('chat-service/rooms/private', {
            UserId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
};

const getMessageByRoomId = async (roomId, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`chat-service/rooms/${roomId}/messages`, {
            params: {
                pageIndex,
                pageSize
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}
const sendMessages = async (roomId, Message) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`chat-service/rooms/${roomId}/messages`, {
            Message
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}


const createPlanRoomChat = async (planId, PlanName) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('chat-service/rooms/plan', {
            planId,
            PlanName
        }, {
            UserId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}
export { createRoomChatPrivate, getMessageByRoomId, sendMessages, createPlanRoomChat }