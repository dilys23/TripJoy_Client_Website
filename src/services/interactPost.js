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
        throw error;
    }
};
// revoke post 
const revokePost = async (id) => {
    try {
        console.log(id)
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
        throw error;
    }
};

// get user by like post (emotion)
const getUserLikePost = async (id, idLike) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/posts/${id}/like/${idLike}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('ACCEPT FRIEND error: ', error);
        throw error;
    }
};
export { likePost, revokePost, getUserLikePost }