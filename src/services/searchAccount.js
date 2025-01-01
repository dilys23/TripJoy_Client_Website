import api from "../utils/httpRequest"
const searchUserRequest = async (searchValue) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get('useraccess-service/users/search', {
            params: { name: searchValue },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data.users.data;
    } catch (error) {
        console.log('search error: ', error);
        throw error.response.data.detail;
    }
}
export { searchUserRequest }
