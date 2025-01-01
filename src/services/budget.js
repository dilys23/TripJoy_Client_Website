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
        throw error.response.data.detail
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
        throw error.response.data.detail
    }
};
const getExpenseByMemberId = async (planId, userId, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/expense/members/${userId}`, {
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
}


export { getExpense, getMemberExpense, getExpenseByMemberId }