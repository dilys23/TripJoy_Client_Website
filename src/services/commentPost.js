import api from "../utils/httpRequest"
// Create room chat
const commentPost = async (id, comment) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/posts/${id}/comments`, comment, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error.response.data.detail;
    }
};
const getCommentByPostId = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/posts/${id}/comments`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error.response.data.detail;
    }
};

const replyComment = async (id, comment) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/comments/${id}/reply`, comment, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error.response.data.detail;
    }
}
const getReplyComment = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/comments/${id}/reply`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error.response.data.detail;
    }
};
const likeComment = async (idComment, emotion) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/comments/${idComment}/like`, emotion, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error.response.data.detail;
    }
}
const revokeComment = async (idComment) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/comments/${idComment}/revokeLike`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error.response.data.detail;
    }
}
const deleteComment = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.delete(`post-service/comments/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
    }
}
const editComment = async (id, comment) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`post-service/comments/${id}`, comment, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
    }
}
export { commentPost, getCommentByPostId, replyComment, getReplyComment, likeComment, revokeComment, deleteComment, editComment }