import httpRequest from '../utils/httpRequest';

const login = async (email, password) => {
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

export default login

