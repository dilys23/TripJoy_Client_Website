import api from "../utils/httpRequest"

// Create a post
const createPost = async (formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/posts`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
};
// get post by id
const getPostById = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
}

// get post my home feed
const getPostHomeFeed = async (pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/posts/homefeed`, {
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
        throw error
    }
}
const editPost = async (id, formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`post-service/posts/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
}
const deletePost = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.delete(`post-service/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
}
export { createPost, getPostById, getPostHomeFeed, editPost, deletePost }