import api from "../utils/httpRequest"

//GET PLAN
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
        throw error
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
        throw error
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
        throw error
    }
}
// ADD PLAN 
const addPlanRequest = async (formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('travelplan-service/plans', formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error occurred while adding plan:", error);
        throw error;
    }
};

// UPDATE PLAN 
const updatePlanRequest = async (id, formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plan/${id}`, {
            formData
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
}

// EDIT NOTE
const editNoteRequest = async (id, note) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plan/${id}`, {
            note
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
}
export { getMyPlanRequest, addPlanRequest, updatePlanRequest, editNoteRequest, searchMyPlanByTitleRequest, searchMyPlanByDateRequest }