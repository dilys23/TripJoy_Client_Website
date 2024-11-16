import api from "../utils/httpRequest"
// RATING LOCATIon
const ratingLocationRequest = async (LocationId, Value) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post("locationattraction-service/location/rate", {
            LocationId,
            Value
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

// GET RATING BY LOCATION ID
const getRatingByLocationId = async (LocationId, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`locationattraction-service/location/rate/${LocationId}`, {
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
}
//DELETE RATING LOCATION BY ID
const deleteRatingLocationById = async (LocationId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.delete(`locationattraction-service/location/rate/${LocationId}`, {
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
export { ratingLocationRequest, getRatingByLocationId, deleteRatingLocationById }