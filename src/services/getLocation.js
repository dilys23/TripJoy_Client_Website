import api from "../utils/httpRequest"
// GET LOCATION BY ID
const getLocationByIDRequest = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`locationattraction-service/location/${id}`, {
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

// GET LOCATION BY COORDINATES
const getLocationByCoordinatesRequest = async (Latitude, Longitude) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get("locationattraction-service/location", {
            params: {
                Latitude,
                Longitude
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
// GET IMAGES BY LOCATION ID
const getImagesByLocationIDRequest = async (id, pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`locationattraction-service/location/image/${id}`, {
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
export { getLocationByIDRequest, getLocationByCoordinatesRequest, getImagesByLocationIDRequest }