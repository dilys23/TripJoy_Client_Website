import api from "../utils/httpRequest"
const updateProfileRequest = async (formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put('useraccess-service/users',
            {
                formData
            }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data.users.data;
    } catch (error) {
        console.log('update error: ', error);
        throw error;
    }
}
export { updateProfileRequest }
