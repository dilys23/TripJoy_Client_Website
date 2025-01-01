import api from "../utils/httpRequest"
const getCurrentUser = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get('useraccess-service/users/info', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        }
        );
        return res.data;
    } catch (error) {
        console.log('get friend error: ', error);
        throw error.response.data.detail;
    }
}
export { getCurrentUser }
