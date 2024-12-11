import api from "../utils/httpRequest"

// EDIT NOTE PLAN 
const addFeePlanLocation = async (planLocationId, PlanLocationExpense) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/planLocations/${planLocationId}/expense`, PlanLocationExpense, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('thanh cong ne', res);
        return res.data;
    } catch (error) {
        throw error
    }
};
// get expense by plan id
const getExpenseByPlanId = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/expense`, {
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

// get my expense by plan id
const getMyExpenseByPlanId = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/expense/me`, {
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
// get expense of all member by plan id 
const getExpenseOfMembersByPlanId = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/expense/members`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
}

// get expense of each member by plan id
const getExpenseOfEachMemberByPlanId = async (planId, memberId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/expense/members/${memberId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
}


// ADD IMAGE of PLAN
const addImageIntoPlan = async (planLocationId, image) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.patch(`travelplan-service/planLocations/${planLocationId}/images/add`, image, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res);
        return res.data;
    } catch (error) {
        throw error;
    }
}
// DELETE IMAGE of PLAN
const removeImageIntoPlan = async (planLocationId, image) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.patch(`travelplan-service/planLocations/${planLocationId}/images/remove`, image, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
export { addFeePlanLocation, getExpenseByPlanId, getMyExpenseByPlanId, getExpenseOfMembersByPlanId, getExpenseOfEachMemberByPlanId, addImageIntoPlan, removeImageIntoPlan }