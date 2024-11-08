import api from "../utils/httpRequest"

// ACCEPT FRIEND
const acceptFriendRequest = async (UserId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('useraccess-service/users/friends/accept', {
            UserId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
};
export { acceptFriendRequest }