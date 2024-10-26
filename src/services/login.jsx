import axios from 'axios';
import httpRequest from '../utils/httpRequest';


// ham login
const loginService = async (email, password) => {
    try {
        console.log('Payload:', { email, password });
        const res = await httpRequest.post('identity-service/login', {
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
        const res = await httpRequest.post('identity-service/forget-password', {
            email
        });
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
}

// xac nhan doi mat khau
const confirmForgetPasswordService = async ({ otp, url }) => {
    console.log("Sending OTP:", (otp));
    console.log("Sending key:", (url));
    try {
        const res = await axios.post(url, {
            otp
        }, {
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
        throw error;
    }
}
//ham logout
const logoutService = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        const res = await httpRequest.post('identity-service/logout', {
            accessToken,
            refreshToken,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        }
        );
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
        const res = await httpRequest.post('Account/refresh', {
            refreshToken: refreshToken,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export { loginService, resetPasswordService, logoutService, refreshTokenService, confirmForgetPasswordService, changePasswordService }

