import api from "../utils/httpRequest"
// like post
const likePost = async (id, emotion) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/posts/${id}/like`, emotion, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('ACCEPT FRIEND error: ', error);
        throw error.response.data.detail;
    }
};
// revoke post 
const revokePost = async (id) => {
    try {
        // console.log(id)
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/posts/${id}/revokeLike`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('ACCEPT FRIEND error: ', error);
        throw error.response.data.detail;
    }
};

// get user by like post (emotion)
const getUserLikePost = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/posts/${id}/like`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('ACCEPT FRIEND error: ', error);
        throw error.response.data.detail;
    }
};
const getUserLikePostByIcon = async (id, emotion) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/posts/${id}/like`, {
            params: {
                emotion
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data
    } catch (error) {
        console.log('error: ', error);
    }
}
export { likePost, revokePost, getUserLikePost, getUserLikePostByIcon }