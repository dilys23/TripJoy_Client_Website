import api from "../utils/httpRequest"

// EDIT NOTE PLAN 
const editNotePlan = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plans/${planId}/note`, {}, {
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

// edit note plan location
const editNotePlanLocation = async (planLocationId, note) => {
    console.log(note)
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.patch(`travelplan-service/planLocations/${planLocationId}/note`, note, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
};

export { editNotePlan, editNotePlanLocation }