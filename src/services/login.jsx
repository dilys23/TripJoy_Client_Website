import httpRequest from '../utils/httpRequest';

const loginService = async (email, password) => {
    try {
        console.log('Payload:', { email, password });
        const res = await httpRequest.post('Account/login', {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
};

const resetPasswordService = async (email) => {
    try {
        const res = await httpRequest.post('Account/forget-password', {
            email
        });
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
}
const confirmForgetPasswordService = async ({ otp, key }) => {
    console.log("Sending OTP:", otp);
    console.log("key:", key)
    try {
        const res = await httpRequest.post('Account/confirm-forget-pw?key=${key}', {
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
const logoutService = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        const res = await httpRequest.post('Account/logout', {
            accessToken,
            refreshToken,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Include this if your API requires it
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

export { loginService, resetPasswordService, logoutService, refreshTokenService, confirmForgetPasswordService }

