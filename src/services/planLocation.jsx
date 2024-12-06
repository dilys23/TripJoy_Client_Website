import api from "../utils/httpRequest"

//GET TRIP BY PLAN ID
const getPlanLocation = async (planId, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/planLocations`, {
            params: {
                pageIndex,
                pageSize
            },
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
const addPlanLocation = async (planId, newFormData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        console.log(newFormData);

        const res = await api.post(`travelplan-service/plans/${planId}/planLocations`, newFormData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    // 'Content-Type': 'application/json',
                }
            });
        return res.data;
    } catch (error) {

        throw error;
    }
}

export { getPlanLocation, addPlanLocation }