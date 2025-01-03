import axios from 'axios';
// import httpRequest from '../utils/httpRequest';
import api from "../utils/httpRequest"

// ham login
const loginService = async (email, password) => {
    try {
        console.log('Payload:', { email, password });
        const res = await api.post('identity-service/login', {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
};
// ham khi nhan vao Quen mat khau
const resetPasswordService = async (email) => {
    try {
        const res = await api.post('identity-service/forget-password', {
            email
        });
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
}

// xac nhan doi mat khau
const confirmForgetPasswordService = async (otp, url) => {
    console.log("Sending OTP:", (otp));
    console.log("Sending key:", (url));
    try {
        const res = await axios.post({
            otp
        }, {
            params: {
                key: url
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
}

// ham doi mat khau
const changePasswordService = async ({ url, password, confirmPassword }) => {
    // console.log("Sending OTP:", otp);
    // console.log("key:", key)
    try {
        const res = await axios.post(url, {
            password,
            confirmPassword
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error.response.data.detail;
    }
}
//ham logout
const logoutService = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('identity-service/logout', {
            refreshToken,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        }
        );
        console.log('logout thanh cong roi nhe');
        return res.data;
    } catch (error) {
        console.log('logout error: ', error);
        throw error;
    }
}


// refresh lai token
const refreshTokenService = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await api.post('identity-service/refresh', {
            refreshToken: refreshToken,
        });
        return res.data;
    } catch (error) {
        throw error.response.data.detail;
    }
}

export { loginService, resetPasswordService, logoutService, refreshTokenService, confirmForgetPasswordService, changePasswordService }

