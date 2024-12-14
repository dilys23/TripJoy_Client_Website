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

// add plan location
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

// remove the plan location
const removePlanLocation = async (planLocationId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.delete(`travelplan-service/planLocations/${planLocationId}`,
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

// Change order of the plan location
const changeOrderPlanLocation = async (planId, planLocationIdFirst, planLocationIdSecond) => {
    try {
        console.log(planId, planLocationIdFirst, planLocationIdSecond)
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.patch(`travelplan-service/plans/${planId}/planLocations/changeOrder`,
            {
                planLocationIdFirst,
                planLocationIdSecond
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    // 'Content-Type': 'application/json',
                }
            });
        return res.data;
    } catch (error) {
        throw error
    }
}
export { getPlanLocation, addPlanLocation, removePlanLocation, changeOrderPlanLocation }