import api from "../utils/httpRequest"
// SEND FRIEND
const sendFriendRequest = async (UserId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('useraccess-service/users/friends/send', {
            UserId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('ACCEPT FRIEND error: ', error);
        throw error;
    }
};

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
        console.log('ACCEPT FRIEND error: ', error);
        throw error;
    }
};

// DECLINE FRIEND 
const declineFriendRequest = async (UserId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('useraccess-service/users/friends/decline', {
            UserId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('DECLINE FRIEND  error: ', error);
        throw error;
    }
}
// REMOVE FRIEND
const removeFriend = async (UserId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('useraccess-service/users/friends/remove', {
            UserId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('REMOVE FRIEND error: ', error);
        throw error;
    }
}
// REVOKE FRIEND REQUEST
const revokeFriendRequest = async (UserId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('useraccess-service/users/friends/revoke', {
            UserId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log(' REVOKE FRIEND REQUEST error: ', error);
        throw error;
    }
}

// GET FRIEND
const getMyFriend = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get('useraccess-service/users/friends/friends', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
        return res.data;

    } catch (error) {
        throw error;
    }
}
export { sendFriendRequest, acceptFriendRequest, declineFriendRequest, removeFriend, revokeFriendRequest, getMyFriend }