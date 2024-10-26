import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://pbl6.sodro44.io.vn/',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});

export default httpRequest; 
