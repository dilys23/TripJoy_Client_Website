import api from "../utils/httpRequest"

// ADD LOCATION 
const addPlanRequest = async (formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('travelplan-service/plan', {
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
export { addPlanRequest, updatePlanRequest, editNoteRequest }