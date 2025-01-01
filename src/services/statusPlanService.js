import api from "../utils/httpRequest"

// START PLAN 
const startPlanService = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plans/${planId}/start`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data.detail
    }
};
// END PLAN
const endPlanSoonService = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plans/${planId}/pause`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data.detail
    }
}
const completePlan = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${planId}/complete`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data.detail
    }
}

export { startPlanService, endPlanSoonService, completePlan }