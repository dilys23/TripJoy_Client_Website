import api from "../utils/httpRequest"
const getUserById = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`useraccess-service/users/${id}`, {
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
export { getUserById }
