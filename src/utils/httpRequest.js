import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pbl6.sodro44.io.vn/',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export default api; 