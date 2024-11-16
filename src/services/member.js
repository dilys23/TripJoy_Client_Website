import api from "../utils/httpRequest"

// ADD LOCATION 
const inviteMemberRequest = async (idPlan, userId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plan/${idPlan}`, {
            userId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
};

export { inviteMemberRequest }