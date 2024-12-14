import api from "../utils/httpRequest"
const getExpense = async (planId, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/expense`, {
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
const getMemberExpense = async (planId, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/expense/members`, {
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


export { getExpense, getMemberExpense }