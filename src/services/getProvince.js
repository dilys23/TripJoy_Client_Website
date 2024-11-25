import api from "../utils/httpRequest"
const getProvinces = async (pageIndex, pageSize) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const res = await api.get(`travelplan-service/provinces`, {
            params: {
                pageIndex,
                pageSize
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}
export { getProvinces }
