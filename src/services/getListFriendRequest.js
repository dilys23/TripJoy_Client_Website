import api from "../utils/httpRequest"
const getListFriendRequest = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get('useraccess-service/users/friends/friendRequests', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        }
        );
        return res.data;
    } catch (error) {
        console.log('get friend error: ', error);
        throw error;
    }
}
export { getListFriendRequest }
