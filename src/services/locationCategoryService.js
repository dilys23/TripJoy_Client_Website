import api from "../utils/httpRequest"
// ADD LOCATION CATEGORY
const addLocationCategoryRequest = async (name, description) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('locationattraction-service/locationCategory', {
            name,
            description
        }, {
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
// GET LOCATION CATEGORY
const getLocationCategoryRequest = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get('locationattraction-service/locationCategory', {
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


export { addLocationCategoryRequest, getLocationCategoryRequest }