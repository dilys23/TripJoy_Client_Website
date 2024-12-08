import api from "../utils/httpRequest"

// Invite member to plan 
const inviteMemberRequest = async (planId, userId) => {

    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${planId}/members/invite/${userId}`, {}, {
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

// Revoke member to plan 
const revokeMemberRequest = async (planId, userId) => {

    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${planId}/members/revoke/${userId}`, {}, {
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
// Get member by id plan
const getMemberByPlanId = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/plans/${planId}/members`, {
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
// CHANG ROLE PERMISSION
const changePermissionService = async (planId, userId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.patch(`travelplan-service/plans/${planId}/members/${userId}/permission`, {}, {
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
// Remove Member
const removeMemberService = async (planId, userId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.put(`travelplan-service/plans/${planId}/members/${userId}/remove`, {}, {
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
// ACCEPT INVITATION
const acceptInvitationService = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${planId}/members/accept`, {}, {
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
// DECLINE INVITATION
const declineInvitationService = async (planId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post(`travelplan-service/plans/${planId}/members/decline`, {}, {
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

export { inviteMemberRequest, revokeMemberRequest, getMemberByPlanId, changePermissionService, removeMemberService, acceptInvitationService, declineInvitationService }