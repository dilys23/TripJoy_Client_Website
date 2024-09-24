import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7100/api/v1/',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});

export default api; 