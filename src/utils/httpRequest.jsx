import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://192.168.4.11:6200/api/v1/',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});

export default httpRequest; 