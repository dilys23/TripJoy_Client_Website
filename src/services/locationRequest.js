import api from "../utils/httpRequest"

// ADD LOCATION 
const addLocationRequest = async (formData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('locationattraction-service/location', {
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

// UPDATE LOCATION
// DELETE LOCATIOn

// ADD IMAGES LOCATION
const addImagesLocationRequest = async (LocationId, Url) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.post('locationattraction-service/location/image', {
            LocationId,
            Url
        },
            {
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

// DELETE IMAGES LOCATION
const deleteImagesLocationRequest = async (LocationId, ImageId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.delete('locationattraction-service/location/image',
            {
                params: {
                    LocationId,
                    ImageId
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
export { addLocationRequest, addImagesLocationRequest, deleteImagesLocationRequest }