import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://pbl6.sodro44.io.vn/',
    baseURL: 'https://192.168.4.11:8080/',

    
    headers: {
        "Content-Type": "application/json"
    },
    // withCredentials: true
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options)
    return response.data
}

export const post = async (path, body = {}, options = {}) => {
    const response = await httpRequest.post(path, body, options);
    return response.data;
}

export const DELETE = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options)
    return response.data
}
export default api; 