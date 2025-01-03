import api from "../utils/httpRequest"

//GET ALL MY PLAN
const getMyPlanRequest = async (pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans`, {
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
        throw error.response.data.detail
    }
};
// SEARCH PLAN BY TITLE
const searchMyPlanByTitleRequest = async (pageIndex, pageSize, title, startDate) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans`, {
            params: {
                pageIndex,
                pageSize,
                title: title || "",
                startDate: startDate || null,
            },
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

// SEARCH PLAN BY DATE
const searchMyPlanByDateRequest = async (pageIndex, pageSize, startDate) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans`, {
            params: {
                pageIndex,
                pageSize,
                startDate
            },
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
// ADD PLAN 
const addPlanRequest = async (formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('travelplan-service/plans', formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'

            }
        });
        return res.data;
    } catch (error) {
        console.error('Update Profile error:', {
            status: error.response.status,
            data: error.response.data, // Look here for the server error details
            headers: error.response.headers,
        });
        console.error("Error occurred while adding plan:", error);
        throw error.response.data.detail;
    }
};
// GET DETAIL PLAN
const getPlanByIDRequest = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${id}`, {
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


// UPDATE PLAN 
const updatePlanRequest = async (id, formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plans/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'

            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data.detail
    }
}


const getPlanInvitationAvailable = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/planInvitations/available`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
        return res.data;
    } catch (error) {
        throw error.response.data.detail
    }
}
export { getMyPlanRequest, getPlanInvitationAvailable, addPlanRequest, updatePlanRequest, searchMyPlanByTitleRequest, searchMyPlanByDateRequest, getPlanByIDRequest }