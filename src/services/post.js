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
        throw error.response.data.detail
    }
};
// Create a post append
const createPostPlan = async (formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`post-service/posts/plan`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data.detail
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
        throw error.response.data.detail
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
        throw error.response.data.detail
    }
}

const getPostByUserId = async (userId, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`post-service/posts/users/${userId}`, {
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
        throw error.response.data.detail
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
        throw error.response.data.detail
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
        throw error.response.data.detail
    }
}
export { createPost, getPostById, getPostHomeFeed, editPost, deletePost, createPostPlan }