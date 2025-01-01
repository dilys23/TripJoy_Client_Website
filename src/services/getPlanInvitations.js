import api from "../utils/httpRequest"
const getPlanInvitations = async (pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/planInvitations`, {
            params: {
                pageIndex,
                pageSize
            },
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
export { getPlanInvitations }