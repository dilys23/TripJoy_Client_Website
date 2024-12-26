import api from "../utils/httpRequest"

const updatePlanStatus = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plans/${id}/change-join-status`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
};
const getPlansAvailableToJoin = async (pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/available-join`, {
            params: {
                pageIndex, pageSize
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
};

const joinRequest = async (id, Introduction) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${id}/join-request`, { Introduction }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}
const revokeJoinRequest = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${id}/revoke-join-request`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}
const getJoinPlanRequest = async (id, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${id}/join-request`, {
            params: {
                pageIndex, pageSize
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
};
const acceptJoinRequest = async (idPlan, idUser) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${idPlan}/join-request/accept/${idUser}`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }

}
const declineJoinRequest = async (idPlan, idUser) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${idPlan}/join-request/decline/${idUser}`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }

}
const viewDetailAvailablePlan = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${id}/available-join`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}
export { updatePlanStatus, getPlansAvailableToJoin, joinRequest, revokeJoinRequest, getJoinPlanRequest, acceptJoinRequest, declineJoinRequest, viewDetailAvailablePlan }